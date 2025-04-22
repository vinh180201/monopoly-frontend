import { LandCellData } from "@/types/landCell";
import styles from "./LandCell.module.css";
import React, { useState } from "react";
import StartCell from "../CornerCell/StartCell";
import JailCell from "../CornerCell/JailCell";
import GoJailCell from "../CornerCell/GoJailCell";
import ParkingCell from "../CornerCell/ParkingCell";
import LandInfoModal from "../LandInfoModal/LandInfoModal";
import { selectCurrentPlayer, updatePlayerMoney } from "@/redux/features/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { addHouseToLand } from "@/redux/features/landSlice";

interface LandCellProps {
  landCell: LandCellData;
  users?: { id: number; avatar: string; color: string }[]; // Danh sách user đang ở trên ô đất
  houses?: number; // Số lượng nhà trên ô đất
}

const maxIcons = 4; // Số lượng icon tối đa hiển thị

const LandCell: React.FC<LandCellProps> = ({
  landCell,
  houses = 0,
  users = [],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State để kiểm soát modal
  const extraUsers = users.length - maxIcons; // Số lượng người chơi còn lại

  const handleCellClick = () => {
    setIsModalOpen(true); // Mở modal khi click vào ô đất
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Đóng modal khi nhấn "Đóng"
  };

  const renderContent = () => {
    switch (landCell.type) {
      case "start":
        return <StartCell />;
      case "jail":
        return <JailCell />;
      case "goToJail":
        return <GoJailCell />;
      case "parking":
        return <ParkingCell />;
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
              <div className={styles.price}>
                ${landCell.price.toLocaleString()}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <div
        className={`${styles.cell} ${styles[landCell.color]}`}
        onClick={handleCellClick}
      >
        {renderContent()}

        {/* Hiển thị avatar của người chơi */}
        <div className={styles.users}>
          {users.slice(0, maxIcons).map((user, index) => (
            <div
              key={user.id}
              className={styles.avatar}
              style={{ backgroundColor: user.color }}
            >
              {user.avatar}
            </div>
          ))}
          {extraUsers > 0 && (
            <div className={styles.extraUsers}>+{extraUsers}</div>
          )}
        </div>
      </div>
      <LandInfoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        landCellName={landCell.name}
        landCellPrice={landCell.price}
        landCellType={landCell.type || ""}
      />
    </>
  );
};

export default LandCell;
