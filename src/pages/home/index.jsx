import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUser } from "../../features/auth/authSlice";
import { setBalance} from "../../features/balanceSlice";
import { getBalancesFromFirestore } from "../../services/firestoreService";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/firebase";
import BalanceCard from "../../components/balanceCard/BalanceCard";
import { Link } from "react-router-dom";

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

        const balances = await getBalancesFromFirestore(user.uid);
        if (balances) {
          console.log("balancessssss",balances);
          dispatch(setBalance(balances));
        }
        console.log(user.uid);
      };
      
      fetchBalances();
    }

  }, [user, dispatch]);

  useEffect(() => {
    console.log("balancesddd",balances);
  }, [balances])

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <>
      <div className="container">
      {currentUser !== null && (
        <div className="text-md text-gray-500 mt-4 my-3 flex align-items-center">
          Merhaba{" "}
          {currentUser.displayName ? currentUser.displayName : currentUser.email},buradan bakiyelerinin kontrolünü sağlayablirsin.
         <div className="mx-2 text-decoration-none text-blue-800 bg-gray-100 py-2 px-4 rounded-md flex align-items-center hover:bg-gray-200">

          <Link to={"/balances"} className="mr-2 text-decoration-none text-blue-800 rounded-md "> Bakiye Ayrıntılarına Git</Link>
           <svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#1e40b0" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>

           </div>
        </div>
      )}
        <div className="flex flex-wrap ">
          {
            balances && (
              Object.values(balances).map((subBalance, index) => (
                <BalanceCard
                key={index}
                title={subBalance.type}     // Bakiyenin başlığı
                balance={subBalance.amount} // Bakiyenin miktarı
                />
            )))}
        </div>
      </div>
    </>
  );
}; 

export default Home;
