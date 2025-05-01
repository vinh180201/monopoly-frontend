import React, { useState } from "react";
import styles from "./DiceArea.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPlayer, movePlayerStepByStep } from "@/redux/features/playerSlice";
import { rollDice, setMoving } from "@/redux/features/gameSlice"; // Import action rollDice
import { AppDispatch } from "@/redux/store"; // Import AppDispatch

const DiceArea: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Sử dụng AppDispatch
  const currentPlayer = useSelector(selectCurrentPlayer);
  const [dice, setDice] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);

  const handleRollDice = () => {
    if (rolling || currentPlayer.turnLeft <= 0) return;

    setRolling(true);

    const roll = Math.floor(Math.random() * 12) + 1;
    // const roll = 0;
    setDice(roll);

    setTimeout(() => {
      dispatch(rollDice()); // Cập nhật trạng thái hasRolledDice trong Redux
      dispatch(movePlayerStepByStep(currentPlayer.id, roll)); // Di chuyển từng bước
      setRolling(false);
    }, 800);
  };

  return (
    <div className={styles.diceArea}>
      <button
        className={styles.rollButton}
        onClick={handleRollDice}
        disabled={rolling}
      >
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>
      {dice !== null && <div className={styles.diceResult}>🎲 {dice}</div>}
    </div>
  );
};

export default DiceArea;