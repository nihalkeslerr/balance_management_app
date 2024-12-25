import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUser } from "../../features/auth/authSlice";
import { setBalance, resetBalance} from "../../features/balanceSlice";
import { getBalancesFromFirestore } from "../../services/firestoreService";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/firebase";
import BalanceCard from "../../components/balanceCard/BalanceCard";

const Home = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [user, loading, error] = useAuthState(auth);
  const balances = useSelector((state) => state.balance);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const fetchBalances = async () => {
        dispatch(resetBalance());
        const balances = await getBalancesFromFirestore(user.uid);
        if (balances) {
          dispatch(setBalance(balances));
        }
        console.log(user.uid);
      };
      
      fetchBalances();
    }

  }, [user, dispatch]);

  useEffect(() => {
    console.log("balances",balances);
  }, [balances])

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const subCollections = balances.subCollections || {};

  return (
    <>
      {currentUser !== null && (
        <div className="text-sm text-gray-400">
          Hello{" "}
          {currentUser.displayName ? currentUser.displayName : currentUser.email} , you are now logged in.
        </div>
      )}
      <div>
        <div className="container flex flex-wrap align-items-center justify-content-between">
            {Object.values(subCollections).map((subBalance, index) => (
                <BalanceCard
                key={subBalance.id || index} // Alt koleksiyonun id'sini veya index'i kullan
                title={subBalance.type}     // Bakiyenin başlığı
                balance={subBalance.amount} // Bakiyenin miktarı
                />
            ))}
        </div>
      </div>
    </>
  );
}; 

export default Home;
