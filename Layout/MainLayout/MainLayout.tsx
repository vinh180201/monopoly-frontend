import React from "react";
import styles from "./MainLayout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { nextPlayer, selectCurrentPlayer } from "@/redux/features/playerSlice";

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, sidebar }) => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector(selectCurrentPlayer);

  // Disable button if current player has remaining turns
  const isButtonDisabled = currentPlayer.turnLeft > 0;

  const handleNextTurn = () => {
    dispatch(nextPlayer());
  };

  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>{children}</main>
      <aside className={styles.sidebar}>
        {sidebar}
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
