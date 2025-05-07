import { Dispatch } from "redux";
import { updatePlayerMoney } from "@/redux/features/playerSlice";
import { setLandOwner, addHouseToLand } from "@/redux/features/landSlice";

export const handleBuyLand = (
  dispatch: Dispatch,
  currentPlayer: any,
  land: any,
  gameState: any,
  onQuestion: any,
  handleNextTurn: any
) => {
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
        dispatch(setLandOwner({ index: land.index, ownerId: currentPlayer.id }));
        console.log(`🏠 Player ${currentPlayer.id} đã mua ô đất "${land.name}".`);
        handleNextTurn();
      },
      () => {
        console.log(
          `🏠 Player ${currentPlayer.id} đã từ chối mua ô đất "${land.name}".`
        );
        handleNextTurn();
      }
    );
  } else {
    console.log("Không đủ tiền để mua đất.");
    handleNextTurn();
  }
};

export const handleBuyHouse = (
  dispatch: Dispatch,
  currentPlayer: any,
  land: any,
  onQuestion: any,
  handleNextTurn: any
) => {
  if (
    (land.houses ?? 0) < 5 &&
    currentPlayer.money >= (land.housePrice ?? 0) &&
    land.type === "normal"
  ) {
    onQuestion(
      `Bạn có muốn mua nhà cấp ${land.houses ?? 0 + 1} trên ô đất "${land.name}" với giá $${land.housePrice}?`,
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
  }
};

export const handlePayRent = (
  dispatch: Dispatch,
  currentPlayer: any,
  land: any,
  onQuestion: any,
  handleNextTurn: any
) => {
  const levelKey = `level${land.houses || 0}` as keyof typeof land.fees;
  const rent = land.fees?.[levelKey] || 0;

  console.log(
    `👣 Player ${currentPlayer.id} đi vào ô đất của Player ${land.owner}. Trả tiền thuê: $${rent}.`
  );

  // Trừ tiền của người chơi hiện tại
  dispatch(updatePlayerMoney({ playerId: currentPlayer.id, amount: -rent }));

  // Cộng tiền cho chủ sở hữu ô đất
  dispatch(updatePlayerMoney({ playerId: land.owner, amount: rent }));

  // Hiển thị thông báo
  onQuestion(
    `👣 Player ${currentPlayer.id} đã đi vào ô đất của Player ${land.owner} và phải trả tiền thuê $${rent}.`,
    () => {handleNextTurn()},
    () => {handleNextTurn()},
    true
  );

  // Chuyển lượt sau khi xử lý xong
  // setTimeout(() => {
  //   onQuestion("", () => {}, () => {});
  //   handleNextTurn();
  // }, 1500);
};