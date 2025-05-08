// src/pages/AllOrders.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AllOrders() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000); 

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <h2 className="text-3xl font-bold text-green-700 mb-4">✅ Order placed successfully!</h2>
      <p className="text-gray-600">You will be redirected to the homepage shortly...</p>
    </div>
  );
}

export default AllOrders;
