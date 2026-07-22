import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import type { RootState } from '../redux/store';
import { getUserOrders } from '../api/orders';
import { useEffect } from 'react';

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  // Redirect to login if there's no logged-in user
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetches this user's past orders; only runs once we have a uid
  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders', user?.uid],
    queryFn: () => getUserOrders(user!.uid),
    enabled: !!user,
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Order History</h2>

      {isLoading && <p>Loading orders...</p>}
      {error && <p>Error loading orders.</p>}
      {orders?.length === 0 && <p>You haven't placed any orders yet.</p>}

      <ul>
        {orders?.map((order) => (
          <li key={order.id}>
            <Link to={`/orders/${order.id}`}>
              <span>Order #{order.id}</span>
              <span> — {order.createdAt.toLocaleDateString()}</span>
              <span> — ${order.totalPrice.toFixed(2)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistoryPage;