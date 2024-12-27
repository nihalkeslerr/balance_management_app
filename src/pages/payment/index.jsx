import React, { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateBalanceById, getBalancesFromFirestore } from "../../services/firestoreService";
import { initializeUser } from "../../features/auth/authSlice";
import { auth } from "../../firebase/firebase";
import CreditCardForm from "../../components/forms/creditCardForm";
import LoanApplicationForm from "../../components/forms/LoanApplicationForm";
import WarningModal from "../../components/modals/WarningModal";
import BalanceCard from "../../components/balanceCard/BalanceCard";
import { setBalance } from "../../features/balanceSlice";

function Payment() { //Ödeme Sayfası
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { balanceID } = useParams(); // URL'den bakiyenin id bilgisini alıyoruz.
    const balances = useSelector((state) => state.balance);
    const [user, loading, error] = useAuthState(auth);
    const [isCardPayment, setIsCardPayment] = useState("");
    const [selectedBalance, setSelectedBalance] = useState(null);
    const [showModal, setShowModal] = useState("");
    const [modalMessage, setModalMessage] = useState({
        message: "",
        color: "",
    });
    const [creditInfo, setCreditInfo] = useState({
        cardNumber: "",
        lastDate: "",
        cvv: "",
        amount: "",
    });

    const [loanInfo, setLoanInfo] = useState({
        name: "",
        lastName: "",
        idNumber: "",
        amount: "",
    });
    useEffect(() => {
        dispatch(initializeUser());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            const fetchBalances = async () => {

                const balances = await getBalancesFromFirestore(user.uid);
                if (balances) {
                    console.log("balancessssss", balances);
                    dispatch(setBalance(balances));
                }
                console.log(user.uid);
            };

            fetchBalances();
        }

    }, [user, dispatch]);


    const handleCreditCardSubmit = async (e) => { //Kredi Kartı ile bakiye arttırma Fonksiyonu
        e.preventDefault();

        if (creditInfo.cvv === "999") {
            setModalMessage({
                message: "Ödeme Başarısız!",
                color: "text-red-800	",
            });
        } else if (creditInfo.cvv === "000") {
            let newAmount = parseInt(selectedBalance.amount) + parseInt(creditInfo.amount);
            console.log(newAmount);
            if (user && selectedBalance) {
                const updateSuccess = await updateBalanceById(user.uid, selectedBalance.id, newAmount);
                if (updateSuccess) {
                    setModalMessage({
                        message: "Ödeme Başarılı!",
                        color: "text-lime-500",
                    });

                    setTimeout(() => {
                        navigate("/balances");
                    }, 1000);
                } else {
                    setModalMessage({
                        message: "Ödeme Başarısız! Bakiyeyi güncellerken hata oluştu.",
                        color: "text-red-800",
                    });
                }
            }
        } else {
            setModalMessage({
                message: "Geçersiz CVV!",
                color: "text-gray-300",
            });
        }
        setShowModal(true);

        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };

    const handleLoanSubmit = async (e) => { // Kredi Başvurusu yaparak bakiye arttırma fonksiyonu
        e.preventDefault();

        if (loanInfo.amount > 10000) {
            setModalMessage({
                message: "Ödeme Başarısız!",
                color: "text-red-800	",
            });
        } else if (loanInfo.amount <= 10000) {
            let newAmount = parseInt(selectedBalance.amount) + parseInt(loanInfo.amount);
            console.log(newAmount);

            if (user && selectedBalance) {
                const updateSuccess = await updateBalanceById(user.uid, selectedBalance.id, newAmount);
                if (updateSuccess) {
                    setModalMessage({
                        message: "Ödeme Başarılı!",
                        color: "text-lime-500",
                    });

                    setTimeout(() => {
                        navigate("/balances");
                    }, 1000);
                } else {
                    setModalMessage({
                        message: "Ödeme Başarısız! Bakiyeyi güncellerken hata oluştu.",
                        color: "text-red-800",
                    });
                }
            }


        } else {
            setModalMessage({
                message: "Geçersiz tutar!",
                color: "text-gray-300",
            });
        }
        setShowModal(true);

        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };

    const onChangeCreditInput = (name, value) => {
        setCreditInfo({ ...creditInfo, [name]: value });
    };

    const onChangeLoanInput = (name, value) => {
        setLoanInfo({ ...loanInfo, [name]: value });
    };

    const closeModal = () => setShowModal(false);



    useEffect(() => {
        // Bakiye ID'si ile seçilen bakiyeyi buluyoruz
        if (balances) {
            const foundBalance = Object.values(balances).find(
                (balance) => balance.id.toString() === balanceID // Parametredeki ID ile eşleşen bakiyeyi buluyoruz
            );
            setSelectedBalance(foundBalance); // Bulunan bakiyeyi state'e atıyoruz
        }
    }, [balanceID, balances]);

    useEffect(() => {
        console.log("selectedBalance:", selectedBalance);
    }, [selectedBalance]);

    return (
        <div className="container w-full self-center place-content-center place-items-center">
            {selectedBalance && (<BalanceCard title={selectedBalance.type} balance={selectedBalance.amount} />)}

            <div className="flex justify-content-center w-full">
                <div className="flex flex-wrap mb-4 md:w-1/2 w-full mt-4">
                    <div className="p-2 w-full lg:w-1/2" >
                        {/* Kredi Kartı Ödeme Butonu */}
                        <div className={`border p-3 rounded-md w-full text-center ${isCardPayment === "creditCard"
                            ? "bg-teal-500 text-white"
                            : "text-gray-500 hover:underline hover:text-teal-800 hover:shadow-md"
                            }`}>
                            <button
                                className="text-sm mx-2 font-semibold p-2 no-underline "
                                onClick={() => setIsCardPayment("creditCard")} // Switch to Card Payment form
                            >
                                Kredi Kartı İle Ödeme Yap
                            </button>
                        </div>
                    </div>

                    <div className="p-2  w-full lg:w-1/2">
                        {/* Kredi Başvuru Butonu */}
                        <div className={`border p-3 rounded-md w-full text-center 
                        ${isCardPayment === "loanApp"
                                ? "bg-teal-500 text-white"
                                : "text-gray-500 hover:underline hover:text-teal-800 hover:shadow-md"
                            }
                                    }`}>
                            <button
                                className="text-sm mx-2 font-semibold p-2 no-underline"
                                onClick={() => setIsCardPayment("loanApp")} // Switch Form
                            >
                                Kredi Başvurusunda Bulun
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 w-full">
                {isCardPayment === "creditCard" && ( //Kredi Kartı ile ödeme formu
                    <CreditCardForm
                        handleCreditCardSubmit={handleCreditCardSubmit}
                        onChangeCreditInput={onChangeCreditInput}
                    />
                )}
                {
                    isCardPayment === "loanApp" && (
                        // Kredi Başvuru Formu
                        <LoanApplicationForm
                            onChangeLoanInput={onChangeLoanInput}
                            handleLoanSubmit={handleLoanSubmit}
                        />
                    )}
            </div>
            {showModal && (
                <WarningModal closeModal={closeModal} modalMessage={modalMessage} />
            )}
        </div>
    );
}

export default Payment;
