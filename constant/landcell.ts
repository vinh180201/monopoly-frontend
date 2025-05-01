import { LandCellData } from "@/types/landCell";
import { bottomRowData } from "./botCells";
import { leftColData } from "./leftCells";
import { rightColData } from "./rightCells";
import { topRowData } from "./topCells";

// Các ô góc (Corner Cells)
export const cornerCells: LandCellData[] = [
  { name: "Nhà Tù", price: 0, color: "white", type: "jail", index: 0 },
  { name: "Bắt Đầu", price: 0, color: "white", type: "start", index: 0 },
  { name: "Vào Tù", price: 0, color: "white", type: "goToJail", index: 0 },
  { name: "Bãi Đậu Xe", price: 0, color: "white", type: "parking", index: 0 },
];

export const positionedCells = [
  { cell: cornerCells[1], row: 9, col: 13 }, 

  ...bottomRowData.map((cell, idx) => ({ cell, row: 9, col: 12 - idx })), 

  { cell: cornerCells[0], row: 9, col: 1 }, 

  ...leftColData.map((cell, idx) => ({ cell, row: 8 - idx, col: 1 })), 

  { cell: cornerCells[3], row: 1, col: 1 }, 

  ...topRowData.map((cell, idx) => ({ cell, row: 1, col: idx + 2 })), 

  { cell: cornerCells[2], row: 1, col: 13 }, 

  ...rightColData.map((cell, idx) => ({ cell, row: idx + 2, col: 13 })), 
];

export const landCellData: LandCellData[] = positionedCells.map((item, idx) => ({
  index: idx, // Đặt index dựa vào thứ tự trong positionedCells
  name: item.cell.name,
  price: item.cell.price,
  color: item.cell.color,
  type: item.cell.type || "normal", // Nếu không có type thì mặc định là "normal"
  owner: undefined, // Không có chủ sở hữu ban đầu
  housePrice: item.cell.housePrice || 0, // Mặc định không có nhà
  houses: item.cell.houses || 0, // Mặc định không có nhà
  fees: item.cell.fees || { level0: 0, level1: 0, level2: 0, level3: 0, level4: 0, hotel: 0 }, // Mặc định không có phí
  sellPrices: item.cell.sellPrices || { land: 0, house: 0 }, // Mặc định giá bán là 0
}));
