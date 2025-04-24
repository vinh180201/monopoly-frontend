import React from "react";
import styles from "./InfoModal.module.css";

interface InfoModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Thông báo</h2>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.close} onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;