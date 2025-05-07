import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface GameState {
  hasRolledDice: boolean; 
  rollDouble: boolean;
  hasBought: boolean; 
  isMoving: boolean;
}

const initialState: GameState = {
  hasRolledDice: false,
  rollDouble: false,
  hasBought: false,
  isMoving: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    rollDice(state, action: PayloadAction<{ hasRolledDice: boolean }>) {
      state.hasRolledDice = action.payload.hasRolledDice;
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
    setDoubleDice(state, action: PayloadAction<{ rollDouble: boolean }>) {
      state.rollDouble = action.payload.rollDouble;
    },
  },
});

export const selectGameState = (state: RootState) => state.game;

export const {
  rollDice,
  resetTurn,
  setBought,
  setMoving,
  setDoubleDice,
} = gameSlice.actions;

export default gameSlice.reducer;