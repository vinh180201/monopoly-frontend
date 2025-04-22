export interface LandCellData {
  index: number
  name: string;
  price: number;
  color: string;
  type?: "start" | "jail" | "goToJail" | "parking" | "normal"; // Loại cell
  owner?: number; // ID của người chơi sở hữu ô đất (nếu có)
  housePrice?: number; // Giá mua nhà trên ô đất
  houses?: number; // Số lượng nhà trên ô đất
}