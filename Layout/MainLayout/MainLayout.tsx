import React, { useMemo } from "react";
import styles from "./MainLayout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { nextPlayer, selectCurrentPlayer, selectPlayers } from "@/redux/features/playerSlice";
import { selectLandsByOwner } from "@/redux/features/landSlice"; // Selector để lấy các đất sở hữu
import { RootState, store } from "@/redux/store";
import { resetTurn } from "@/redux/features/gameSlice";

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, sidebar }) => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector(selectCurrentPlayer);

  // Lấy tất cả người chơi
  const allPlayers = useSelector(selectPlayers);

  // Memo hóa playerLands để tránh render không cần thiết
  const playerLands = useMemo(() => {
    return allPlayers.map((player) => {
      const ownedLands = selectLandsByOwner(store.getState(), player.id); // Truy xuất trực tiếp từ state
      return { ...player, ownedLands };
    });
  }, [allPlayers]);

  // Disable button if current player has remaining turns
  const isButtonDisabled = currentPlayer.turnLeft > 0;

  const handleNextTurn = () => {
    dispatch(nextPlayer());
    dispatch(resetTurn())
  };

  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>{children}</main>
      <aside className={styles.sidebar}>
        {/* Hiển thị thông tin tất cả người chơi */}
        <div className={styles.playersInfo}>
          {playerLands.map((player) => (
            <div
              key={player.id}
              className={styles.playerInfo}
              style={{
                backgroundColor:
                  currentPlayer.id === player.id ? player.color : "#f9f9f9", // Dùng màu của player nếu đang trong lượt
                borderColor:
                  currentPlayer.id === player.id ? player.color : "#ccc", // Đổi màu viền nếu đang trong lượt
                fontWeight: currentPlayer.id === player.id ? "bold" : "normal", // Làm đậm chữ nếu đang trong lượt
              }}
            >
              <h3>{player.name}</h3>
              <p>Số tiền: ${player.money.toLocaleString()}</p>
              <p>Số đất sở hữu: {player.ownedLands.length}</p>
            </div>
          ))}
        </div>
  
        <div className={styles.confirmButtonContainer}>
          <button
            onClick={handleNextTurn}
            className={styles.confirmButton}
            disabled={isButtonDisabled} // Disable if turnLeft > 0
          >
            ✅ Xác nhận đã đi xong
          </button>
        </div>
      </aside>
    </div>
  );
};

export default MainLayout;