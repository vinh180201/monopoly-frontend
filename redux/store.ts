import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./features/playerSlice";
import landReducer from "./features/landSlice";
import gameReducer from "./features/gameSlice"; 

export const store = configureStore({
  reducer: {
    players: playerReducer,
    land: landReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;