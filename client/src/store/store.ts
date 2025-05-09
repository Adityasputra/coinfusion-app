import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "../slices/currencySlice";
import watchlistReducer from "../slices/watchlistSlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    watchlist: watchlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
