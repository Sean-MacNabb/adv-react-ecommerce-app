import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Product } from '../types';

const productsCollectionRef = collection(db, 'products');

// Fetches all products from Firestore
export const getProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(productsCollectionRef);
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<Product, 'id'>),
  }));
};

// Fetches a single product by its Firestore document id
export const getProduct = async (id: string): Promise<Product | null> => {
  const productDocRef = doc(db, 'products', id);
  const docSnap = await getDoc(productDocRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...(docSnap.data() as Omit<Product, 'id'>) };
};

// Creates a new product document; Firestore auto-generates the id
export const createProduct = async (product: Omit<Product, 'id'>): Promise<string> => {
  const docRef = await addDoc(productsCollectionRef, product);
  return docRef.id;
};

// Updates an existing product by id
export const updateProduct = async (
  id: string,
  updates: Partial<Omit<Product, 'id'>>
): Promise<void> => {
  const productDocRef = doc(db, 'products', id);
  await updateDoc(productDocRef, updates);
};

// Deletes a product by id
export const deleteProduct = async (id: string): Promise<void> => {
  const productDocRef = doc(db, 'products', id);
  await deleteDoc(productDocRef);
};