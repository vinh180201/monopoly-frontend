import React from 'react';

interface PlayerIconProps {
  color: string; // Màu sắc đại diện cho người chơi
}

const PlayerIcon: React.FC<PlayerIconProps> = ({ color }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: '50%', backgroundColor: color }}
    >
      <circle cx="12" cy="12" r="10" fill={color} />
    </svg>
  );
};

export default PlayerIcon;