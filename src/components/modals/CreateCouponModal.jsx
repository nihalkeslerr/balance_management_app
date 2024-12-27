import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCoupons } from "../../features/couponSlice";
import { initializeUser } from "../../features/auth/authSlice";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/firebase";
import { createUserCoupon, updateBalanceById } from "../../services/firestoreService";
import CreateCouponForm from "../forms/CreateCouponForm";
import WarningModal from "./WarningModal";

function CreateCouponModal({ closeModal, balanceInfo  }) {
    const dispatch = useDispatch();
    const [user, loading, error] = useAuthState(auth);
    const [showModal, setShowModal] = useState("");
    const [modalMessage, setModalMessage] = useState({
        message: "",
        color: "",
    });
    const generateRandomId = () => Math.floor(Math.random() * 10000) + 1; //Generate random ID

    const generateCouponCode = (length = 6) => { //Generate random Coupon Code 
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Kullanılacak karakterler
        let couponCode = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            couponCode += characters.charAt(randomIndex); // Rastgele karakter ekle
        }
        return couponCode;
    };

    const getValidityDate = () => { // Son Geçerlilik Tarihini belirle
        const today = new Date();
        today.setDate(today.getDate() + 30);  // Bugünden 30 gün sonrasını hesapla
        return today.toISOString().split('T')[0];  // YYYY-MM-DD formatında döndür
    };

    const [couponInfo, setCouponInfo] = useState({
        amount: "",
        couponCode: generateCouponCode(8),
        id: generateRandomId(),
        validityDate: getValidityDate() 
    });

    useEffect(() => {
        dispatch(initializeUser());
    }, [dispatch]);


    const handleCreateCoupon = async (e) => { //Kupon oluştur fonksionu
        e.preventDefault();

        if(couponInfo.amount === "0"){
            setModalMessage({
                message: "Kupon tutarı sıfır olamaz!",
                color: "text-red-800	",
            });
        }
        else if(balanceInfo.amount  >= couponInfo.amount){
            let newAmount = parseInt(balanceInfo.amount) - parseInt(couponInfo.amount);
            if (user) {
                const newCoupon = await createUserCoupon(user.uid, couponInfo);
                if (newCoupon) {
                    dispatch(setCoupons(newCoupon)); // Redux store'a ekle
                    updateBalanceById(user.uid, balanceInfo.id, newAmount);
                }
            }
            setModalMessage({
                message: "Kupon oluşturma Başarılı!",
                color: "text-lime-800	",
            });
        }
        else{
            setModalMessage({
                message: "Kupon tutarı bakiyeden daha büyük olamaz!",
                color: "text-red-800	",
            });
        }
        setShowModal(true); //Warning modalı aç

        setTimeout(() => {
            setShowModal(false);
        }, 1000);

        setTimeout(() => {
            closeModal();
          }, 2000);

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    const onChangeCouponInfo = (name, value) => {
        setCouponInfo({ ...couponInfo, [name]: value });
    };

    const closeModal2 = () => setShowModal(false);
    
    return (
        <div>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex mt-20 items-center justify-center">
                <div className="bg-white px-4 pt-2 pb-3 w-1/4 rounded-lg shadow-lg text-center">
                    <div className=" float-end w-100">
                        <button
                            onClick={closeModal}
                            className=" text-gray-600 px-2 py-1 rounded-md float-end hover:bg-gray-200"
                        >
                            X
                        </button>
                    </div>
                    <div className=" ">
                        <CreateCouponForm handleCreateCoupon={handleCreateCoupon} onChangeCouponInfo={onChangeCouponInfo} />
                    </div>
                </div>
            </div>
            {showModal && (
                <WarningModal closeModal={closeModal2} modalMessage={modalMessage} />
            )}
        </div>
    )
}

export default CreateCouponModal