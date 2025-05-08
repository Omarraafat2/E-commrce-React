import { useState } from 'react';
import { useChangePasswordMutation } from '../features/auth/authApi';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
    const { token } = useSelector(selectAuth);
    const navigate = useNavigate();
    const [changeMyPassword, { isLoading }] = useChangePasswordMutation();

    const [formData, setFormData] = useState({
        currentPassword: '',
        password: '',
        rePassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await changeMyPassword({ token, body: formData }).unwrap();
            toast.success('Password changed successfully!');
            setFormData({ currentPassword: '', password: '', rePassword: '' });

            navigate('/home'); 
        } catch (error: any) {
            toast.error(error?.data?.message || 'Failed to change password');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-32 bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-center">Change Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="password"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="New Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="password"
                    name="rePassword"
                    placeholder="Confirm New Password"
                    value={formData.rePassword}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {isLoading ? 'Updating...' : 'Update Password'}
                </button>
            </form>
        </div>
    );
}
