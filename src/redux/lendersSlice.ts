import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Lender } from "../types";

interface LendersState {
  list: Lender[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: LendersState = {
  list: null,
  isLoading: false,
  error: null,
};

const lendersSlice = createSlice({
  name: "preQualifiedLenders",
  initialState,
  reducers: {
    setLenders: (state, action: PayloadAction<Lender[]>) => {
      state.list = action.payload;
    },
    setLendersLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLendersError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setLenders, setLendersLoading, setLendersError } =
  lendersSlice.actions;

export default lendersSlice.reducer;
