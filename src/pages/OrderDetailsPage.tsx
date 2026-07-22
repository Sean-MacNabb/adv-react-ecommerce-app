import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getOrder } from '../api/orders';

const OrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const { data: order, isLoading, error } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrder(orderId!),
    enabled: !!orderId,
  });

  if (isLoading) return <div>Loading order...</div>;
  if (error) return <div>Error loading order.</div>;
  if (!order) return <div>Order not found.</div>;

  return (
    <div>
      <Link to="/orders">← Back to Order History</Link>

      <h2>Order #{order.id}</h2>
      <p>Placed on {order.createdAt.toLocaleString()}</p>

      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.title} width={50} />
            <span>{item.title}</span>
            <span>Qty: {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>

      <p>Total: ${order.totalPrice.toFixed(2)}</p>
    </div>
  );
};

export default OrderDetailsPage;