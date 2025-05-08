// src/pages/ForgotPassword.tsx
import { useForgotPasswordMutation } from '../features/auth/authApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

export default function ForgotPassword() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string }) => {
    try {
      const response = await forgotPassword(values).unwrap();
      toast.success(response.message || 'Password reset email sent!');
      navigate('/verify-reset-code');
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to send reset email.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-300 px-4">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        <Formik
          initialValues={{ email: '' }}
          validationSchema={ForgotPasswordSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-blue-700">Reset Password</h2>
            <p className="text-sm text-center text-gray-500">
              Enter your email to receive reset instructions.
            </p>
            <div>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );

}