import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "@/types/player";
import { RootState } from "../store";
import { MAX_POSITION, MOVE_STEP_TIME } from "@/constant/common";
import { initPlayers } from "@/constant/player";
import { AppThunk } from "../store";
import { setMoving } from "./gameSlice";

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
    rollDiceAndMove: (state, action: PayloadAction<{ playerId: number; position: number }>) => {
      const player = state.players.find((p) => p.id === action.payload.playerId);
      if (player) {
        const prevPosition = player.position; // lưu vị trí cũ
        const newPosition = action.payload.position % (MAX_POSITION + 1);

        // ✅ kiểm tra trước khi gán
        if (newPosition < prevPosition) {
          player.money += 200;
          console.log(`💰 Player ${player.id} đi qua ô Start, cộng $200`);
        }

        player.position = newPosition; // sau cùng mới gán
        console.log(`🚩 Player ${player.id} được chuyển đến vị trí ${newPosition}`);
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
    sendPlayerToJail: (state, action: PayloadAction<{ playerId: number; turnsInJail?: number }>) => {
      const player = state.players.find((p) => p.id === action.payload.playerId);
      if (player) {
        player.position = 12;
        player.turnInJail = action.payload.turnsInJail ?? 3; // mặc định là 3 lượt nếu không truyền vào
        player.turnLeft = 0; // mất lượt luôn nếu cần
        console.log(`🚓 Player ${player.id} đã bị bắt vào tù trong ${player.turnInJail} lượt.`);
      }
    },
    releaseFromJail: (state, action: PayloadAction<{ playerId: number }>) => {
      const player = state.players.find(
        (p) => p.id === action.payload.playerId
      );
      if (player) {
        player.turnInJail = 0; // 🎉 Thả ra
      }
    },
    decreaseJailTurn: (state, action: PayloadAction<{ playerId: number }>) => {
      const player = state.players.find(
        (p) => p.id === action.payload.playerId
      );
      if (player && player.turnInJail > 0) {
        player.turnInJail -= 1;
      }
    }
  },
});

export const selectPlayers = (state: RootState) => state.players.players;
export const selectCurrentPlayer = (state: RootState) =>
  state.players.players[state.players.currentPlayerIndex];

export const movePlayerStepByStep =
  (playerId: number, steps: number): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const player = state.players.players.find((p) => p.id === playerId);

    if (!player) return;

    // Bắt đầu di chuyển: set isMoving = true
    dispatch(setMoving({ isMoving: true }));

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps) {
        const newPosition = (player.position + currentStep + 1) % (MAX_POSITION + 1);
        dispatch(rollDiceAndMove({ playerId, position: newPosition }));
        currentStep++;
      } else {
        clearInterval(interval);

        // Kết thúc di chuyển: set isMoving = false
        dispatch(setMoving({ isMoving: false }));

        // // Giảm turnLeft của người chơi
        // dispatch(skipPlayerTurn({ playerId, turns: 1 }));
      }
    }, MOVE_STEP_TIME); // 300ms mỗi bước
  };

export const {
  rollDiceAndMove,
  nextPlayer,
  updatePlayerMoney,
  addPropertyToPlayer,
  updatePlayerPosition,
  skipPlayerTurn,
  sendPlayerToJail,
  releaseFromJail,
  decreaseJailTurn
} = playerSlice.actions;

export default playerSlice.reducer;
