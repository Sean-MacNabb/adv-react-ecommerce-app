import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { removeFromCart, clearCart } from '../redux/cartSlice';
import { useState } from 'react';

const ShoppingCart = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  // Tracks whether to show the "checkout successful" message
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Total number of items in the cart (sum of quantities)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Total price of all items in the cart
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Clears the cart and shows a success message
  const handleCheckout = () => {
    dispatch(clearCart());
    setCheckoutSuccess(true);
    setTimeout(() => setCheckoutSuccess(false), 3000);
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

      <button onClick={handleCheckout} disabled={items.length === 0}>
        Checkout
      </button>

      {checkoutSuccess && <p>Checkout successful! Your cart has been cleared.</p>}
    </div>
  );
};

export default ShoppingCart;