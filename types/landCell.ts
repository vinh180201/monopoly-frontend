export interface LandCellData {
  index: number;
  name: string;
  price: number;
  color: string;
  type: "start" | "jail" | "goToJail" | "parking" | "normal" | "chance" | "luck" | "utility" | "station" | "tax"; // Loại cell
  owner?: number; // ID của người chơi sở hữu ô đất (nếu có)
  housePrice?: number; // Giá mua nhà trên ô đất
  houses?: number; // Số lượng nhà trên ô đất
}

export interface PositionedCell {
  cell: LandCellData; // Dữ liệu của ô đất
  row: number; // Vị trí hàng trong lưới
  col: number; // Vị trí cột trong lưới
}