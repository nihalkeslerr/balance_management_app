import { setCurrentUser } from './authSlice';
import { signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

// Email ve şifre ile giriş
export const loginWithEmailAndPassword = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch(setCurrentUser(userCredential.user));
  } catch (error) {
    console.error("Login failed", error);
  }
};

// Google ile giriş
export const loginWithGoogle = () => async (dispatch) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Kullanıcıyı Redux'a ekleyin
    dispatch(setCurrentUser(result.user));
  } catch (error) {
    console.error("Google login failed", error);
  }
};

// Kullanıcı çıkışı
export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(setCurrentUser(null));
  } catch (error) {
    console.error("Logout failed", error);
  }
};
