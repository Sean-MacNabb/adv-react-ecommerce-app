import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import useCartPersist from './hooks/useCartPersist';

const App = () => {
  // Keeps the cart in sync with sessionStorage
  useCartPersist();

  return (
    <div>
      <ShoppingCart />
      <Home />
    </div>
  );
};

export default App;