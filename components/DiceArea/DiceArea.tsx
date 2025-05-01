import React, { useState } from "react";
import styles from "./DiceArea.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentPlayer, rollDiceAndMove } from "@/redux/features/playerSlice";
import { rollDice } from "@/redux/features/gameSlice"; // Import action rollDice

const DiceArea: React.FC = () => {
  const dispatch = useDispatch();
  const currentPlayer = useSelector(selectCurrentPlayer);
  const [dice, setDice] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);

  const handleRollDice = () => {
    if (rolling || currentPlayer.turnLeft <= 0) return;

    setRolling(true);

    const roll = Math.floor(Math.random() * 12) + 1;
    setDice(roll);

    setTimeout(() => {
      dispatch(rollDice()); // Cập nhật trạng thái hasRolledDice trong Redux
      dispatch(rollDiceAndMove({ playerId: currentPlayer.id, steps: roll }));
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