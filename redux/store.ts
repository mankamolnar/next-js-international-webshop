import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketSlice";
import darkModeReducer from "./darkModeSlice";

export const store = configureStore({
  reducer: {
    basketReducer,
    darkModeReducer
  },
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;