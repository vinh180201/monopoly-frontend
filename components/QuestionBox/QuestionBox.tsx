import React from "react";
import styles from "./QuestionBox.module.css";

interface QuestionBoxProps {
  question: string;
  onConfirm: () => void;
  onCancel: () => void;
  autoDismiss?: boolean; // Thêm prop autoDismiss
}

const QuestionBox: React.FC<QuestionBoxProps> = ({
  question,
  onConfirm,
  onCancel,
  autoDismiss = false, // Mặc định là false
}) => {
  return (
    <div className={styles.questionBox}>
      <p className={styles.questionText}>{question}</p>
      {!autoDismiss && ( // Chỉ hiển thị các nút nếu autoDismiss là false
        <div className={styles.actions}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Đồng ý
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            Hủy
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionBox;