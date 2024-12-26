import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUser } from "../../features/auth/authSlice";
import { setBalance } from "../../features/balanceSlice";
import { getBalancesFromFirestore } from "../../services/firestoreService";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import CreateCouponModal from "../../components/modals/CreateCouponModal";

function Balances() {
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

  // Verilerin Firestore'dan alınması ve Redux'a aktarılması
  useEffect(() => {
    if (user) {
      const fetchBalances = async () => {
        const balances = await getBalancesFromFirestore(user.uid);
        if (balances) {
          dispatch(setBalance(balances));  // Redux'a balance'ları kaydet
        }
      };
      fetchBalances();
    }
  }, [user, dispatch]);

  // Modal açıldığında, ilgili bakiyeyi göndermek
  const openModal = (amount, id) => {
    setShowModal(true);
    setBalanceInfo({
      amount: amount,
      id: id,
    });
  };

  // Modal kapama işlemi
  const closeModal = () => setShowModal(false);

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Bakiye Tipi</th>
            <th>Kalan Bakiye</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            balances && (
              Object.values(balances).map((balance, index) => (
                <tr key={balance.id}>
                  <td>{balance.id}</td>
                  <td>{balance.type}</td>
                  <td>{loading ? "Yükleniyor..." : balance.amount}</td>
                  <td>
                    <button onClick={() => openModal(balance.amount, balance.id)}>
                      Kupon Oluştur
                    </button>
                  </td>
                  <td>
                    <Link
                      to={`/payment/${balance.id}`}  // Bakiye ID'sini URL parametresi olarak gönder
                      className="text-sm text-blue-600"
                    >
                      Bakiye Arttır
                    </Link>
                  </td>
                </tr>
              ))
            )
          }
        </tbody>
      </table>

      {/* Kupon oluşturma modal'ı */}
      {showModal && (
        <CreateCouponModal 
          closeModal={closeModal} 
          balanceInfo={balanceInfo} 
          updateBalances={() => {
            // Redux store'u yeniden güncelle
            const fetchBalances = async () => {
              if (user) {
                const balances = await getBalancesFromFirestore(user.uid);
                if (balances) {
                  dispatch(setBalance(balances));
                }
              }
            };
            fetchBalances();
          }} 
        />
      )}
    </div>
  );
}

export default Balances;
