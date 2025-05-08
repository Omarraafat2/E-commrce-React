// src/pages/Register.tsx
import { useSignupMutation } from '../features/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Too short!').required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Too short!').required('Password is required'),
  rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required(),
  phone: Yup.string().min(10).required('Phone is required'),
});

export default function Register() {
  const [register, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      await register(values).unwrap();
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (err) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 to-green-300 px-4">
      <Formik
        initialValues={{ name: '', email: '', password: '', rePassword: '', phone: '' }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-white p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6">
          <h2 className="text-3xl font-extrabold text-center text-green-700">Create Account</h2>

          <div>
            <Field name="name" placeholder="Name" className="w-full border p-3 rounded-lg" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <Field name="email" placeholder="Email" className="w-full border p-3 rounded-lg" />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <Field name="password" type="password" placeholder="Password" className="w-full border p-3 rounded-lg" />
            <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <Field name="rePassword" type="password" placeholder="Confirm Password" className="w-full border p-3 rounded-lg" />
            <ErrorMessage name="rePassword" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <Field name="phone" placeholder="Phone" className="w-full border p-3 rounded-lg" />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </Form>
      </Formik>
    </div>
  );
}
