import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doSignOut } from '../../firebase/auth';
import { auth } from "../../firebase/firebase";
import { initializeUser } from "../../features/auth/authSlice";
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // useDispatch hook to dispatch actions
    const userLoggedIn = useSelector(state => state.auth.userLoggedIn);
    const [user, loading, error] = useAuthState(auth);

    const handleLogout = async () => {
      try {
          await doSignOut(); // Sign out from Firebase
          dispatch(initializeUser()); // Reinitialize user state after logout
          setTimeout(() => {
              navigate('/login'); // Redirect to login page after logging out
          }, 100); // Small delay to ensure state is updated
      } catch (error) {
          console.error("Logout error:", error);
          alert("An error occurred while logging out. Please try again.");
      }
  };

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  useEffect(()=>{
    console.log("userLoggedIn:",userLoggedIn);
  },[userLoggedIn])


  if (error) return <div>Error: {error.message}</div>;

    return (
        <nav className=' bg-transparent p-6 shadow sticky top-0'>
            <div className='flex items-center justify-between flex-wrap container'>
                <div>
                    <div className="flex flex-shrink-0 text-blue-800 align-items-center justify-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 640 512">
                            <path fill="#1e40b0" d="M384 32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L398.4 96c-5.2 25.8-22.9 47.1-46.4 57.3L352 448l160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0-192 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0 0-294.7c-23.5-10.3-41.2-31.6-46.4-57.3L128 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l128 0c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288l144.9 0L512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C627.2 382 574.9 416 512 416zM126.8 195.8L54.4 320l144.9 0L126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C242 382 189.7 416 126.8 416S11.7 382 .9 337.1z" />
                        </svg>
                        <span className="font-semibold text-2xl tracking-tight mx-2">Mio-Bilancia</span>
                    </div>
                </div>
                <div className="w-full block justify-content-end flex-grow lg:flex lg:items-center lg:w-auto">
                    {
                        loading ? (
                            <></>
                        ) : (
                            userLoggedIn
                            ?
                            <>
                                <Link className='text-sm text-gray-500 no-underline hover:underline  hover:text-blue-800 mx-2 font-semibold' to={'/'}>Anasayfa</Link>
                                <Link className='text-sm text-gray-500 no-underline  hover:underline hover:text-blue-800 font-semibold mx-2' to={'/coupons'}>Kuponlar</Link> 
                                <Link className='text-sm text-gray-500 no-underline  hover:underline hover:text-blue-800 font-semibold mx-2' to={'/balances'}>Bakiyeler</Link> 
                                <button onClick={handleLogout} className='text-sm text-gray-500 no-underline hover:underline hover:text-blue-800 mx-2 font-semibold'><svg width="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/></svg></button>
                            </>
                            :
                            <>
                                <Link className='text-sm text-gray-500 no-underline hover:underline uppercase hover:text-blue-800 mx-2 font-semibold' to={'/login'}>LOGIN</Link>
                                <Link className='text-sm text-gray-500 no-underline hover:underline uppercase hover:text-blue-800 font-semibold' to={'/register'}>REGISTER</Link>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}

export default Header;
