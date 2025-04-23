import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "@/types/player";
import { RootState } from "../store";
import { MAX_POSITION } from "@/constant/common";
import { initPlayers } from "@/constant/player";

const initialState: { players: Player[], currentPlayerIndex: number } = {
  players: initPlayers,
  currentPlayerIndex: 0,
};

interface MovePayload {
  playerId: number;
  steps: number;
}

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    rollDiceAndMove: (state, action: PayloadAction<MovePayload>) => {
      const { playerId, steps } = action.payload;
      const player = state.players.find((p) => p.id === playerId);
      if (player) {
        player.position = (player.position + steps) % (MAX_POSITION + 1);
        if (player.turnLeft > 0) {
          player.turnLeft -= 1;
        }
      }
    },
    nextPlayer: (state) => {
      // Xác định player kế tiếp
      const nextIndex = (state.currentPlayerIndex + 1) % state.players.length;
      const nextPlayer = state.players[nextIndex];

      // Gán lượt đi mới cho player mới
      nextPlayer.turnLeft = 1;

      // Cập nhật chỉ số
      state.currentPlayerIndex = nextIndex;
    },
    resetPositions: (state) => {
      state.players.forEach((player) => {
        player.position = 0;
        player.turnLeft = 1; // Thiết lập lại lượt đi nếu cần
      });
    },
    updatePlayerMoney: (state, action: PayloadAction<{ playerId: number; amount: number }>) => {
      const player = state.players.find((p) => p.id === action.payload.playerId);
      if (player) {
        player.money += action.payload.amount;
      }
    },
    addPropertyToPlayer: (state, action: PayloadAction<{ playerId: number; landIndex: number }>) => {
      const player = state.players.find((p) => p.id === action.payload.playerId);
      if (player) {
        player.properties.push(action.payload.landIndex);
      }
    },
  },
});

export const selectPlayers = (state: RootState) => state.players.players;
export const selectCurrentPlayer = (state: RootState) =>
  state.players.players[state.players.currentPlayerIndex];

export const { rollDiceAndMove, nextPlayer, resetPositions, updatePlayerMoney, addPropertyToPlayer } = playerSlice.actions;
export default playerSlice.reducer;
