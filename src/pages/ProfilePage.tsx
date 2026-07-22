import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser } from 'firebase/auth';
import { auth } from '../firebase';
import { updateUserProfile, deleteUserProfile } from '../api/users';
import { setUser, clearUser } from '../redux/authSlice';
import type { RootState, AppDispatch } from '../redux/store';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  // Form field state, pre-filled from the current Redux user once it's loaded
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Pre-fill the form once the user profile is available
  useEffect(() => {
    if (user) {
      setName(user.name);
      setAddress(user.address);
    }
  }, [user]);

  // Redirect to login if there's no logged-in user (e.g. direct URL visit while logged out)
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError('');
    setMessage('');
    setIsSaving(true);

    try {
      await updateUserProfile(user.uid, { name, address });

      // Keep Redux in sync with what we just saved, so the UI reflects it immediately
      dispatch(setUser({ ...user, name, address }));
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(`Update failed: ${err}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This cannot be undone.'
    );
    if (!confirmed) return;

    setError('');
    setIsDeleting(true);

    try {
      // Remove the Firestore profile doc first
      await deleteUserProfile(user.uid);

      // Then remove the Firebase Auth account itself
      if (auth.currentUser) {
        await deleteUser(auth.currentUser);
      }

      dispatch(clearUser());
      navigate('/');
    } catch (err) {
      setError(
        `Delete failed: ${err}. Note: Firebase may require you to have logged in recently to delete your account — try logging out and back in, then delete again.`
      );
      setIsDeleting(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>My Profile</h2>

      <form onSubmit={handleUpdate}>
        <div>
          <label>Email</label>
          <p>{user.email}</p>
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        {message && <p>{message}</p>}
        {error && <p>{error}</p>}

        <button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      <hr />

      <button onClick={handleDeleteAccount} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete My Account'}
      </button>
    </div>
  );
};

export default ProfilePage;