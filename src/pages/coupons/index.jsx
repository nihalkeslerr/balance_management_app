import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUser } from "../../features/auth/authSlice";
import { createUserCoupon, getUserCoupons } from "../../services/firestoreService";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/firebase";
import { setCoupons, addCoupon } from "../../features/couponSlice";

function Coupons() {
    const dispatch = useDispatch();
    const [user, loading, error] = useAuthState(auth);
    const coupons = useSelector((state) => state.coupon);

    const couponInfo = {
        amount: 0,
        couponCode: 123,
        id: 2,
        validityDate: "12/12/200"
    };


    useEffect(() => {
        dispatch(initializeUser());
    }, [dispatch]);

    const handleCreateCoupon = async () => {
        if (user) {
            const newCoupon = await createUserCoupon(user.uid, couponInfo);
            if (newCoupon) {
                dispatch(addCoupon(newCoupon)); // Redux store'a ekle
            }
        }
    };

    useEffect(() => {
        if (user) {
            const fetchCoupons = async () => {

                const coupons = await getUserCoupons(user.uid);
                if (coupons) {
                    console.log("couponsssss", coupons);
                    dispatch(setCoupons(coupons));
                }
                console.log(user.uid);
            };

            fetchCoupons();
        }

    }, [user, dispatch]);


    return (
        <div>
            <button onClick={handleCreateCoupon}>Kupon oluştur</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Kupon Kodu</th>
                        <th>Tutar</th>
                        <th>Geçerlilik Tarihi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        coupons && (
                            Object.values(coupons).map((coupon, index) => (
                                <tr key={index}>
                                    <td>{coupon.id}</td>
                                    <td>{coupon.couponCode}</td>
                                    <td>{
                                        loading ? "..." : coupon.amount}</td>
                                    <td>{coupon.validityDate}</td>
                                </tr>

                            ))
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Coupons