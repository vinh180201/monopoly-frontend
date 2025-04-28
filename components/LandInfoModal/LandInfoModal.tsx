import React from 'react';
import styles from './LandInfoModal.module.css';
import { LandCellData } from '@/types/landCell';

interface LandInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  landCell: LandCellData;
}

const LandInfoModal: React.FC<LandInfoModalProps> = ({
  isOpen,
  onClose,
  landCell,
}) => {
  if (!isOpen) return null;

  const { name, type, price, housePrice, fees, color } = landCell;

  const renderContent = () => {
    switch (type) {
      case 'normal':
        return (
          <>
            <p className={styles.info}><strong>Giá đất:</strong> ${price.toLocaleString()}</p>
            {housePrice && (
              <p className={styles.info}><strong>Giá nhà:</strong> ${housePrice.toLocaleString()}</p>
            )}
            {fees && (
              <div className={styles.fees}>
                <h3>Phí thuê:</h3>
                <ul>
                  <li>Không nhà: ${fees.level0.toLocaleString()}</li>
                  <li>1 nhà: ${fees.level1.toLocaleString()}</li>
                  <li>2 nhà: ${fees.level2.toLocaleString()}</li>
                  <li>3 nhà: ${fees.level3.toLocaleString()}</li>
                  <li>4 nhà: ${fees.level4.toLocaleString()}</li>
                  <li>Khách sạn: ${fees.hotel.toLocaleString()}</li>
                </ul>
              </div>
            )}
          </>
        );
      case 'station':
        return (
          <>
            <p className={styles.info}><strong>Giá nhà ga:</strong> ${price.toLocaleString()}</p>
            {fees && (
              <div className={styles.fees}>
                <h3>Phí thuê:</h3>
                <ul>
                  <li>Phí cơ bản: ${fees.level0.toLocaleString()}</li>
                  <li>2 nhà ga: ${fees.level1.toLocaleString()}</li>
                  <li>3 nhà ga: ${fees.level2.toLocaleString()}</li>
                  <li>4 nhà ga: ${fees.level3.toLocaleString()}</li>
                </ul>
              </div>
            )}
          </>
        );
      case 'utility':
        return (
          <>
            <p className={styles.info}><strong>Giá tiện ích:</strong> ${price.toLocaleString()}</p>
            <p className={styles.info}>
              <strong>Phí thuê:</strong> Tùy thuộc vào kết quả xúc xắc.
            </p>
          </>
        );
      case 'tax':
        return (
          <>
            <p className={styles.info}><strong>Thuế phải trả:</strong> ${Math.abs(price).toLocaleString()}</p>
          </>
        );
      case 'luck':
      case 'chance':
        return (
          <>
            <p className={styles.info}><strong>Ô đặc biệt:</strong> Rút thẻ cơ hội hoặc vận khí.</p>
          </>
        );
      default:
        return (
          <>
            <p className={styles.info}><strong>Loại ô:</strong> {type}</p>
          </>
        );
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={`${styles.colorBar} ${styles[color]}`}></div>
        <h2 className={styles.title}>{name}</h2>
        {renderContent()}
        <button className={styles.closeButton} onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

export default LandInfoModal;