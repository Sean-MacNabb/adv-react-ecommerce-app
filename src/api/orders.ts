import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { CartItem, Order } from '../types';

const ordersCollectionRef = collection(db, 'orders');

// Converts a Firestore order document into our Order type,
// turning the Firestore Timestamp into a normal JS Date
const mapDocToOrder = (id: string, data: Record<string, unknown>): Order => ({
  id,
  userId: data.userId as string,
  items: data.items as CartItem[],
  totalPrice: data.totalPrice as number,
  createdAt: (data.createdAt as Timestamp).toDate(),
});

// Creates a new order document. Called on checkout with the current cart contents.
export const createOrder = async (
  userId: string,
  items: CartItem[],
  totalPrice: number
): Promise<string> => {
  const docRef = await addDoc(ordersCollectionRef, {
    userId,
    items,
    totalPrice,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

// Fetches all orders belonging to a specific user, most recent first
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const ordersQuery = query(
    ordersCollectionRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(ordersQuery);
  return snapshot.docs.map((docSnap) => mapDocToOrder(docSnap.id, docSnap.data()));
};

// Fetches a single order by its id (used for the order details page)
export const getOrder = async (orderId: string): Promise<Order | null> => {
  const orderDocRef = doc(db, 'orders', orderId);
  const docSnap = await getDoc(orderDocRef);
  if (!docSnap.exists()) return null;
  return mapDocToOrder(docSnap.id, docSnap.data());
};