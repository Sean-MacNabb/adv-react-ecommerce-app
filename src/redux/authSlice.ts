import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from '../types';

// Shape of the auth slice's state
interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
}

// No one is logged in until Firebase tells us otherwise
const initialState: AuthState = {
  user: null,
  isLoading: true,
};

// Slice containing the current logged-in user (or null) and the reducers that update it
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Sets the current user, e.g. after login/register or Firestore profile fetch
    setUser: (state, action: PayloadAction<UserProfile | null>) => {
      state.user = action.payload;
      state.isLoading = false;
    },

    // Clears the user, e.g. on logout
    clearUser: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;