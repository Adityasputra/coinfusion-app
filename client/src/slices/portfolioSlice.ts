import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CoinHolding {
  id: string;
  amount: number;
}

interface PortfolioState {
  holdings: CoinHolding[];
}

const initialState: PortfolioState = {
  holdings: JSON.parse(localStorage.getItem("portfolio") || "[]"),
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    addOrUpdateHolding: (state, action: PayloadAction<CoinHolding>) => {
      const existing = state.holdings.find((h) => h.id === action.payload.id);
      if (existing) {
        existing.amount = action.payload.amount;
      } else {
        state.holdings.push(action.payload);
      }
      localStorage.setItem("portfolio", JSON.stringify(state.holdings));
    },
    removeHolding: (state, action: PayloadAction<string>) => {
      state.holdings = state.holdings.filter((h) => h.id !== action.payload);
      localStorage.setItem("portfolio", JSON.stringify(state.holdings));
    },
  },
});

export const { addOrUpdateHolding, removeHolding } = portfolioSlice.actions;
export default portfolioSlice.reducer;
