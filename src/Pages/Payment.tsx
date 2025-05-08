// src/pages/PaymentPage.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCreateCheckoutSessionMutation } from '../features/orderApi/orderApi';
import { IShippingAddress } from '../Interfaces/IShipping';
import { initiatePayment } from '../services/paymentService';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const cartId = location.state?.cartId || '';

  const [formData, setFormData] = useState<IShippingAddress>({
    details: '',
    city: '',
    phone: '',
  });

  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.details || !formData.city || !formData.phone) {
      return alert('Please fill all fields');
    }

    if (!cartId) {
      return alert('Cart ID is missing.');
    }

    await initiatePayment(cartId, formData, `${window.location.origin}`, createCheckoutSession);
  };

  return (
    <div className="max-w-xl mx-auto mt-24 p-6 border rounded-lg shadow bg-white space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-700">Shipping Details</h2>

      <input
        name="details"
        placeholder="Address details"
        value={formData.details}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />
      <input
        name="city"
        placeholder="City"
        value={formData.city}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />
      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
      >
        Confirm & Pay
      </button>
    </div>
  );
};

export default PaymentPage;
