import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface GameState {
  hasRolledDice: boolean; // Trạng thái đã quay xúc xắc
  hasBought: boolean; // Trạng thái đã mua đất
}

const initialState: GameState = {
  hasRolledDice: false,
  hasBought: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    rollDice(state) {
      state.hasRolledDice = true;
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
} = gameSlice.actions;

export default gameSlice.reducer;