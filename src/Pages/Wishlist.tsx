import { useGetWishlistQuery, useRemoveFromWishlistMutation } from "../features/wishlistApi/wishlistApi";
import { useAddToCartMutation } from "../features/cart/cartApi";
import { Product } from "../Interfaces/Product";
import { Link } from "react-router-dom";
import { formatPrice } from "../lib/utils";
import { Loader2, HeartOff, X, ShoppingCart } from "lucide-react";
import { toast } from "react-hot-toast";

const Wishlist = () => {
  const { data, isLoading, isError } = useGetWishlistQuery();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  const handleRemove = async (id: string) => {
    toast.promise(removeFromWishlist(id).unwrap(), {
      loading: "Removing...",
      success: "Removed from wishlist",
      error: "Failed to remove",
    });
  };

  const handleAddToCart = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    toast.promise(addToCart(id).unwrap(), {
      loading: "Adding to cart...",
      success: "Added to cart!",
      error: "Failed to add to cart",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  if (isError || !data?.data?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-600">
        <HeartOff className="w-16 h-16 mb-4 text-red-400" />
        <p className="text-xl font-semibold">Your wishlist is empty.</p>
        <Link
          to="/home"
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        My Wishlist
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.data.map((product: Product) => (
          <div
            key={product._id}
            className="relative group border rounded-2xl p-4 shadow-md hover:shadow-lg transition bg-white"
          >
            <button
              onClick={() => handleRemove(product._id)}
              className="absolute top-3 right-3 z-10 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
              title="Remove from Wishlist"
            >
              <X className="w-4 h-4" />
            </button>

            <Link to={`/product/${product._id}`} className="block">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
              />
              <h3 className="text-lg font-semibold text-gray-700 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                {product.title}
              </h3>
              <p className="text-blue-600 font-bold">{formatPrice(product.price)}</p>
            </Link>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => handleAddToCart(e, product._id)}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
