import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUser } from "../../features/auth/authSlice";
import { getUserCoupons } from "../../services/firestoreService";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/firebase";
import { setCoupons } from "../../features/couponSlice";

function Coupons() { //Kuponların gösterildiği tablo
    const dispatch = useDispatch();
    const [user, loading, error] = useAuthState(auth);
    const coupons = useSelector((state) => state.coupon);

    useEffect(() => {
        dispatch(initializeUser());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            const fetchCoupons = async () => {

                const coupons = await getUserCoupons(user.uid);
                if (coupons) {
                    dispatch(setCoupons(coupons));
                }
            };

            fetchCoupons();
        }

    }, [user, dispatch]);

    const sortedCoupons = coupons
    ? Object.values(coupons).sort((a, b) => a.id - b.id)
    : [];
    return (
        <div className="container">
            <div className="my-3 py-2 px-8 rounded-md text-md max-w-max bg-gradient-to-r from-teal-300 via-blue-500 to-blue-800 ">
                <p className="m-0 p-0 text-white text-lg">KUPONLARIM</p>
            </div>
            <table className="table table-auto border-collapse border text-center border-slate-500 rounded-sm bg-none">
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
                            Object.values(sortedCoupons).map((coupon, index) => (
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