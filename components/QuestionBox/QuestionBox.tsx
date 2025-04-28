import React from "react";
import styles from "./QuestionBox.module.css";

interface QuestionBoxProps {
  question: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({
  question,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className={styles.questionBox}>
      <p className={styles.questionText}>{question}</p>
      <div className={styles.actions}>
        <button className={styles.confirmButton} onClick={onConfirm}>
          Đồng ý
        </button>
        <button className={styles.cancelButton} onClick={onCancel}>
          Hủy
        </button>
      </div>
    </div>
  );
};

export default QuestionBox;