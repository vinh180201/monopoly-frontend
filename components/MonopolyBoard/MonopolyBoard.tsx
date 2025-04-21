"use client";
import React from "react";
import styles from "./MonopolyBoard.module.css";
import LandCell from "../LandCell/LandCell";
import ChanceCard from "../ChanceCard/ChanceCard";
import CommunityChestCard from "../CommunityChestCard/CommunityChestCard";
import DiceArea from "../DiceArea/DiceArea";
import {
  bottomRowData,
  leftColData,
  rightColData,
  topRowData,
} from "@/constant/landcell";
import StartCell from "../CornerCell/StartCell";
import GoJailCell from "../CornerCell/GoJailCell";
import JailCell from "../CornerCell/JailCell";
import ParkingCell from "../CornerCell/ParkingCell";

const MonopolyBoard: React.FC = () => {
  const players = [
    { id: 1, name: "Player 1", avatar: "🧍", position: 0 },
    { id: 2, name: "Player 2", avatar: "🧍‍♂️", position: 0 },
    { id: 3, name: "Player 3", avatar: "🧍‍♀️", position: 0 },
    { id: 4, name: "Player 4", avatar: "🧍", position: 0 },
  ];

  const allCells = [
    ...topRowData,
    ...rightColData,
    ...bottomRowData.reverse(),
    ...leftColData.reverse(),
  ]; // Tất cả các ô đất theo thứ tự đường đi

  return (
    <div className={styles.boardWrapper}>
      <div className={styles.board}>
        {/* Góc trên bên trái */}
        <div className={styles.topLeftCorner}>
          <ParkingCell />
        </div>

        {/* Hàng trên cùng */}
        {topRowData.map((land, index) => (
          <LandCell
            key={`top-${index}`}
            landCell={land}
            users={players.filter((player) => player.position === index)}
          />
        ))}

        {/* Góc trên bên phải */}
        <div className={styles.topRightCorner}>
          <GoJailCell />
        </div>

        {/* Cột phải */}
        {rightColData.map((land, index) => (
          <LandCell
            key={`right-${index}`}
            landCell={land}
            users={players.filter(
              (player) => player.position === topRowData.length + index
            )}
          />
        ))}

        {/* Góc dưới bên phải */}
        <div className={styles.bottomRightCorner}>
          <StartCell />
        </div>

        {/* Hàng dưới cùng */}
        {bottomRowData.map((land, index) => (
          <LandCell
            key={`bottom-${index}`}
            landCell={land}
            users={players.filter(
              (player) =>
                player.position ===
                topRowData.length + rightColData.length + index
            )}
          />
        ))}

        {/* Góc dưới bên trái */}
        <div className={styles.bottomLeftCorner}>
          <JailCell />
        </div>

        {/* Cột trái */}
        {leftColData.map((land, index) => (
          <LandCell
            key={`left-${index}`}
            landCell={land}
            users={players.filter(
              (player) =>
                player.position ===
                topRowData.length +
                  rightColData.length +
                  bottomRowData.length +
                  index
            )}
          />
        ))}

        {/* Khu vực trung tâm */}
        <div className={styles.centerArea}>
          <div className={styles.chanceCard}>
            <ChanceCard />
          </div>
          <div className={styles.diceArea}>
            <DiceArea />
          </div>
          <div className={styles.communityChest}>
            <CommunityChestCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonopolyBoard;