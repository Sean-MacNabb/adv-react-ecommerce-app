import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProductManagementPage from './pages/ProductManagementPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import useCartPersist from './hooks/useCartPersist';
import useAuth from './hooks/useAuth';

const App = () => {
  // Keeps the cart in sync with sessionStorage
  useCartPersist();

  // Keeps Redux auth state in sync with Firebase
  useAuth();

  return (
    <div>
      <NavBar />
      <ShoppingCart />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/products/manage" element={<ProductManagementPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;