import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import balanceReducer from '../features/balanceSlice';
import couponReducer from '../features/couponSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    balance: balanceReducer,
    coupon: couponReducer,
  },
});