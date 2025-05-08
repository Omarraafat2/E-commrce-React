import { toast } from "react-hot-toast";
import { useAddToCartMutation } from "../features/cart/cartApi";
import { useAddToWishlistMutation } from "../features/wishlistApi/wishlistApi";

export const useProductActions = () => {
  const [addToCart] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();

  const handleAddToCart = async (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    toast.promise(addToCart(productId).unwrap(), {
      loading: "Adding to cart...",
      success: "Added to cart!",
      error: "Failed to add to cart.",
    });
  };

  const handleAddToWishlist = async (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    toast.promise(addToWishlist(productId).unwrap(), {
      loading: "Adding to wishlist...",
      success: "❤️ Added to wishlist!",
      error: "Failed to add to wishlist.",
    });
  };

  return {
    handleAddToCart,
    handleAddToWishlist,
  };
};
