import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { UserProfile } from '../types';

// Creates a new user document in the "users" collection.
// Called right after Firebase Auth registration succeeds.
export const createUserProfile = async (profile: UserProfile): Promise<void> => {
  const userDocRef = doc(db, 'users', profile.uid);
  await setDoc(userDocRef, profile);
};

// Fetches a single user's profile document by their uid
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userDocRef = doc(db, 'users', uid);
  const userDocSnap = await getDoc(userDocRef);
  return userDocSnap.exists() ? (userDocSnap.data() as UserProfile) : null;
};

// Updates specific fields on a user's profile (e.g. name, address)
export const updateUserProfile = async (
  uid: string,
  updates: Partial<Omit<UserProfile, 'uid'>>
): Promise<void> => {
  const userDocRef = doc(db, 'users', uid);
  await updateDoc(userDocRef, updates);
};

// Deletes a user's profile document from Firestore.
// Note: this does NOT delete their Firebase Auth account — that's a separate call.
export const deleteUserProfile = async (uid: string): Promise<void> => {
  const userDocRef = doc(db, 'users', uid);
  await deleteDoc(userDocRef);
};