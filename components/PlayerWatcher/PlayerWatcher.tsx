"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPlayer, selectCurrentPlayer, skipPlayerTurn, updatePlayerMoney, updatePlayerPosition } from "@/redux/features/playerSlice";
import { selectLandByIndex, setLandOwner } from "@/redux/features/landSlice";
import { RootState } from "@/redux/store";
import BuyLandModal from "../BuyLandModal/BuyLandModal";
import { LandCellData } from "@/types/landCell";

const PlayerWatcher = () => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector(selectCurrentPlayer);
  const land = useSelector((state: RootState) =>
    selectLandByIndex(state, currentPlayer.position)
  );
  const [showModal, setShowModal] = useState(false);
  const [landToBuy, setLandToBuy] = useState<LandCellData | null>(null);

  useEffect(() => {
    const logPlayerMove = async () => {
      if (land) {
        console.log(`Player ${currentPlayer.id} hiện tại ở ô đất: ${land.name} (index: ${land.index})`);

        // Xử lý các loại ô đặc biệt
        switch (land.type) {
          case "tax":
            console.log(`👣 Player ${currentPlayer.id} đi qua ô thuế. Trừ $200.`);
            dispatch(updatePlayerMoney({ playerId: currentPlayer.id, amount: -200 }));
            break;

          case "chance":
            console.log(`👣 Player ${currentPlayer.id} đi qua ô cơ hội. Cộng $30.`);
            dispatch(updatePlayerMoney({ playerId: currentPlayer.id, amount: 30 }));
            break;

          case "goToJail":
            console.log(`👣 Player ${currentPlayer.id} đi vào ô "Vào Tù". Chuyển đến ô "Nhà Tù" và mất 1 lượt.`);
            dispatch(updatePlayerPosition({ playerId: currentPlayer.id, position: 11 }));
            dispatch(skipPlayerTurn({ playerId: currentPlayer.id, turns: 1 }));
            break;

          default:
            break;
        }

        // Kiểm tra nếu ô đất có thể mua được (type: "normal" | "station" | "utility")
        if (["normal", "station", "utility"].includes(land.type)) {
          // Kiểm tra nếu ô đất chưa có chủ sở hữu
          if (land.owner === undefined) {
            console.log(`👣 Player ${currentPlayer.id} vừa đến ô đất trống: "${land.name}" (index: ${land.index})`);

            // Kiểm tra nếu người chơi đủ tiền để mua đất
            if (currentPlayer.money >= land.price) {
              setLandToBuy(land); // Lưu lại thông tin ô đất
              setShowModal(true); // Hiển thị modal mua đất
            } else {
              console.log("Không đủ tiền để mua đất.");
            }
          } else {
            console.log(`👣 Player ${currentPlayer.id} đến ô đất: "${land.name}" (index: ${land.index}) và đã có chủ.`);
          }
        } else {
          console.log(`👣 Player ${currentPlayer.id} đến ô không thể mua: "${land.name}" (type: ${land.type}).`);
        }
      }
    };

    if (land) {
      logPlayerMove(); // Log sau khi player di chuyển
    }
  }, [currentPlayer.position, land]);

  useEffect(() => {
    if (currentPlayer.turnLeft <= 0) {
      console.log(`⏩ Player ${currentPlayer.id} không đủ lượt để chơi. Chuyển sang người chơi tiếp theo.`);
      dispatch(nextPlayer()); // Chuyển sang người chơi tiếp theo
    } else {
      console.log(`✅ Player ${currentPlayer.id} có lượt hợp lệ. Cho phép chơi.`);
    }
  }, [currentPlayer, dispatch]);

  // Xử lý khi người chơi đồng ý mua đất
  const handleBuyLand = () => {
    if (landToBuy) {
      // Trừ tiền người chơi
      dispatch(updatePlayerMoney({ playerId: currentPlayer.id, amount: -landToBuy.price }));

      // Cập nhật chủ sở hữu cho ô đất
      dispatch(setLandOwner({ index: landToBuy.index, ownerId: currentPlayer.id }));

      // Đóng modal
      setShowModal(false);
      setLandToBuy(null);
    }
  };

  // Xử lý khi người chơi từ chối mua đất
  const handleCloseModal = () => {
    setShowModal(false);
    setLandToBuy(null);
  };

  return (
    <>
      {/* Hiển thị Modal nếu có */}
      <BuyLandModal
        isOpen={showModal}
        landName={landToBuy?.name || ""}
        price={landToBuy?.price || 0}
        onConfirm={handleBuyLand}
        onCancel={handleCloseModal}
      />
    </>
  );
};

export default PlayerWatcher;