import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { doSignOut } from '../../firebase/auth';
import { auth } from "../../firebase/firebase";
import { initializeUser } from "../../features/auth/authSlice";
import { useAuthState } from 'react-firebase-hooks/auth';
import { resetBalance } from "../../features/balanceSlice";
import { resetCoupon } from "../../features/couponSlice";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // useDispatch hook to dispatch actions
    const userLoggedIn = useSelector(state => state.auth.userLoggedIn);
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        dispatch(initializeUser());
    }, [dispatch]);

    const handleLogout = async () => { //Kullanıcı çıkış
        try {
            await doSignOut();
            dispatch(initializeUser());
            dispatch(resetBalance());
            dispatch(resetCoupon());
            setTimeout(() => {
                navigate('/login');
            }, 100);
        } catch (error) {
            console.error("Logout error:", error);
            alert("An error occurred while logging out. Please try again.");
        }
    };
    
    useEffect(() => {
        console.log("userLoggedIn:", userLoggedIn);
    }, [userLoggedIn])


    if (error) return <div>Error: {error.message}</div>;

    return (
        <nav className=' bg-white p-6 shadow sticky top-0'>
            <div className='flex items-center lg:justify-between justify-center flex-wrap container'>
                <div>
                    <Link to={"/"} className='text-decoration-none'>
                        <div className="flex flex-shrink-0 text-blue-800 align-items-center justify-content-center">

                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 384 512"><path fill="#1e40b0" d="M384 312.7c-55.1 136.7-187.1 54-187.1 54-40.5 81.8-107.4 134.4-184.6 134.7-16.1 0-16.6-24.4 0-24.4 64.4-.3 120.5-42.7 157.2-110.1-41.1 15.9-118.6 27.9-161.6-82.2 109-44.9 159.1 11.2 178.3 45.5 9.9-24.4 17-50.9 21.6-79.7 0 0-139.7 21.9-149.5-98.1 119.1-47.9 152.6 76.7 152.6 76.7 1.6-16.7 3.3-52.6 3.3-53.4 0 0-106.3-73.7-38.1-165.2 124.6 43 61.4 162.4 61.4 162.4 .5 1.6 .5 23.8 0 33.4 0 0 45.2-89 136.4-57.5-4.2 134-141.9 106.4-141.9 106.4-4.4 27.4-11.2 53.4-20 77.5 0 0 83-91.8 172-20z" /></svg>
                            <span className="font-semibold text-2xl tracking-tight mx-2">Mio-Bilancia</span>

                        </div>
                    </Link>
                </div>
                <div className="w-full  flex lg:justify-end lg:float-end  lg:items-end lg:w-auto justify-content-center">
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
                                    <button onClick={handleLogout} className='text-sm text-gray-500 no-underline hover:underline hover:text-blue-800 mx-2 font-semibold'><svg width="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#000" d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" /></svg></button>
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
