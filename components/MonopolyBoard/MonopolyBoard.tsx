"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./MonopolyBoard.module.css";
import LandCell from "../LandCell/LandCell";
import ChanceCard from "../ChanceCard/ChanceCard";
import CommunityChestCard from "../CommunityChestCard/CommunityChestCard";
import DiceArea from "../DiceArea/DiceArea";
import { positionedCells } from "@/constant/landcell";
import { selectPlayers } from "@/redux/features/playerSlice";
import { useSelector } from "react-redux";
import PlayerWatcher from "../PlayerWatcher/PlayerWatcher";
import { selectLands } from "@/redux/features/landSlice";
import QuestionBox from "../QuestionBox/QuestionBox";
import { useQuestionQueue } from "@/hooks/useQuestionQueue";
import { useGlobalQuestion } from "@/provider/QuestionContext";

const MonopolyBoard: React.FC = () => {
  const players = useSelector(selectPlayers);
  const lands = useSelector(selectLands);

  const { question, confirm, cancel, isAutoDismiss } = useGlobalQuestion();  
  
  useEffect(() => {
    console.log("🟢 Question đã được cập nhật:", question);
  }, [question]);

  return (
    <>
      <div className={styles.boardWrapper}>
        <div className={styles.board}>
          {positionedCells.map((item, index) => {
            // console.log("Item:", item.cell.name, "Index:", index); // Log giá trị của item và index
            const land = lands[index]; // lấy dữ liệu theo index tương ứng từ slice

            return (
              <div
                key={index}
                style={{
                  gridColumn: item.col,
                  gridRow: item.row,
                }}
              >
                <LandCell
                  landCell={land} // truyền thông tin chi tiết từ Redux
                  landingUsers={players.filter(
                    (player) => player.position === index
                  )}
                />
              </div>
            );
          })}

          {/* Trung tâm bàn cờ */}
          <div
            className={styles.centerArea}
            style={{ gridColumn: "2 / 13", gridRow: "2 / 9" }}
          >
            {question ? (
              <QuestionBox
                question={question}
                onConfirm={confirm || (() => {})}
                onCancel={cancel || (() => {})}
                autoDismiss={isAutoDismiss} // Nếu không có nút, thì là autoDismiss
              />
            ) : (
              <div className={styles.centerContent}>
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
            )}
          </div>
        </div>
      </div>
      <PlayerWatcher />
    </>
  );
};

export default MonopolyBoard;
