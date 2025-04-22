export interface LandCellData {
  name: string;
  price: number;
  color: string;
  type?: "start" | "jail" | "goToJail" | "parking" | "normal"; // Loại cell
}