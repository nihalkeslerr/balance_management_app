import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const initialState = {
  currentUser: null,
  userLoggedIn: false,
  isEmailUser: false,
  isGoogleUser: false,
  loading: true,
};

export const initializeUser = createAsyncThunk(
  "auth/initializeUser",
  async (_, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const isEmail = user.providerData.some(
            (provider) => provider.providerId === "password"
          );

          resolve({
            currentUser: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
              },
            userLoggedIn: true,
            isEmailUser: isEmail,
            isGoogleUser: !isEmail, 
          });
        } else {
          resolve({
            currentUser: null,
            userLoggedIn: false,
            isEmailUser: false,
            isGoogleUser: false,
          });
        }
      });
      return () => unsubscribe();
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.currentUser;
        state.userLoggedIn = action.payload.userLoggedIn;
        state.isEmailUser = action.payload.isEmailUser;
        state.isGoogleUser = action.payload.isGoogleUser;
      })
      .addCase(initializeUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
