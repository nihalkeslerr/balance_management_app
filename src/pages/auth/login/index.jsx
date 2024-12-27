import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useSelector, useDispatch } from 'react-redux'; 
import { initializeUser } from "../../../features/auth/authSlice";
import WarningModal from "../../../components/modals/WarningModal";

const Login = () => {
  const userLoggedIn = useSelector(state => state.auth.userLoggedIn);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({
      message: "",
      color: "",
  });

  useEffect(() => {
    dispatch(initializeUser());
  }, [dispatch]);

  const onSubmit = async (e) => { //Login
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        dispatch(initializeUser()); // Refresh user data after email/password sign-in
        setModalMessage({
            message: "Giriş Başarılı",
            color: "text-lime-500",
        });

      } catch (error) {
        setModalMessage({
            message: error.message,
            color: "text-lime-500",
        });
     
      }
      setIsSigningIn(false);
      setShowModal(true);
      setTimeout(() => {
          setShowModal(false);
      }, 1500);

    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
        dispatch(initializeUser()); 
        setModalMessage({
            message: "Giriş Başarılı",
            color: "text-lime-500",
        });
      } catch (error) {
        setModalMessage({
          message: error.message,
          color: "text-lime-500",
      });
      }
      setIsSigningIn(false);
      setShowModal(true);
      setTimeout(() => {
          setShowModal(false);
      }, 1500);
    }
  };

  return (
    <div>
      {userLoggedIn && (<Navigate to={'/'} replace={true} />)}

      <main className=" bg-gradient-to-r from-teal-200 to-blue-800 w-full h-screen self-center place-content-center place-items-center">
        <div>
          <div className="flex flex-shrink-0 text-white w-96 align-items-center justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" viewBox="0 0 640 512">
              <path fill="#ffffff" d="M384 32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L398.4 96c-5.2 25.8-22.9 47.1-46.4 57.3L352 448l160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0-192 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l160 0 0-294.7c-23.5-10.3-41.2-31.6-46.4-57.3L128 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l128 0c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zm55.6 288l144.9 0L512 195.8 439.6 320zM512 416c-62.9 0-115.2-34-126-78.9c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C627.2 382 574.9 416 512 416zM126.8 195.8L54.4 320l144.9 0L126.8 195.8zM.9 337.1c-2.6-11 1-22.3 6.7-32.1l95.2-163.2c5-8.6 14.2-13.8 24.1-13.8s19.1 5.3 24.1 13.8l95.2 163.2c5.7 9.8 9.3 21.1 6.7 32.1C242 382 189.7 416 126.8 416S11.7 382 .9 337.1z"/>
            </svg>
            <span className="font-semibold text-4xl tracking-tight mx-2">Mio-Bilancia</span>
          </div>
          <span className="flex flex-shrink-0 text-white mt-2 mb-4 italic text-xs w-96 align-items-center justify-content-center">Bir Bakiye Yönetim Uygulaması</span>
        </div>
        <div className="bg-white w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
          <div className="text-center">
            <div className="mt-2">
              <h3 className="text-blue-800 text-xl font-semibold sm:text-2xl">GİRİŞ YAP</h3>
            </div>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">E-posta</label>
              <input
                type="email"
                autoComplete='email'
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value) }}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 rounded-lg transition duration-300"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Şifre</label>
              <input
                type="password"
                autoComplete='current-password'
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 rounded-lg transition duration-300"
              />
            </div>
            <button
              type="submit"
              disabled={isSigningIn}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : ' bg-gradient-to-r from-teal-200 to-blue-800 hover:shadow-xl transition duration-300'}`}
            >
              {isSigningIn ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </form>
          <p className="text-center text-sm">Hesabın yok mu? <Link to={'/register'} className="hover:underline ">Kayıt Ol</Link></p>
          <div className='flex flex-row text-center w-full'>
            <div className='border-b-2 mb-2.5 mr-2 w-full'></div><div className='text-sm font-bold w-fit'>Veya</div><div className='border-b-2 mb-2.5 ml-2 w-full'></div>
          </div>
          <button
            disabled={isSigningIn}
            onClick={onGoogleSignIn}
            className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium ${isSigningIn ? 'cursor-not-allowed' : 'hover:bg-gray-100 transition duration-300 active:bg-gray-100'}`}
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_17_40)">
                <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {isSigningIn ? 'Giriş Yapılıyor...' : 'Google ile giriş yap'}
          </button>
        </div>
      </main>
      {showModal && (
          <WarningModal modalMessage={modalMessage} />
      )}
    </div>
  );
};

export default Login;
