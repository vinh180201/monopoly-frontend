import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface GameState {
  hasRolledDice: boolean; // Trạng thái đã quay xúc xắc
  hasBought: boolean; // Trạng thái đã mua đất
  isMoving: boolean; // Trạng thái đang di chuyển
}

const initialState: GameState = {
  hasRolledDice: false,
  hasBought: false,
  isMoving: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    rollDice(state) {
      state.hasRolledDice = true;
    },
    setMoving(state, action: PayloadAction<{ isMoving: boolean }>) {
      state.isMoving = action.payload.isMoving;
    },
    resetTurn(state) {
      state.hasRolledDice = false;
      state.hasBought = false;
    },
    setBought(state) {
      state.hasBought = true;
    },
  },
});

export const selectGameState = (state: RootState) => state.game;

export const {
  rollDice,
  resetTurn,
  setBought,
  setMoving,
} = gameSlice.actions;

export default gameSlice.reducer;