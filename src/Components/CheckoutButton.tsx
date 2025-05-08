// src/components/CheckoutButton.tsx
import { useNavigate } from 'react-router-dom';

interface CheckoutButtonProps {
  cartId: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ cartId }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/payment', { state: { cartId } });
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
    >
      Checkout
    </button>
  );
};

export default CheckoutButton;
