import { LandCellData } from "@/types/landCell";
import styles from "./LandCell.module.css";
import React, { useState } from "react";
import StartCell from "../CornerCell/StartCell";
import JailCell from "../CornerCell/JailCell";
import GoJailCell from "../CornerCell/GoJailCell";
import ParkingCell from "../CornerCell/ParkingCell";
import LandInfoModal from "../LandInfoModal/LandInfoModal";
import { selectPlayers } from "@/redux/features/playerSlice";
import { useSelector } from "react-redux";

interface LandCellProps {
  landCell: LandCellData;
  landingUsers?: { id: number; avatar: string; color: string }[];
}

const maxIcons = 4;

const LandCell: React.FC<LandCellProps> = ({ landCell, landingUsers = [] }) => {
  const players = useSelector(selectPlayers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const extraUsers = landingUsers.length - maxIcons;

  const owner = landCell.owner
    ? players.find((user) => user.id === landCell.owner)
    : null;

  const houses = landCell.houses || 0;

  const handleCellClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          <div className={styles.details}>
            <div className={styles.name}>{landCell.name}</div>
            <div className={styles.price}>
              ${landCell.price.toLocaleString()}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div
        className={`${styles.cell} ${styles[landCell.color]}`}
        onClick={handleCellClick}
      >
        <div
          className={styles.ownerBar}
          style={{
            borderBottom: ["normal", "station", "utility"].includes(
              landCell.type
            )
              ? "1px solid #000"
              : "",
            backgroundColor: ["normal", "station", "utility"].includes(
              landCell.type
            )
              ? owner?.color || "#7e7e7e"
              : "transparent", // Không có màu nền nếu không phải ô đất có thể mua
          }}
        >
          {["normal", "station", "utility"].includes(landCell.type) &&
            Array.from({ length: houses }).map((_, index) => (
              <div key={index} className={styles.house}></div>
            ))}
        </div>

        {renderContent()}

        <div className={styles.users}>
          {landingUsers.slice(0, maxIcons).map((user) => (
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
        landCell={landCell}
      />
    </>
  );
};

export default LandCell;
