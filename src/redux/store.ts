import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import lenderReducer from "./lendersSlice";
import ratesReducer from "./ratesSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    preQualifiedLenders: lenderReducer,
    rates: ratesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
