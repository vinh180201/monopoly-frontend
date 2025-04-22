import { LandCellData } from "@/types/landCell";

// Hàng trên cùng (Top Row)
export const topRowData: LandCellData[] = [
  { name: "Hà Nội", price: 220, color: "red" },
  { name: "Cơ Hội", price: 0, color: "blue" },
  { name: "Hải Dương", price: 220, color: "red" },
  { name: "Nam Định", price: 240, color: "red" },
  { name: "Nhà Ga Miền Tây", price: 200, color: "black" },
  { name: "Thái Bình", price: 260, color: "yellow" },
  { name: "Hưng Yên", price: 260, color: "yellow" },
  { name: "Nước Sạch", price: 150, color: "white" },
  { name: "Bắc Ninh", price: 280, color: "yellow" },
  { name: "Sài Gòn", price: 60, color: "purple" },
];

// Cột phải (Right Column)
export const rightColData: LandCellData[] = [
  { name: "Phú Quốc", price: 300, color: "green" },
  { name: "Bạc Liêu", price: 300, color: "green" },
  { name: "Cơ Hội", price: 0, color: "blue" },
  { name: "Sơn La", price: 320, color: "green" },
  { name: "Nhà Ga Miền Bắc", price: 200, color: "black" },
  { name: "Điện Biên", price: 400, color: "blue" },
];

// Hàng dưới cùng (Bottom Row)
export const bottomRowData: LandCellData[] = [
  { name: "Sài Gòn", price: 60, color: "purple" },
  { name: "Sài Gòn", price: 60, color: "purple" },
  { name: "Cơ Hội", price: 0, color: "blue" },
  { name: "Nha Trang", price: 60, color: "purple" },
  { name: "Thuế Thu Nhập", price: -200, color: "red" },
  { name: "Nhà Ga Trung Tâm", price: 200, color: "black" },
  { name: "Vũng Tàu", price: 100, color: "lightblue" },
  { name: "Cơ Hội", price: 0, color: "blue" },
  { name: "Huế", price: 100, color: "lightblue" },
  { name: "Hải Phòng", price: 120, color: "lightblue" },
];

// Cột trái (Left Column)
export const leftColData: LandCellData[] = [
  { name: "Buôn Mê Thuột", price: 140, color: "pink" },
  { name: "Điện Lực", price: 150, color: "white" },
  { name: "Cần Thơ", price: 140, color: "pink" },
  { name: "Đà Lạt", price: 160, color: "pink" },
  { name: "Nhà Ga Miền Đông", price: 200, color: "black" },
  { name: "Bãi Đậu Xe", price: 0, color: "green" },
];


export const cornerCells: LandCellData[] = [
  { name: "Nhà Tù", price: 0, color: "white", type: "jail" },
  { name: "Vào Tù", price: 0, color: "white", type: "goToJail" },
  { name: "Bãi Đậu Xe", price: 0, color: "white", type: "parking" },
  { name: "Bắt Đầu", price: 0, color: "white", type: "start" },
];