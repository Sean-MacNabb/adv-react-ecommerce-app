import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { setUser, clearUser } from '../redux/authSlice';
import type { AppDispatch } from '../redux/store';
import type { UserProfile } from '../types';

// Subscribes to Firebase's auth state and keeps Redux in sync with it.
// Runs once at the top of the app (in App.tsx) so every page has access
// to the current user via Redux, without each page re-checking Firebase itself.
const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fires whenever the user logs in, logs out, or on initial page load
    // if a session already exists (e.g. from a previous visit)
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // A user is logged in — fetch their profile doc from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const profile = userDocSnap.data() as UserProfile;
          dispatch(setUser(profile));
        } else {
          // Edge case: Firebase Auth account exists but no Firestore doc was created.
          // Fall back to basic info so the app doesn't break.
          dispatch(
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email ?? '',
              name: '',
              address: '',
            })
          );
        }
      } else {
        // No one is logged in
        dispatch(clearUser());
      }
    });

    // Cleanup: stop listening when the app unmounts
    return () => unsubscribe();
  }, [dispatch]);
};

export default useAuth;