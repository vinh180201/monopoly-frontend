import React from "react";
import styles from "./BuyLandModal.module.css";

interface BuyLandModalProps {
  isOpen: boolean;
  landName: string;
  price: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const BuyLandModal: React.FC<BuyLandModalProps> = ({
  isOpen,
  landName,
  price,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Mua đất: {landName}</h2>
        <p>Bạn có muốn mua ô đất này với giá <strong>${price}</strong> không?</p>
        <div className={styles.actions}>
          <button className={styles.confirm} onClick={onConfirm}>Mua</button>
          <button className={styles.cancel} onClick={onCancel}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

export default BuyLandModal;
