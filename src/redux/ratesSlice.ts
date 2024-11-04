import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LenderWithCalculation } from "../types";

interface RatesState {
  topPrequalifiedRates: LenderWithCalculation[];
  otherRates: LenderWithCalculation[];
}

const initialState: RatesState = {
  topPrequalifiedRates: [],
  otherRates: [],
};

const ratesSlice = createSlice({
  name: "rates",
  initialState,
  reducers: {
    setTopPrequalifiedRates: (
      state,
      action: PayloadAction<LenderWithCalculation[]>
    ) => {
      state.topPrequalifiedRates = action.payload;
    },
    setOtherRates: (state, action: PayloadAction<LenderWithCalculation[]>) => {
      state.otherRates = action.payload;
    },
  },
});

export const { setTopPrequalifiedRates, setOtherRates } = ratesSlice.actions;

export default ratesSlice.reducer;
