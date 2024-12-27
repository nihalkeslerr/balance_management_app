import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUser } from "../../features/auth/authSlice";
import { setBalance } from "../../features/balanceSlice";
import { getBalancesFromFirestore } from "../../services/firestoreService";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import CreateCouponModal from "../../components/modals/CreateCouponModal";

function Balances() { //Bakiyelerin gösterildiği tablo
  const dispatch = useDispatch();
  const balances = useSelector((state) => state.balance);
  const [user, loading, error] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);
  const [balanceInfo, setBalanceInfo] = useState({
    amount: "",
    id: "",
  });

  // Redux Store'dan kullanıcı bilgilerini yükle
  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

 
  useEffect(() => {
    if (user) {
      const fetchBalances = async () => {
        const balances = await getBalancesFromFirestore(user.uid);  // Verilerin Firestore'dan alınması
        if (balances) {
          dispatch(setBalance(balances));  // Redux'a balance'ları kaydet
        }
      };
      fetchBalances();
    }
  }, [user, dispatch]);

  // Modal açıldığında ilgili bakiyeyi göndermek
  const openModal = (amount, id) => {
    setShowModal(true);
    setBalanceInfo({
      amount: amount,
      id: id,
    });
  };

  // Modal kapama işlemi
  const closeModal = () => setShowModal(false);

  const sortedBalances = balances
  ? Object.values(balances).sort((a, b) => a.id - b.id)
  : [];

  return (
    <div className="container">
      <div className="my-3 py-2 px-8 rounded-md text-md max-w-max bg-gradient-to-r from-teal-300 via-blue-500 to-blue-800 ">
        <p className="m-0 p-0 text-white text-lg">BAKİYELERİM</p>
      </div>
      <table className="table table-auto border-collapse border text-center border-slate-500 rounded-sm bg-none">
        <thead>
          <tr className="bg-gray-800 text-gray-100">
            <th className="bg-gray-400">ID</th>
            <th className="bg-gray-800">Bakiye Tipi</th>
            <th className="bg-gray-300">Kalan Bakiye</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            balances && (
              Object.values(sortedBalances).map((balance, index) => (
                <tr key={index}>
                  <td className=" place-content-center place-items-center ">{balance.id}</td>
                  <td className=" place-content-center place-items-center ">{balance.type}</td>
                  <td className=" place-content-center place-items-center ">{loading ? "..." : balance.amount}</td>
                  <td className=" place-content-center place-items-center ">
                    <button className=" py-2 px-4 rounded-md text-md text-white max-w-max bg-gradient-to-r from-fuchsia-600 bg-blue-700	" onClick={() => openModal(balance.amount, balance.id)}>
                      Kupon Oluştur
                    </button>
                  </td>
                  <td className=" place-content-center place-items-center ">
                    <button className="py-2 px-4 rounded-md text-decoration-none text-md text-white max-w-max bg-teal-400	">
                      <Link className="text-white text-decoration-none" to={`/payment/${balance.id}`}  /*  Bakiye ID'sini URL parametresi olarak gönder  */>
                      Bakiye Arttır
                    </Link></button>
                    
                  </td>
                </tr>
              ))
            )
          }
        </tbody>
      </table>

      {/* Kupon oluşturma modalı */}
      {showModal && (
        <CreateCouponModal 
          closeModal={closeModal} 
          balanceInfo={balanceInfo} 
        />
      )}
    </div>
  );
}

export default Balances;
