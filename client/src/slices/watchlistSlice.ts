import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface WatchlistState {
  coins: string[];
}

const initialState: WatchlistState = {
  coins: JSON.parse(localStorage.getItem("watchlist") || "[]"),
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<string>) => {
      if (!state.coins.includes(action.payload)) {
        state.coins.push(action.payload);
        localStorage.setItem("watchlist", JSON.stringify(state.coins));
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.coins = state.coins.filter((id) => id !== action.payload);
      localStorage.setItem("watchlist", JSON.stringify(state.coins));
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
