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
  positionedCells,
} from "@/constant/landcell";
import { selectPlayers } from "@/redux/features/playerSlice";
import { useSelector } from "react-redux";
import PlayerWatcher from "../PlayerWatcher/PlayerWatcher";

const MonopolyBoard: React.FC = () => {
  const players = useSelector(selectPlayers);

  return (
    <>
      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          {positionedCells.map((item, index) => {
            // console.log("Item:", item.cell.name, "Index:", index); // Log giá trị của item và index
            return (
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
            );
          })}

          {/* Trung tâm bàn cờ */}
          <div
            className={styles.centerArea}
            style={{ gridColumn: "2 / 12", gridRow: "2 / 8" }}
          >
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
      <PlayerWatcher />
    </>
  );
};

export default MonopolyBoard;
