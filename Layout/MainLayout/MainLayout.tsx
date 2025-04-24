import React from "react";
import styles from "./MainLayout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { nextPlayer, selectCurrentPlayer, selectPlayers } from "@/redux/features/playerSlice";
import { selectLandsByOwner } from "@/redux/features/landSlice"; // Selector để lấy các đất sở hữu
import { RootState } from "@/redux/store";

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, sidebar }) => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector(selectCurrentPlayer);

  // Lấy tất cả người chơi
  const allPlayers = useSelector(selectPlayers);

  // Lấy thông tin các ô đất mà mỗi người chơi sở hữu
  const playerLands = allPlayers.map(player => {
    const ownedLands = useSelector((state: RootState) => selectLandsByOwner(state, player.id));
    return { ...player, ownedLands };
  });

  // Disable button if current player has remaining turns
  const isButtonDisabled = currentPlayer.turnLeft > 0;

  const handleNextTurn = () => {
    dispatch(nextPlayer());
  };

  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>{children}</main>
      <aside className={styles.sidebar}>
        {/* {sidebar} */}
        
        {/* Hiển thị thông tin tất cả người chơi */}
        <div className={styles.playersInfo}>
          {playerLands.map((player) => (
            <div key={player.id} className={styles.playerInfo}>
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
