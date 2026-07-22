import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

// Simple nav bar: shows different links depending on whether someone is logged in
const NavBar = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  // Signs the current user out of Firebase; useAuth's onAuthStateChanged
  // listener will automatically clear the Redux user state after this
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {user ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/products/manage">Manage Products</Link>
          <Link to="/orders">Order History</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;