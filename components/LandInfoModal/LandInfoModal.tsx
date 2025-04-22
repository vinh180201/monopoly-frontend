import React from 'react';
import styles from './LandInfoModal.module.css';

interface LandInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  landCellName: string;
  landCellPrice: number;
  landCellType: string;
}

const LandInfoModal: React.FC<LandInfoModalProps> = ({ isOpen, onClose, landCellName, landCellPrice, landCellType }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>{landCellName}</h2>
        <p>Loại: {landCellType}</p>
        <p>Giá: ${landCellPrice.toLocaleString()}</p>
        <button className={styles.closeButton} onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default LandInfoModal;
