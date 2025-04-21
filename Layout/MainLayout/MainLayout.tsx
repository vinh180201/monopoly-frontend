import React from "react";
import styles from "./MainLayout.module.css";

interface MainLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, sidebar }) => {
  return (
    <div className={styles.appContainer}>
      <main className={styles.mainContent}>{children}</main>
      <aside className={styles.sidebar}>{sidebar}</aside>
    </div>
  );
};

export default MainLayout;
