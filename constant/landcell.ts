import { LandCellData } from "@/types/landCell";

// Hàng trên cùng (Top Row)
export const topRowData: LandCellData[] = [
  { name: "Hà Nội", price: 220, color: "red", index: 0, housePrice: 50, houses: 0, owner: undefined, type: "normal" },
  { name: "Cơ Hội", price: 0, color: "white", index: 0, type: "chance" },
  { name: "Hải Dương", price: 220, color: "red", index: 0, housePrice: 50, houses: 0, owner: undefined, type: "normal" },
  { name: "Nam Định", price: 240, color: "red", index: 0, housePrice: 60, houses: 0, owner: undefined, type: "normal" },
  { name: "Nhà Ga Miền Tây", price: 200, color: "black", index: 0, housePrice: 100, houses: 0, owner: undefined, type: "station" },
  { name: "Thái Bình", price: 260, color: "yellow", index: 0, housePrice: 75, houses: 0, owner: undefined, type: "normal" },
  { name: "Vận khí", price: 0, color: "white", index: 0, type: "luck" },
  { name: "Nước Sạch", price: 150, color: "white", index: 0, owner: undefined, type: "utility" },
  { name: "Bắc Ninh", price: 280, color: "yellow", index: 0, housePrice: 80, houses: 0, owner: undefined, type: "normal" },
  { name: "Hưng Yên", price: 260, color: "yellow", index: 0, housePrice: 75, houses: 0, owner: undefined, type: "normal" },
];

// Cột phải (Right Column)
export const rightColData: LandCellData[] = [
  { name: "Phú Quốc", price: 300, color: "green", index: 0, housePrice: 100, houses: 0, owner: undefined, type: "normal" },
  { name: "Bạc Liêu", price: 300, color: "green", index: 0, housePrice: 100, houses: 0, owner: undefined, type: "normal" },
  { name: "Cơ Hội", price: 0, color: "blue", index: 0, type: "chance" },
  { name: "Sơn La", price: 320, color: "green", index: 0, housePrice: 120, houses: 0, owner: undefined, type: "normal" },
  { name: "Nhà Ga Miền Bắc", price: 200, color: "black", index: 0, housePrice: 100, houses: 0, owner: undefined, type: "station" },
  { name: "Điện Biên", price: 400, color: "blue", index: 0, type: "normal" },
];

// Hàng dưới cùng (Bottom Row)
export const bottomRowData: LandCellData[] = [
  { name: "Sài Gòn", price: 60, color: "purple", index: 0, housePrice: 30, houses: 0, owner: undefined, type: "normal" },
  { name: "Sài Gòn", price: 60, color: "purple", index: 0, housePrice: 30, houses: 0, owner: undefined, type: "normal" },
  { name: "Cơ Hội", price: 0, color: "blue", index: 0, type: "chance" },
  { name: "Nha Trang", price: 60, color: "purple", index: 0, housePrice: 30, houses: 0, owner: undefined, type: "normal" },
  { name: "Thuế Thu Nhập", price: -200, color: "red", index: 0, type: "tax" },
  { name: "Nhà Ga Trung Tâm", price: 200, color: "black", index: 0, housePrice: 100, houses: 0, owner: undefined, type: "station" },
  { name: "Vũng Tàu", price: 100, color: "lightblue", index: 0, housePrice: 50, houses: 0, owner: undefined, type: "normal" },
  { name: "Cơ Hội", price: 0, color: "blue", index: 0, type: "chance" },
  { name: "Huế", price: 100, color: "lightblue", index: 0, housePrice: 50, houses: 0, owner: undefined, type: "normal" },
  { name: "Hải Phòng", price: 120, color: "lightblue", index: 0, housePrice: 60, houses: 0, owner: undefined, type: "normal" },
];

// Cột trái (Left Column)
export const leftColData: LandCellData[] = [
  { name: "Buôn Mê Thuột", price: 140, color: "pink", index: 0, housePrice: 70, houses: 0, owner: undefined, type: "normal" },
  { name: "Điện Lực", price: 150, color: "white", index: 0, type: "utility" },
  { name: "Cần Thơ", price: 140, color: "pink", index: 0, housePrice: 70, houses: 0, owner: undefined, type: "normal" },
  { name: "Đà Lạt", price: 160, color: "pink", index: 0, housePrice: 80, houses: 0, owner: undefined, type: "normal" },
  { name: "Nhà Ga Miền Đông", price: 200, color: "black", index: 0, housePrice: 100, houses: 0, owner: undefined, type: "station" },
  { name: "Bãi Đậu Xe", price: 0, color: "green", index: 0, type: "parking" },
];

// Các ô góc (Corner Cells)
export const cornerCells: LandCellData[] = [
  { name: "Nhà Tù", price: 0, color: "white", type: "jail", index: 0 },
  { name: "Bắt Đầu", price: 0, color: "white", type: "start", index: 0 },
  { name: "Vào Tù", price: 0, color: "white", type: "goToJail", index: 0 },
  { name: "Bãi Đậu Xe", price: 0, color: "white", type: "parking", index: 0 },
];

export const positionedCells = [
  { cell: cornerCells[1], row: 8, col: 12 }, // pos 0

  ...bottomRowData.map((cell, idx) => ({ cell, row: 8, col: 11 - idx })), // pos 1–10

  { cell: cornerCells[0], row: 8, col: 1 }, // pos 11

  ...leftColData.map((cell, idx) => ({ cell, row: 7 - idx, col: 1 })), // pos 12–21

  { cell: cornerCells[3], row: 1, col: 1 }, // pos 22

  ...topRowData.map((cell, idx) => ({ cell, row: 1, col: idx + 2 })), // pos 23–32

  { cell: cornerCells[2], row: 1, col: 12 }, // pos 33

  ...rightColData.map((cell, idx) => ({ cell, row: idx + 2, col: 12 })), // pos 34–43
];


export const landCellData = positionedCells.map((item, idx) => ({
  index: idx,  // Đặt index dựa vào thứ tự trong positionedCells
  name: item.cell.name,
  price: item.cell.price,
  color: item.cell.color,
  type: item.cell.type || "normal", // Nếu không có type thì mặc định là "normal"
  owner: undefined, // Không có chủ sở hữu ban đầu
  housePrice: item.cell.housePrice || 0, // Mặc định không có nhà
  houses: item.cell.houses || 0, // Mặc định không có nhà
}));