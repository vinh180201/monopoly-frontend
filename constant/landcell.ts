import { LandCellData } from "@/types/landCell";

// Hàng trên cùng (Top Row)
export const topRowData: LandCellData[] = [
  { name: "Hà Nội", price: 220, color: "red", index: 1, housePrice: 50, houses: 0, owner: undefined },
  { name: "Cơ Hội", price: 0, color: "blue", index: 2 },
  { name: "Hải Dương", price: 220, color: "red", index: 3, housePrice: 50, houses: 0, owner: undefined },
  { name: "Nam Định", price: 240, color: "red", index: 4, housePrice: 60, houses: 0, owner: undefined },
  { name: "Nhà Ga Miền Tây", price: 200, color: "black", index: 5, housePrice: 100, houses: 0, owner: undefined },
  { name: "Thái Bình", price: 260, color: "yellow", index: 6, housePrice: 75, houses: 0, owner: undefined },
  { name: "Hưng Yên", price: 260, color: "yellow", index: 7, housePrice: 75, houses: 0, owner: undefined },
  { name: "Nước Sạch", price: 150, color: "white", index: 8 },
  { name: "Bắc Ninh", price: 280, color: "yellow", index: 9, housePrice: 80, houses: 0, owner: undefined },
  { name: "Sài Gòn", price: 60, color: "purple", index: 10, housePrice: 30, houses: 0, owner: undefined },
];

// Cột phải (Right Column)
export const rightColData: LandCellData[] = [
  { name: "Phú Quốc", price: 300, color: "green", index: 11, housePrice: 100, houses: 0, owner: undefined },
  { name: "Bạc Liêu", price: 300, color: "green", index: 12, housePrice: 100, houses: 0, owner: undefined },
  { name: "Cơ Hội", price: 0, color: "blue", index: 13 },
  { name: "Sơn La", price: 320, color: "green", index: 14, housePrice: 120, houses: 0, owner: undefined },
  { name: "Nhà Ga Miền Bắc", price: 200, color: "black", index: 15, housePrice: 100, houses: 0, owner: undefined },
  { name: "Điện Biên", price: 400, color: "blue", index: 16 },
];

// Hàng dưới cùng (Bottom Row)
export const bottomRowData: LandCellData[] = [
  { name: "Sài Gòn", price: 60, color: "purple", index: 17, housePrice: 30, houses: 0, owner: undefined },
  { name: "Sài Gòn", price: 60, color: "purple", index: 18, housePrice: 30, houses: 0, owner: undefined },
  { name: "Cơ Hội", price: 0, color: "blue", index: 19 },
  { name: "Nha Trang", price: 60, color: "purple", index: 20, housePrice: 30, houses: 0, owner: undefined },
  { name: "Thuế Thu Nhập", price: -200, color: "red", index: 21 },
  { name: "Nhà Ga Trung Tâm", price: 200, color: "black", index: 22, housePrice: 100, houses: 0, owner: undefined },
  { name: "Vũng Tàu", price: 100, color: "lightblue", index: 23, housePrice: 50, houses: 0, owner: undefined },
  { name: "Cơ Hội", price: 0, color: "blue", index: 24 },
  { name: "Huế", price: 100, color: "lightblue", index: 25, housePrice: 50, houses: 0, owner: undefined },
  { name: "Hải Phòng", price: 120, color: "lightblue", index: 26, housePrice: 60, houses: 0, owner: undefined },
];

// Cột trái (Left Column)
export const leftColData: LandCellData[] = [
  { name: "Buôn Mê Thuột", price: 140, color: "pink", index: 27, housePrice: 70, houses: 0, owner: undefined },
  { name: "Điện Lực", price: 150, color: "white", index: 28 },
  { name: "Cần Thơ", price: 140, color: "pink", index: 29, housePrice: 70, houses: 0, owner: undefined },
  { name: "Đà Lạt", price: 160, color: "pink", index: 30, housePrice: 80, houses: 0, owner: undefined },
  { name: "Nhà Ga Miền Đông", price: 200, color: "black", index: 31, housePrice: 100, houses: 0, owner: undefined },
  { name: "Bãi Đậu Xe", price: 0, color: "green", index: 32 },
];

// Các ô góc (Corner Cells)
export const cornerCells: LandCellData[] = [
  { name: "Nhà Tù", price: 0, color: "white", type: "jail", index: 33 },
  { name: "Bắt Đầu", price: 0, color: "white", type: "start", index: 0 },
  { name: "Vào Tù", price: 0, color: "white", type: "goToJail", index: 34 },
  { name: "Bãi Đậu Xe", price: 0, color: "white", type: "parking", index: 35 },
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