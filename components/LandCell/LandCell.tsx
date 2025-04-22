import { LandCellData } from '@/types/landCell';
import styles from './LandCell.module.css';
import React from 'react';
import StartCell from '../CornerCell/StartCell';
import JailCell from '../CornerCell/JailCell';
import GoJailCell from '../CornerCell/GoJailCell';
import ParkingCell from '../CornerCell/ParkingCell';

interface LandCellProps {
  landCell: LandCellData;
  users?: { id: number; avatar: string; color: string }[]; // Danh sách user đang ở trên ô đất
  houses?: number; // Số lượng nhà trên ô đất
}

const LandCell: React.FC<LandCellProps> = ({ landCell, houses = 0, users = [] }) => {
  const maxIcons = 4; // Số lượng icon tối đa hiển thị
  const extraUsers = users.length - maxIcons; // Số lượng người chơi còn lại

  const renderContent = () => {
    switch (landCell.type) {
      case "start":
        return <StartCell/>;
      case "jail":
        return <JailCell/>;
      case "goToJail":
        return <GoJailCell/>;
      case "parking":
        return <ParkingCell/>;
      default:
        return (
          <>
            {/* Biểu diễn màu đất và nhà */}
            <div className={styles.landInfo}>
              <div className={styles.colorBar}></div>
              <div className={styles.houses}>
                {Array.from({ length: houses }).map((_, index) => (
                  <div key={index} className={styles.house}></div>
                ))}
              </div>
            </div>

            {/* Tên ô đất và tiền */}
            <div className={styles.details}>
              <div className={styles.name}>{landCell.name}</div>
              <div className={styles.price}>${landCell.price.toLocaleString()}</div>
            </div>
          </>
        );
    }
  };

  return (
    <div className={`${styles.cell} ${styles[landCell.color]}`}>
      {renderContent()}

      {/* Hiển thị avatar của người chơi */}
      <div className={styles.users}>
        {users.slice(0, maxIcons).map((user, index) => (
          <div key={user.id} className={styles.avatar} style={{ backgroundColor: user.color }}>
            {user.avatar}
          </div>
        ))}
        {extraUsers > 0 && (
          <div className={styles.extraUsers}>+{extraUsers}</div>
        )}
      </div>
    </div>
  );
};

export default LandCell;