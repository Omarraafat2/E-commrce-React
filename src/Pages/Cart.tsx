import { memo, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  useGetUserCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
} from '../features/cart/cartApi';
import CheckoutButton from '../Components/CheckoutButton';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

function CartPage() {
  const { data, isLoading, isError } = useGetUserCartQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateCartQuantity] = useUpdateCartItemMutation();

  const handleRemove = useCallback(async (productId: string) => {
    toast.promise(removeFromCart(productId).unwrap(), {
      loading: 'Removing item...',
      success: 'Item removed successfully!',
      error: 'Failed to remove item.',
    });
  }, [removeFromCart]);

  const handleUpdateQuantity = useCallback(async (productId: string, newCount: number) => {
    toast.promise(
      updateCartQuantity({ productId, count: newCount }).unwrap(),
      {
        loading: 'Updating quantity...',
        success: 'Quantity updated!',
        error: 'Failed to update quantity.',
      }
    );
  }, [updateCartQuantity]);

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500">Failed to load cart.</p>;
  }

  const cart = data?.data;

  if (!cart || !cart.products || cart.products.length === 0) {
    return <p className="text-center mt-10">Your cart is empty.</p>;
  }

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto py-20"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold mb-6 border-b pb-4 text-center">🛒 Your Cart</h2>

      <ul className="space-y-5">
        {cart.products.map((item) => (
          <motion.li
            key={item._id}
            className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-5">
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-20 h-20 rounded-md object-cover"
              />
              <div>
                <p className="font-semibold text-lg">{item.product.title}</p>
                <p className="text-sm text-gray-500">Price: {item.price} EGP</p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg"
                    onClick={() => handleUpdateQuantity(item.product._id, item.count - 1)}
                    disabled={item.count <= 1}
                  >
                    −
                  </button>
                  <span className="text-gray-700">{item.count}</span>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg"
                    onClick={() => handleUpdateQuantity(item.product._id, item.count + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item.product._id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </motion.li>
        ))}
      </ul>

      <motion.div
        className="text-right mt-6 text-xl font-semibold text-green-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Total: {cart.totalCartPrice} EGP
      </motion.div>

      <div className="flex justify-end mt-8">
        <CheckoutButton cartId={cart._id} />
      </div>
    </motion.div>
  );
}

export default memo(CartPage);
