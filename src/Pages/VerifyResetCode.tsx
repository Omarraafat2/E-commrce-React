import { useVerifyResetCodeMutation } from '../features/auth/authApi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const VerifyResetCodeSchema = Yup.object().shape({
  resetCode: Yup.string().required('Reset code is required'),
});

export default function VerifyResetCode() {
  const [verifyResetCode, { isLoading }] = useVerifyResetCodeMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values: { resetCode: string }) => {
    try {
      const response = await verifyResetCode(values).unwrap();
      toast.success(response.message || 'Code Verified!');
      
      // ✅ خزّنه في localStorage لاستخدامه في reset-password
      localStorage.setItem('resetCode', values.resetCode);
      
      // ✅ توجيه لصفحة reset-password
      navigate('/reset-password', { state: { allowed: true } });
    } catch (error: any) {
      toast.error(error.data?.message || 'Invalid Reset Code');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-300 px-4">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg w-full max-w-md space-y-6">
        <Formik
          initialValues={{ resetCode: '' }}
          validationSchema={VerifyResetCodeSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-blue-700">Verify Code</h2>
            <p className="text-sm text-center text-gray-500">
              Enter the reset code sent to your email.
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
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
