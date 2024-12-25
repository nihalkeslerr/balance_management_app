import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeUser } from "../../features/auth/authSlice";
import { setBalance, resetBalance} from "../../features/balanceSlice";
import { getBalancesFromFirestore } from "../../services/firestoreService";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase/firebase";

function Balances() {
  const dispatch = useDispatch();
  const balances = useSelector((state) => state.balance);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const fetchBalances = async () => {
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

  const subCollections = balances.subCollections || {};

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Bakiye Tipi</th>
            <th>Kalan Bakiye</th>
            <th>Kupon Oluştur</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(subCollections).map((balance, index) => (
              <tr key={balance.id}>
              <td>{balance.id}</td>
              <td>{balance.type}</td>
              <td>{balance.amount}</td>
              <td>
                <button>Kupon Oluştur</button>
              </td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Balances;