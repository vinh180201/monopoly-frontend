export interface LandCellData {
  index: number;
  name: string;
  price: number;
  color: string;
  type: "start" | "jail" | "goToJail" | "parking" | "normal" | "chance" | "luck" | "utility" | "station" | "tax";
  owner?: number;
  housePrice?: number;
  houses?: number;
  fees?: {
    level0: number;
    level1: number;
    level2: number;
    level3: number;
    level4: number;
    hotel: number;
  };
  sellPrices?: {
    land: number;
    house: number;
  };
}

export interface PositionedCell {
  cell: LandCellData; // Dữ liệu của ô đất
  row: number; // Vị trí hàng trong lưới
  col: number; // Vị trí cột trong lưới
}