import React, { useState, useEffect } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { updateBalanceById } from "../../services/firestoreService";
import { initializeUser } from "../../features/auth/authSlice";
import { auth } from "../../firebase/firebase";
import CreditCardForm from "../../components/forms/creditCardForm";
import LoanApplicationForm from "../../components/forms/LoanApplicationForm";
import WarningModal from "../../components/modals/WarningModal";
import BalanceCard from "../../components/balanceCard/BalanceCard";

function Payment() {
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

    const handleCreditCardSubmit = (e) => {
        //Kredi Kartı ile Ödeme Fonksiyonu
        e.preventDefault();

        if (creditInfo.cvv === "999") {
            setModalMessage({
                message: "Ödeme Başarısız!",
                color: "text-red-800	",
            });
        } else if (creditInfo.cvv === "000") {
            let newAmount = parseInt(selectedBalance.amount) + parseInt(creditInfo.amount);
            console.log(newAmount);
            if (user) {
                if (selectedBalance) {
                    updateBalanceById(user.uid, selectedBalance.id, newAmount);
                }
            }
            setModalMessage({
                message: "Ödeme Başarılı!",
                color: "text-lime-500",
            });

            setTimeout(() => {
                navigate("/balances");
            }, 1000);
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

    const handleLoanSubmit = (e) => {
        // Kredi Başvurusu Formu
        e.preventDefault();

        if (loanInfo.amount > 10000) {
            setModalMessage({
                message: "Ödeme Başarısız!",
                color: "text-red-800	",
            });
        } else if (loanInfo.amount <= 10000) {
            let newAmount =
                parseInt(selectedBalance.amount) + parseInt(loanInfo.amount);
            console.log(newAmount);
            setModalMessage({
                message: "Ödeme Başarılı!",
                color: "text-lime-800	",
            });
            if (user) {
                if (selectedBalance) {
                    updateBalanceById(user.uid, selectedBalance.id, newAmount);
                }
            }
            setTimeout(() => {
                navigate("/balances");
            }, 1000);
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
        dispatch(initializeUser());
    }, [dispatch]);

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

            <div className="flex mb-4">
                {/* Kredi Kartı Ödeme Butonu */}
                <div className="border p-3 rounded-sm m-3">
                    <button
                        className={`text-sm mx-2 font-semibold p-2 no-underline ${isCardPayment
                            ? "bg-blue-500 text-white"
                            : "text-gray-500 hover:underline hover:text-blue-800"
                            }`}
                        onClick={() => setIsCardPayment("creditCard")} // Switch to Card Payment form
                    >
                        Kredi Kartı İle Ödeme Yap
                    </button>
                </div>

                {/* Kredi Başvuru Butonu */}
                <div className="border p-3 rounded-sm m-3">
                    <button
                        className={`text-sm mx-2 font-semibold p-2 no-underline ${!isCardPayment
                            ? "bg-blue-500 text-white"
                            : "text-gray-500 hover:underline hover:text-blue-800"
                            }`}
                        onClick={() => setIsCardPayment("loanApp")} // Switch Form
                    >
                        Kredi Başvurusunda Bulun
                    </button>
                </div>
            </div>
            <div className="mt-4 w-50">
                {isCardPayment === "creditCard" && ( //Kredi Kartı ile ödeme formu
                    <div>
                        <h2>Kredi Kartı Formu</h2>
                        <CreditCardForm
                            handleCreditCardSubmit={handleCreditCardSubmit}
                            onChangeCreditInput={onChangeCreditInput}
                        />
                    </div>
                )}
                {
                    isCardPayment === "loanApp" && (
                        // Kredi Başvuru Formu
                        <div>
                            <h2>Kredi Başvuru Formu</h2>
                            <LoanApplicationForm
                                onChangeLoanInput={onChangeLoanInput}
                                handleLoanSubmit={handleLoanSubmit}
                            />
                        </div>
                    )}
            </div>
            {showModal && (
                <WarningModal closeModal={closeModal} modalMessage={modalMessage} />
            )}
        </div>
    );
}

export default Payment;
