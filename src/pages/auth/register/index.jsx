import React, { useState, useEffect } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'
import { useSelector, useDispatch } from 'react-redux'; 
import { initializeUser } from "../../../features/auth/authSlice";

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const userLoggedIn = useSelector(state => state.auth.userLoggedIn);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        dispatch(initializeUser());
    }, [dispatch]);

    useEffect(() => {
        if (userLoggedIn) {
            navigate('/');
        }
    }, [userLoggedIn, navigate]); 

    const onSubmit = async (e) => { //Register
        e.preventDefault(); 
        
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);

            try {
                await doCreateUserWithEmailAndPassword(email, password);
                dispatch(initializeUser());
            } catch (error) {
                console.error("Registration error:", error);
                setErrorMessage("An error occurred during registration. Please try again.");
            } finally {
                setIsRegistering(false);
            }
        }
    }
    
    return (
        <>
            {userLoggedIn && (<Navigate to={'/'} replace={true} />)}

            <main className="bg-gradient-to-r from-teal-200 to-blue-800 w-full h-screen self-center place-content-center place-items-center">
                <div>
                    <div className="flex flex-shrink-0 text-white w-96 align-items-center justify-content-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 640 512">
                            <path fill="#ffffff" d="M384 32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L398.4 96c-5.2 25.8-22.9 47.1-46.4 57.3L352 448l160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0-192 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0 0-294.7c-23.5-10.3-41.2-31.6-46.4-57.3L128 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l128 0c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288l144.9 0L512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C627.2 382 574.9 416 512 416zM126.8 195.8L54.4 320l144.9 0L126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C242 382 189.7 416 126.8 416S11.7 382 .9 337.1z" />
                        </svg>
                        <span className="font-semibold text-4xl tracking-tight mx-2">Mio-Bilancia</span>
                    </div>
                    <span className="flex flex-shrink-0 text-white mt-2 mb-4 italic text-xs w-96 align-items-center justify-content-center">Bir Bakiye Yönetim Uygulaması</span>
                </div>
                <div className="bg-white w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center mb-6">
                        <div className="mt-2">
                            <h3 className="text-blue-800 text-xl font-semibold sm:text-2xl">KAYIT OL</h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-600">E-posta</label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 outline-none border focus:border-indigo-600 rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Şifre</label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 outline-none border focus:border-indigo-600 rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">Şifre Doğrula</label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 outline-none border focus:border-indigo-600 rounded-lg transition duration-300"
                            />
                        </div>

                        {errorMessage && <span className='text-red-600 font-bold'>{errorMessage}</span>}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-teal-200 to-blue-800 hover:shadow-xl transition duration-300'}`}
                        >
                            {isRegistering ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
                        </button>
                        <div className="text-sm text-center">
                            Zaten bir hesabın var mı? {' '}
                            <Link to={'/login'} className="text-center text-sm hover:underline">Kayıt Ol</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Register;
