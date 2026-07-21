import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../types';

// Shape of the cart slice's state
interface CartState {
  items: CartItem[];
}

// Cart starts out empty
const initialState: CartState = {
  items: [],
};

// Slice containing cart state and the reducers that update it
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Adds a product to the cart, or increments quantity if it's already there
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // Removes a product from the cart entirely, by id
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Sets a specific quantity for a given product
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },

    // Empties the cart completely (used on checkout)
    clearCart: (state) => {
      state.items = [];
    },

    // Replaces the entire cart (used to load cart back in from sessionStorage)
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;