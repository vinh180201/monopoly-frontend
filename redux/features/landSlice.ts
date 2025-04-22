import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LandCellData } from "@/types/landCell";
import { cornerCells, topRowData, rightColData, bottomRowData, leftColData } from "@/constant/landcell";

interface LandState {
  lands: LandCellData[];
}

const initialState: LandState = {
  lands: [],
};

const landSlice = createSlice({
  name: "land",
  initialState,
  reducers: {
    initializeLands: (state, action: PayloadAction<LandCellData[]>) => {
      state.lands = action.payload;    },
    // Mua đất: cập nhật owner cho ô có index tương ứng
    setLandOwner: (state, action: PayloadAction<{ index: number; ownerId: number }>) => {
      const land = state.lands.find((l) => l.index === action.payload.index);
      if (land && land.owner === undefined) {
        land.owner = action.payload.ownerId;
      }
    },

    // Mua nhà: thêm 1 nhà vào ô có index tương ứng
    addHouseToLand: (state, action: PayloadAction<{ index: number }>) => {
      const land = state.lands.find((l) => l.index === action.payload.index);
      if (land && land.owner !== undefined) {
        land.houses = (land.houses || 0) + 1;
      }
    },

    // Dùng khi khởi tạo dữ liệu ô đất vào Redux
    setLands: (state, action: PayloadAction<LandCellData[]>) => {
      state.lands = action.payload;
    },
  },
});

export const {initializeLands, setLandOwner, addHouseToLand, setLands } = landSlice.actions;

// Selector: lấy ô đất theo index (position)
export const selectLandByIndex = (state: { land: LandState }, index: number) =>
  state.land.lands.find((l) => l.index === index);

export default landSlice.reducer;
