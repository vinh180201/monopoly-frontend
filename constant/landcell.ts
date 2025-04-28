import { LandCellData } from "@/types/landCell";

// Hàng trên cùng (Top Row)
export const topRowData: LandCellData[] = [
  {
    name: "Hà Nội",
    price: 220,
    color: "red",
    type: "normal",
    index: 0,
    housePrice: 110,
    fees: { level0: 18, level1: 90, level2: 250, level3: 700, level4: 875, hotel: 1050 },
    sellPrices: { land: 110, house: 55 },
  },
  {
    name: "Hải Phòng",
    price: 240,
    color: "red",
    type: "normal",
    index: 0,
    housePrice: 120,
    fees: { level0: 20, level1: 100, level2: 300, level3: 750, level4: 925, hotel: 1100 },
    sellPrices: { land: 120, house: 60 },
  },
  { name: "Vận Khí", price: 0, color: "white", type: "luck", index: 0 },

  {
    name: "Nam Định",
    price: 260,
    color: "purple",
    type: "normal",
    index: 0,
    housePrice: 130,
    fees: { level0: 22, level1: 110, level2: 330, level3: 800, level4: 975, hotel: 1150 },
    sellPrices: { land: 130, house: 65 },
  },
  {
    name: "Thái Bình",
    price: 280,
    color: "purple",
    type: "normal",
    index: 0,
    housePrice: 140,
    fees: { level0: 24, level1: 120, level2: 360, level3: 850, level4: 1025, hotel: 1200 },
    sellPrices: { land: 140, house: 70 },
  },

  {
    name: "Nhà Ga Miền Tây",
    price: 200,
    color: "black",
    type: "station",
    index: 0,
    fees: { level0: 25, level1: 50, level2: 100, level3: 200, level4: 200, hotel: 200 },
    sellPrices: { land: 100, house: 0 },
  },
  {
    name: "Quảng Ninh",
    price: 300,
    color: "purple",
    type: "normal",
    index: 0,
    housePrice: 150,
    fees: { level0: 26, level1: 130, level2: 390, level3: 900, level4: 1075, hotel: 1250 },
    sellPrices: { land: 150, house: 75 },
  },
  {
    name: "Nước Sạch",
    price: 150,
    color: "white",
    type: "utility",
    index: 0,
    fees: { level0: 4, level1: 10, level2: 20, level3: 40, level4: 80, hotel: 100 },
    sellPrices: { land: 75, house: 0 },
  },
  {
    name: "Bắc Giang",
    price: 320,
    color: "lime",
    type: "normal",
    index: 0,
    housePrice: 160,
    fees: { level0: 28, level1: 150, level2: 450, level3: 1000, level4: 1200, hotel: 1400 },
    sellPrices: { land: 160, house: 80 },
  },
  {
    name: "Lào Cai",
    price: 340,
    color: "lime",
    type: "normal",
    index: 0,
    housePrice: 170,
    fees: { level0: 30, level1: 160, level2: 480, level3: 1100, level4: 1275, hotel: 1500 },
    sellPrices: { land: 170, house: 85 },
  },
];

// Cột phải (Right Column)
export const rightColData: LandCellData[] = [
  {
    name: "Phú Quốc",
    price: 360,
    color: "cyan",
    type: "normal",
    index: 0,
    housePrice: 180,
    fees: { level0: 32, level1: 180, level2: 500, level3: 1100, level4: 1300, hotel: 1500 },
    sellPrices: { land: 180, house: 90 },
  },
  {
    name: "Bạc Liêu",
    price: 380,
    color: "cyan",
    type: "normal",
    index: 0,
    housePrice: 190,
    fees: { level0: 34, level1: 190, level2: 520, level3: 1150, level4: 1350, hotel: 1550 },
    sellPrices: { land: 190, house: 95 },
  },
  {
    name: "Sơn La",
    price: 400,
    color: "cyan",
    type: "normal",
    index: 0,
    housePrice: 200,
    fees: { level0: 36, level1: 200, level2: 550, level3: 1200, level4: 1400, hotel: 1600 },
    sellPrices: { land: 200, house: 100 },
  },
  {
    name: "Điện Biên",
    price: 420,
    color: "green",
    type: "normal",
    index: 0,
    housePrice: 210,
    fees: { level0: 38, level1: 220, level2: 600, level3: 1300, level4: 1500, hotel: 1700 },
    sellPrices: { land: 210, house: 105 },
  },
  { name: "Thuế Tài Sản", price: -200, color: "white", type: "tax", index: 0 },
  {
    name: "Hà Giang",
    price: 440,
    color: "green",
    type: "normal",
    index: 0,
    housePrice: 220,
    fees: { level0: 40, level1: 240, level2: 650, level3: 1400, level4: 1600, hotel: 1800 },
    sellPrices: { land: 220, house: 110 },
  },
];

