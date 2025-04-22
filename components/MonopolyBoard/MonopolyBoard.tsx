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
  cornerCells,
} from "@/constant/landcell";

const MonopolyBoard: React.FC = () => {
  const players = [
    { id: 1, name: "Player 1", avatar: "🧙", color: "#f44336", position: 0 },
    { id: 2, name: "Player 2", avatar: "🧙‍♂️", color: "#2196f3", position: 10 },
    { id: 3, name: "Player 3", avatar: "🧙‍♀️", color: "#4caf50", position: 10 },
    { id: 4, name: "Player 4", avatar: "🧙", color: "#ffeb3b", position: 32 },
  ];

  const positionedCells = [
    // Bottom row: Left to Right (Start to Jail)
    { cell: cornerCells[0], row: 8, col: 1 },
    ...bottomRowData.map((cell, idx) => ({ cell, row: 8, col: idx + 2 })),
    { cell: cornerCells[1], row: 8, col: 12 },

    // Right column: Bottom to Top
    ...rightColData.map((cell, idx) => ({ cell, row: 7 - idx, col: 12 })),
    { cell: cornerCells[2], row: 1, col: 12 },

    // Top row: Right to Left
    ...topRowData.map((cell, idx) => ({ cell, row: 1, col: 11 - idx })),
    { cell: cornerCells[3], row: 1, col: 1 },

    // Left column: Top to Bottom
    ...leftColData.map((cell, idx) => ({ cell, row: idx + 2, col: 1 })),
  ];

  return (
    <div className={styles.boardWrapper}>
      <div className={styles.board}>
        {positionedCells.map((item, index) => (
          <div
            key={index}
            style={{
              gridColumn: item.col,
              gridRow: item.row,
            }}
          >
            <LandCell
              landCell={item.cell}
              users={players.filter((player) => player.position === index)}
            />
          </div>
        ))}

        {/* Trung tâm bàn cờ */}
        <div className={styles.centerArea} style={{ gridColumn: "2 / 12", gridRow: "2 / 8" }}>
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