import { useState } from 'react';
import { useResetPasswordMutation } from '../features/auth/authApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLocation, Navigate } from 'react-router-dom';

const ResetPasswordSchema = Yup.object().shape({
  resetCode: Yup.string().required('Reset Code is required'),
  newPassword: Yup.string().min(6, 'Password too short').required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm your new password'),
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [resetSuccess, setResetSuccess] = useState(false);
  const location = useLocation();
  if (!location.state?.allowed) return <Navigate to="/login" replace />;
  
  const handleSubmit = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    const resetCode = localStorage.getItem('resetCode');
    if (!resetCode) {
      toast.error('Reset code missing. Please verify again.');
      return;
    }
  
    try {
      const response = await resetPassword({
        resetCode,
        newPassword: values.newPassword,
      }).unwrap();
  
      toast.success(response.message || 'Password successfully reset!');
      setResetSuccess(true);
  
      // ✅ احذف الكود بعد الاستخدام
      localStorage.removeItem('resetCode');
  
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to reset password.');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-300 px-4">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        {resetSuccess ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-green-600">Password Reset!</h2>
            <p className="text-gray-600 mt-2">You will be redirected to login shortly.</p>
          </div>
        ) : (
          <Formik
            initialValues={{
              resetCode: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={ResetPasswordSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-blue-700">Set New Password</h2>
              <p className="text-sm text-center text-gray-500">
                Enter the code and your new password.
              </p>

              <div>
                <Field
                  type="text"
                  name="resetCode"
                  placeholder="Reset Code"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="resetCode" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
}
