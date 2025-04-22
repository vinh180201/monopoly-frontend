import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./features/playerSlice";
import landReducer from "./features/landSlice";

export const store = configureStore({
  reducer: {
    players: playerReducer,
    land: landReducer, // Thêm landReducer vào store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;