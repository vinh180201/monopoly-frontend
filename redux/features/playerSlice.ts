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
        const oldPosition = player.position;
        const newPosition = (oldPosition + steps) % (MAX_POSITION + 1);
    
        // Nếu vượt quá MAX_POSITION thì nghĩa là đi qua ô Start
        if (oldPosition + steps > MAX_POSITION) {
          player.money += 200; // 💰 Cộng tiền khi đi qua Start
          console.log(`💰 Player ${playerId} đi qua ô Start, cộng $200`);
        }
    
        player.position = newPosition;
    
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
      nextPlayer.turnLeft += 1;

      // Cập nhật chỉ số
      state.currentPlayerIndex = nextIndex;
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
    updatePlayerPosition: (state, action: PayloadAction<{ playerId: number; position: number }>) => {
      const player = state.players.find((p) => p.id === action.payload.playerId);
      if (player) {
        player.position = action.payload.position; // Cập nhật vị trí của người chơi
        console.log(`🚩 Player ${player.id} được chuyển đến vị trí ${action.payload.position}`);
      }
    },
    skipPlayerTurn: (state, action: PayloadAction<{ playerId: number; turns: number }>) => {
      const player = state.players.find((p) => p.id === action.payload.playerId);
      if (player) {
        player.turnLeft -= action.payload.turns; // Giảm số lượt của người chơi
        console.log(`⏸️ Player ${player.id} bị mất ${action.payload.turns} lượt, còn lại: ${player.turnLeft}`);
      }
    },
  },
});

export const selectPlayers = (state: RootState) => state.players.players;
export const selectCurrentPlayer = (state: RootState) =>
  state.players.players[state.players.currentPlayerIndex];

export const {
  rollDiceAndMove,
  nextPlayer,
  updatePlayerMoney,
  addPropertyToPlayer,
  updatePlayerPosition,
  skipPlayerTurn,
} = playerSlice.actions;

export default playerSlice.reducer;
