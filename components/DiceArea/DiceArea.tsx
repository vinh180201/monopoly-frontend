"use client";
import React, { useState } from "react";
import styles from "./DiceArea.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPlayer, rollDiceAndMove, nextPlayer } from "@/redux/features/playerSlice";

const DiceArea: React.FC = () => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector(selectCurrentPlayer);
  const [dice, setDice] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);

  const handleRollDice = () => {
    if (rolling) return;
    setRolling(true);

    const roll = Math.floor(Math.random() * 6) + 1;
    setDice(roll);

    setTimeout(() => {
      dispatch(rollDiceAndMove({ playerId: currentPlayer.id, steps: roll }));
      // dispatch(nextPlayer());
      setRolling(false);
    }, 800); // Giả lập hiệu ứng xoay
  };

  return (
    <div className={styles.diceArea}>
      <button className={styles.diceButton} onClick={handleRollDice}>
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>
      {dice !== null && <div className={styles.diceResult}>🎲 {dice}</div>}
      <div className={styles.currentPlayer}>
        {currentPlayer.name}'s Turn
      </div>
    </div>
  );
};

export default DiceArea;
