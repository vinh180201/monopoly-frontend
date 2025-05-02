"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPlayer,
  updatePlayerMoney,
  updatePlayerPosition,
  skipPlayerTurn,
  nextPlayer,
} from "@/redux/features/playerSlice";
import {
  selectLandByIndex,
  setLandOwner,
  addHouseToLand,
} from "@/redux/features/landSlice";
import { RootState } from "@/redux/store";
import { resetTurn, selectGameState, setBought } from "@/redux/features/gameSlice";

const PlayerWatcher = ({
  onQuestion,
}: {
  onQuestion: (
    question: string,
    confirmAction: () => void,
    cancelAction: () => void,
    autoDismiss?: boolean
  ) => void;
}) => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector(selectCurrentPlayer);
  const land = useSelector((state: RootState) =>
    selectLandByIndex(state, currentPlayer.position)
  );
  const gameState = useSelector(selectGameState);

  useEffect(() => {
    // Chỉ thực hiện logic khi isMoving là false
    if (gameState.isMoving) return;

    const logPlayerMove = async () => {
      if (land) {
        console.log(
          `Player ${currentPlayer.id} hiện tại ở ô đất: ${land.name} (index: ${land.index})`
        );

        // Xử lý các loại ô đặc biệt
        switch (land.type) {
          case "tax":
            console.log(
              `👣 Player ${currentPlayer.id} đi qua ô thuế. Trừ $200.`
            );
            dispatch(
              updatePlayerMoney({ playerId: currentPlayer.id, amount: -200 })
            );
            handleNextTurn();
            break;

          case "chance":
            console.log(
              `👣 Player ${currentPlayer.id} đi qua ô cơ hội. Cộng $30.`
            );
            dispatch(
              updatePlayerMoney({ playerId: currentPlayer.id, amount: 30 })
            );
            handleNextTurn();
            break;

          case "goToJail":
            console.log(
              `👣 Player ${currentPlayer.id} đi vào ô "Vào Tù". Chuyển đến ô "Nhà Tù" và mất 1 lượt.`
            );
            dispatch(
              updatePlayerPosition({
                playerId: currentPlayer.id,
                position: 12,
              })
            );
            dispatch(skipPlayerTurn({ playerId: currentPlayer.id, turns: 1 }));
            // Hiển thị thông báo khi vào ô "Nhà Tù"
            onQuestion(
              `👮 Player ${currentPlayer.id} đã vào ô "Nhà Tù".`,
              () => {}, // Không cần hành động xác nhận
              () => {}, // Không cần hành động hủy
              true
            );

            // Tự động ẩn thông báo sau 1 giây
            setTimeout(() => {
              onQuestion(
                "",
                () => {},
                () => {}
              );
              handleNextTurn();
            }, 1500);
            break;
          case "jail": 
            onQuestion(
              `Player ${currentPlayer.id} vừa đi qua ô "Nhà Tù".`,
              () => {}, // Không cần hành động xác nhận
              () => {}, // Không cần hành động hủy
              true
            );

            // Tự động ẩn thông báo sau 1 giây
            setTimeout(() => {
              onQuestion(
                "",
                () => {},
                () => {}
              );
              handleNextTurn();
            }, 1500);
            console.log(
              `👣 Player ${currentPlayer.id} chỉ đi qua ô "Nhà Tù". Không có hành động nào được thực hiện.`
            );
            // Không làm gì nếu chỉ đi qua ô "Nhà Tù"
            break;
          default:
            break;
        }

        // Kiểm tra nếu ô đất có thể mua được (type: "normal" | "station" | "utility")
        if (["normal", "station", "utility"].includes(land.type)) {
          if (land.owner !== undefined && land.owner !== currentPlayer.id) {
            // Trả tiền thuê
            const levelKey = `level${
              land.houses || 0
            }` as keyof typeof land.fees;
            const rent = land.fees?.[levelKey] || 0;
            console.log(
              `👣 Player ${currentPlayer.id} đi vào ô đất của Player ${land.owner}. Trả tiền thuê: $${rent}.`
            );

            dispatch(
              updatePlayerMoney({ playerId: currentPlayer.id, amount: -rent })
            );
            dispatch(updatePlayerMoney({ playerId: land.owner, amount: rent }));
          } else if (land.owner === undefined) {
            // Hỏi mua đất nếu chưa mua đất trong lượt này
            if (
              currentPlayer.money >= land.price &&
              !gameState.hasBought &&
              gameState.hasRolledDice
            ) {
              onQuestion(
                `Bạn có muốn mua ô đất "${land.name}" với giá $${land.price}?`,
                () => {
                  dispatch(
                    updatePlayerMoney({
                      playerId: currentPlayer.id,
                      amount: -land.price,
                    })
                  );
                  dispatch(
                    setLandOwner({
                      index: land.index,
                      ownerId: currentPlayer.id,
                    })
                  );
                  console.log(
                    `🏠 Player ${currentPlayer.id} đã mua ô đất "${land.name}".`
                  );
                  handleNextTurn();
                },
                () => {
                  console.log(
                    `🏠 Player ${currentPlayer.id} đã từ chối mua ô đất "${land.name}".`
                  );
                  handleNextTurn();
                }
              );
              // dispatch(setBought());
            } else {
              console.log("Không đủ tiền để mua đất.");
              handleNextTurn();
            }
          } else if (
            land.owner === currentPlayer.id &&
            !gameState.hasBought &&
            gameState.hasRolledDice
          ) {
            // Kiểm tra nếu người chơi có thể mua nhà
            if (
              (land.houses ?? 0) < 5 &&
              currentPlayer.money >= (land.housePrice ?? 0) &&
              land.type === "normal"
            ) {
              onQuestion(
                `Bạn có muốn mua nhà cấp ${land.houses ?? 0 + 1} trên ô đất "${
                  land.name
                }" với giá $${land.housePrice}?`,
                () => {
                  dispatch(
                    updatePlayerMoney({
                      playerId: currentPlayer.id,
                      amount: -(land.housePrice ?? 0),
                    })
                  );
                  dispatch(addHouseToLand({ index: land.index }));
                  console.log(
                    `🏠 Player ${currentPlayer.id} đã mua nhà cấp ${
                      land.houses ?? 0 + 1
                    } trên ô đất "${land.name}".`
                  );
                  handleNextTurn();
                },
                () => {
                  console.log(
                    `🏠 Player ${currentPlayer.id} đã từ chối mua nhà trên ô đất "${land.name}".`
                  );
                  handleNextTurn();
                }
              );
              // dispatch(setBought());
            }
          }
        }
      }
    };

    if (land) {
      logPlayerMove();
    }
  }, [
    currentPlayer,
    gameState,
    land,
    gameState.isMoving,
    dispatch,
    onQuestion,
  ]);

  const handleNextTurn = () => {
    dispatch(nextPlayer());
    dispatch(resetTurn())
  };

  return null;
};

export default PlayerWatcher;
