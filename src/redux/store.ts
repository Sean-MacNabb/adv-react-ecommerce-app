import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Configures the Redux store and registers the cart slice
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Types for type-safe state access and dispatching throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;