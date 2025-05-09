import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CurrencyState {
  currency: string;
  symbol: string;
}

const initialState: CurrencyState = {
  currency: "USD",
  symbol: "$",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
      state.symbol = action.payload === "USD" ? "$" : "€";
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
