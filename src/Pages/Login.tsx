// src/pages/Login.tsx
import { useLoginMutation } from '../features/auth/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth, setCredentials } from '../features/auth/authSlice';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Too short!').required('Password is required'),
});

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(selectAuth);

  if (token) return <Navigate to="/home" replace />;

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const res = await login(values).unwrap();
      dispatch(setCredentials({ token: res.token, user: res.user }));
      toast.success('Logged in successfully!');
      navigate('/home');
    } catch (err) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-300 px-4">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6">
          <h2 className="text-3xl font-extrabold text-center text-blue-700">Welcome Back</h2>
          <p className="text-sm text-center text-gray-500">Please login to continue</p>

          <div>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="text-right text-sm">
            <Link to="/forgot-password" className="text-blue-600 hover:underline">Forgot Password?</Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </Form>
      </Formik>
    </div>
  );
}
