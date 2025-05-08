import React, { useState } from "react";
import styles from "./DiceArea.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentPlayer,
  movePlayerStepByStep,
  skipPlayerTurn,
  releaseFromJail,
  decreaseJailTurn,
} from "@/redux/features/playerSlice";
import {
  resetTurn,
  rollDice,
  selectGameState,
  setDoubleDice,
} from "@/redux/features/gameSlice"; // Import action rollDice
import { AppDispatch } from "@/redux/store"; // Import AppDispatch
import Dice from "./Dice";
import { useGlobalQuestion } from "@/provider/QuestionContext";

const DiceArea: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentPlayer = useSelector(selectCurrentPlayer);
  const gameState = useSelector(selectGameState); // Lấy trạng thái gameState
  const [dice1, setDice1] = useState<number | null>(null);
  const [dice2, setDice2] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const { showQuestion } = useGlobalQuestion();

  const handleRollDice = () => {
    if (rolling || currentPlayer.turnLeft <= 0 || gameState.hasRolledDice)
      return;

    setRolling(true);

    // Tung 2 xúc xắc
    // const roll1 = Math.floor(Math.random() * 6) + 1;
    // const roll2 = Math.floor(Math.random() * 6) + 1;
    const roll1 = 2;
    const roll2 = 3;
    const total = roll1 + roll2;

    setDice1(roll1);
    setDice2(roll2);

    setTimeout(() => {
      const isDouble = roll1 === roll2;

      if (currentPlayer.turnInJail > 0) {
        if (isDouble) {
          // 🎉 Ra tù và được di chuyển
          showQuestion(
            `🎲 Player ${currentPlayer.id} tung ra đôi và được ra tù!`,
            () => {},
            () => {},
            true
          );
          console.log(`🎲 Player ${currentPlayer.id} tung ra đôi và được ra tù!`);
          dispatch(releaseFromJail({playerId: currentPlayer.id}));
          // dispatch(movePlayerStepByStep(currentPlayer.id, total));
          dispatch(setDoubleDice({ rollDouble: true }));
        } else {
          dispatch(decreaseJailTurn({playerId: currentPlayer.id}));
          // ❌ Không ra được, mất lượt
          console.log(
            `🚫 Player ${currentPlayer.id} không ra đôi, vẫn ở tù và mất lượt.`
          );
          dispatch(skipPlayerTurn({ playerId: currentPlayer.id, turns: 1 }));
        }
  
        setRolling(false);
        return;
      }

      dispatch(rollDice({ hasRolledDice: true })); // Cập nhật trạng thái hasRolledDice trong Redux
      dispatch(movePlayerStepByStep(currentPlayer.id, total)); // Di chuyển từng bước

      // Nếu 2 xúc xắc giống nhau, thêm 1 lượt
      if (isDouble) {
        dispatch(setDoubleDice({ rollDouble: true }));
        console.log(
          `🎉 Double dice! Player ${currentPlayer.id} được thêm 1 lượt.`
        );
      } else {
        dispatch(skipPlayerTurn({ playerId: currentPlayer.id, turns: 1 })); // Giảm lượt nếu không phải double
      }

      setRolling(false);
    }, 800);
  };

  return (
    <div className={styles.diceArea}>
      <button
        className={styles.rollButton}
        onClick={handleRollDice}
        disabled={rolling || gameState.hasRolledDice} // Không cho phép roll nếu đã roll
      >
        {rolling ? "Rolling..." : "Roll Dice"}
      </button>
      {dice1 !== null && dice2 !== null && (
        <div className={styles.diceResult}>
          <Dice value={dice1} rolling={rolling} />
          <Dice value={dice2} rolling={rolling} />
          <span>= &nbsp; {dice1 + dice2}</span>
        </div>
      )}
    </div>
  );
};

export default DiceArea;
