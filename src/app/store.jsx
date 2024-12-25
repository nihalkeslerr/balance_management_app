import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import balanceReducer from '../features/balanceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
  },
});