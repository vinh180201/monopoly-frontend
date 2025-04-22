"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPlayer } from "@/redux/features/playerSlice";
import { selectLandByIndex } from "@/redux/features/landSlice";
import { RootState } from "@/redux/store";

const PlayerWatcher = () => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector(selectCurrentPlayer);
  const land = useSelector((state: RootState) =>
    selectLandByIndex(state, currentPlayer.position)
  );

  // Log thông tin khi player di chuyển đến một ô mới
  useEffect(() => {
    // Đảm bảo chỉ log khi player di chuyển đến một ô đất mới
    const logPlayerMove = async () => {
      if (land) {
        console.log(`Player ${currentPlayer.id} hiện tại ở ô đất: ${land.name} (index: ${land.index})`);
        
        // Kiểm tra nếu ô đất chưa có chủ sở hữu
        if (land.owner === undefined) {
          console.log(
            `👣 Player ${currentPlayer.id} vừa đến ô đất trống: "${land.name}" (index: ${land.index})`
          );
        } else {
          console.log(`👣 Player ${currentPlayer.id} đến ô đất: "${land.name}" (index: ${land.index}) và đã có chủ.`);
        }
      }
    };

    // Chỉ log khi vị trí của player đã thay đổi
    if (land) {
      logPlayerMove(); // Log sau khi player di chuyển
    }
  }, [currentPlayer.position, land]); // Lắng nghe sự thay đổi của position và land

  return null; // không hiển thị gì
};

export default PlayerWatcher;
