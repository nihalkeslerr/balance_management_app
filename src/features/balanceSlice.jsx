
import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    setBalance: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetBalance() {
      return initialState; 
    },
  },
});

export const { setBalance, resetBalance } = balanceSlice.actions;
export default balanceSlice.reducer;
