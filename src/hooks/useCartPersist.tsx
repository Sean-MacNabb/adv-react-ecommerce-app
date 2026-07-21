import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { setCart } from '../redux/cartSlice';
import type { CartItem } from '../types';

const useCartPersist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  // Tracks whether this is the very first render, so the save effect can skip it
  const isInitialRender = useRef(true);

  // Runs once on mount to restore any saved cart
  useEffect(() => {
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
      const parsedCart: CartItem[] = JSON.parse(savedCart);
      dispatch(setCart(parsedCart));
    }
  }, [dispatch]);

  // Runs every time the cart changes, but skips the first render entirely
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    sessionStorage.setItem('cart', JSON.stringify(items));
  }, [items]);
};

export default useCartPersist;