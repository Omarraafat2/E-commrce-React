import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user } = useSelector(selectAuth);

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-center">My Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          <p className="border p-2 rounded bg-gray-100">{user?.name || 'N/A'}</p>
        </div>
        <div>
          <label className="block font-semibold">Email:</label>
          <p className="border p-2 rounded bg-gray-100">{user?.email || 'N/A'}</p>
        </div>
        <div>
          <label className="block font-semibold">Role:</label>
          <p className="border p-2 rounded bg-gray-100 capitalize">{user?.role || 'User'}</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/change-password"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
        >
          Change Password
        </Link>
      </div>
    </div>
  );
}
