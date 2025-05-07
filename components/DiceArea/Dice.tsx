// components/Dice.tsx
import React from "react";
import {
  faDiceOne,
  faDiceTwo,
  faDiceThree,
  faDiceFour,
  faDiceFive,
  faDiceSix,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Dice.module.css";

type DiceProps = {
  value: number;
  rolling?: boolean;
};

const getDiceIcon = (value: number) => {
  switch (value) {
    case 1:
      return faDiceOne;
    case 2:
      return faDiceTwo;
    case 3:
      return faDiceThree;
    case 4:
      return faDiceFour;
    case 5:
      return faDiceFive;
    case 6:
      return faDiceSix;
    default:
      return faDiceOne;
  }
};

const Dice: React.FC<DiceProps> = ({ value, rolling = false }) => {
  return (
    <div className={styles.dice}>
      <FontAwesomeIcon icon={getDiceIcon(value)} size="4x" />
    </div>
  );
};

export default Dice;
