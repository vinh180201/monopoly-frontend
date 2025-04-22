import React from "react";
import styles from "./MainLayout.module.css";
import { useDispatch } from "react-redux";
import { nextPlayer } from "@/redux/features/playerSlice";

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, sidebar }) => {
  const dispatch = useDispatch();

  const handleNextTurn = () => {
    dispatch(nextPlayer());
  };

  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>{children}</main>
      <aside className={styles.sidebar}>
        {sidebar}
        <div className={styles.confirmButtonContainer}>
          <button onClick={handleNextTurn} className={styles.confirmButton}>
            ✅ Xác nhận đã đi xong
          </button>
        </div>
      </aside>
    </div>
  );
};

export default MainLayout;
