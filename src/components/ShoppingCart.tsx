import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import { useState } from 'react';
import { createOrder } from '../api/orders';

const ShoppingCart = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  // Tracks whether to show the "checkout successful" message
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  // Total number of items in the cart (sum of quantities)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Total price of all items in the cart
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Writes the current cart as an order in Firestore, then clears the cart
  const handleCheckout = async () => {
    if (!user) {
      setCheckoutError('Please log in to check out.');
      return;
    }

    setCheckoutError('');
    setIsCheckingOut(true);

    try {
      await createOrder(user.uid, items, totalPrice);
      dispatch(clearCart());
      setCheckoutSuccess(true);
      setTimeout(() => setCheckoutSuccess(false), 3000);
    } catch (err) {
      setCheckoutError(`Checkout failed: ${err}`);
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <img src={item.image} alt={item.title} width={50} />
              <span>{item.title}</span>
              <span>Qty: {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>

      {checkoutError && <p>{checkoutError}</p>}

      <button onClick={handleCheckout} disabled={items.length === 0 || isCheckingOut}>
        {isCheckingOut ? 'Placing order...' : 'Checkout'}
      </button>

      {checkoutSuccess && <p>Checkout successful! Your order has been placed.</p>}
    </div>
  );
};

export default ShoppingCart;