
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    couponCollections: {}
};

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {
        setCoupons: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetCoupon() {
            return initialState;
        },
    }

})

export const {setCoupons, resetCoupon,addCoupon } = couponSlice.actions;
export default couponSlice.reducer;

