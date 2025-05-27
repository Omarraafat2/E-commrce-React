import { toast } from "react-hot-toast";
import { useAddToCartMutation } from "../features/cart/cartApi";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation
} from "../features/wishlistApi/wishlistApi";

export const useProductActions = () => {
  const [addToCart] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const handleAddToCart = async (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    toast.promise(addToCart(productId).unwrap(), {
      loading: "Adding to cart...",
      success: "Added to cart!",
      error: "Failed to add to cart.",
    });
  };

  const handleToggleWishlist = async (
    productId: string,
    isInWishlist: boolean,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    if (isInWishlist) {
      toast.promise(removeFromWishlist(productId).unwrap(), {
        loading: "Removing from wishlist...",
        success: "Removed from wishlist!",
        error: "Failed to remove.",
      });
    } else {
      toast.promise(addToWishlist(productId).unwrap(), {
        loading: "Adding to wishlist...",
        success: "❤️ Added to wishlist!",
        error: "Failed to add.",
      });
    }
  };

  return {
    handleAddToCart,
    handleToggleWishlist,
  };
};
