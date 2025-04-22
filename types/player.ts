export interface Player {
  id: number;
  name: string;
  avatar: string;
  color: string;
  position: number; // từ 0–35
  money: number; // Số tiền hiện tại của người chơi
  properties: number[]; // Danh sách các ô đất mà người chơi sở hữu (theo index)
}