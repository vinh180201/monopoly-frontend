import React from "react";
import styles from "./AvatarPath.module.css";

const TOTAL_POSITIONS = 40; // Tổng số ô trên bàn cờ
const ROW_LENGTH = 10; // Số ô trên mỗi hàng (ví dụ: 10 ô trên hàng trên và dưới)

interface AvatarPathProps {
  players: {
    id: number;
    name: string;
    avatar: string;
    position: number; // Vị trí của người chơi trên bàn cờ
  }[];
}

const AvatarPath: React.FC<AvatarPathProps> = ({ players }) => {
  return (
    <div className={styles.pathContainer}>
      {Array.from({ length: TOTAL_POSITIONS }).map((_, index) => {
        // Tính toán vị trí hàng và cột dựa trên `index`
        let row, col;

        if (index < ROW_LENGTH) {
          // Hàng trên cùng
          row = 0;
          col = index;
        } else if (index < ROW_LENGTH + ROW_LENGTH) {
          // Cột phải
          row = index - ROW_LENGTH;
          col = ROW_LENGTH - 1;
        } else if (index < ROW_LENGTH * 3) {
          // Hàng dưới cùng (ngược lại)
          row = ROW_LENGTH - 1;
          col = ROW_LENGTH - 1 - (index - ROW_LENGTH * 2);
        } else {
          // Cột trái (ngược lại)
          row = ROW_LENGTH - 1 - (index - ROW_LENGTH * 3);
          col = 0;
        }

        return (
          <div
            key={index}
            className={styles.pathCell}
            style={{
              gridRow: row + 1,
              gridColumn: col + 1,
            }}
          >
            {/* Hiển thị avatar của người chơi tại vị trí tương ứng */}
            {players
              .filter((player) => player.position === index)
              .map((player) => (
                <div key={player.id} className={styles.avatar}>
                  {player.avatar}
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default AvatarPath;