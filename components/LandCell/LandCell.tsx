import { LandCellData } from '@/types/landCell';
import styles from './LandCell.module.css';
import React from 'react';

interface LandCellProps {
  landCell: LandCellData;
  users?: { id: number; avatar: string }[]; // Danh sách user đang ở trên ô đất
  houses?: number; // Số lượng nhà trên ô đất
}

const LandCell: React.FC<LandCellProps> = ({ landCell, users = [], houses = 0 }) => {
  return (
    <div className={`${styles.cell} ${styles[landCell.color]}`}>
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

      {/* User icons */}
      <div className={styles.users}>
        {users.map((user) => (
          <div key={user.id} className={styles.avatar}>
            {user.avatar}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandCell;