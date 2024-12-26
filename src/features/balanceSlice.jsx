
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cash: {
      id: 2,
      amount: 0,
      type: 'Nakit Bakiyesi'
    },
    flight: {
      id: 3,
      amount: 0,
      type: 'Uçak Bakiyesi'
    },
    fuel: {
      id: 1,
      amount: 0,
      type: 'Yakıt Bakiyesi'
    },
    meal: {
      id: 5,
      amount: 0,
      type: 'Yemek Bakiyesi'
    },
    toll: {
      id: 4,
      amount: 0,
      type: 'Yol Geçiş Bakiyesi'
    }
};

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