// Hàng dưới cùng (Bottom Row)
export const bottomRowData: LandCellData[] = [
  {
    index: 0,
    name: "Quảng Nam",
    price: 80,
    color: "teal",
    type: "normal",
    housePrice: 80,
    fees: {level0: 40, level1: 100, level2: 160, level3: 240, level4: 300, hotel: 420 },
    sellPrices: { land: 60, house: 40 },
  },
  {
    index: 0,
    name: "Bình Thuận",
    price: 60,
    color: "teal",
    type: "normal",
    housePrice: 80,
    fees: {level0: 40, level1: 100, level2: 170, level3: 230, level4: 280, hotel: 400 },
    sellPrices: { land: 60, house: 40 },
  },
  { index: 0, name: "Thuế", price: -200, color: "white", type: "tax" },
  {
    index: 0,
    name: "Phan Thiết",
    price: 120,
    color: "blue",
    type: "normal",
    housePrice: 100,
    fees: {level0: 60, level1: 120, level2: 200, level3: 300, level4: 400, hotel: 500 },
    sellPrices: { land: 100, house: 60 },
  },
  {
    index: 0,
    name: "Ga Miền Bắc",
    price: 200,
    color: "black",
    type: "station",
    housePrice: 0,
    fees: {level0: 100, level1: 200, level2: 400, level3: 800, level4: 800, hotel: 800 },
    sellPrices: { land: 150, house: 0 },
  },

  { index: 0, name: "Cơ Hội", price: 0, color: "white", type: "chance" },
  {
    index: 0,
    name: "Mỹ Tho",
    price: 140,
    color: "blue",
    type: "normal",
    housePrice: 100,
    fees: {level0: 70, level1: 140, level2: 220, level3: 320, level4: 420, hotel: 520 },
    sellPrices: { land: 110, house: 70 },
  },
  {
    index: 0,
    name: "Quảng Ngãi",
    price: 160,
    color: "blue",
    type: "normal",
    housePrice: 100,
    fees: {level0: 80, level1: 160, level2: 240, level3: 340, level4: 440, hotel: 540 },
    sellPrices: { land: 130, house: 80 },
  },
  {
    index: 0,
    name: "Nha Trang",
    price: 160,
    color: "pink",
    type: "normal",
    housePrice: 160,
    fees: {level0: 100, level1: 200, level2: 320, level3: 460, level4: 600, hotel: 760 },
    sellPrices: { land: 130, house: 80 },
  },
  {
    index: 0,
    name: "Bình Dương",
    price: 200,
    color: "pink",
    type: "normal",
    housePrice: 160,
    fees: {level0: 100, level1: 200, level2: 300, level3: 400, level4: 500, hotel: 600 },
    sellPrices: { land: 160, house: 80 },
  },
];

// Cột trái (Left Column)
export const leftColData: LandCellData[] = [
  {
    name: "Buôn Mê Thuột",
    price: 140,
    color: "pink",
    type: "normal",
    index: 0,
    housePrice: 70,
    fees: { level0: 10, level1: 50, level2: 150, level3: 450, level4: 625, hotel: 750 },
    sellPrices: { land: 70, house: 35 },
  },
  {
    name: "Điện Lực",
    price: 150,
    color: "white",
    type: "utility",
    index: 0,
    fees: { level0: 4, level1: 10, level2: 20, level3: 40, level4: 80, hotel: 100 },
    sellPrices: { land: 75, house: 0 },
  },
  {
    name: "Cần Thơ",
    price: 140,
    color: "yellow",
    type: "normal",
    index: 0,
    housePrice: 70,
    fees: { level0: 10, level1: 50, level2: 150, level3: 450, level4: 625, hotel: 750 },
    sellPrices: { land: 70, house: 35 },
  },
  {
    name: "Đà Lạt",
    price: 160,
    color: "yellow",
    type: "normal",
    index: 0,
    housePrice: 80,
    fees: { level0: 12, level1: 60, level2: 180, level3: 500, level4: 700, hotel: 900 },
    sellPrices: { land: 80, house: 40 },
  },
  {
    name: "Bắc Ninh",
    price: 180,
    color: "yellow",
    type: "normal",
    index: 0,
    housePrice: 90,
    fees: { level0: 14, level1: 70, level2: 200, level3: 550, level4: 750, hotel: 950 },
    sellPrices: { land: 90, house: 45 },
  },
  {
    name: "Hải Dương",
    price: 200,
    color: "red",
    type: "normal",
    index: 0,
    housePrice: 100,
    fees: { level0: 16, level1: 80, level2: 220, level3: 600, level4: 800, hotel: 1000 },
    sellPrices: { land: 100, house: 50 },
  },
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
