import React from 'react';
import styles from './DiceArea.module.css';

const DiceArea: React.FC = () => {
  return (
    <div className={styles.diceArea}>
      <button className={styles.diceButton}>Roll Dice</button>
    </div>
  );
};

export default DiceArea;
