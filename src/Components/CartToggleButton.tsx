import { useAddToCartMutation } from "../features/cart/cartApi";
import { useRemoveFromCartMutation } from "../features/cart/cartApi";
import { toast } from "react-hot-toast";

interface Props {
  productId: string;
  isInCart: boolean;
  onToggle?: () => void;
}

export default function CartToggleButton({ productId, isInCart, onToggle }: Props) {
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation();

  const handleClick = async () => {
    try {
      if (isInCart) {
        await removeFromCart(productId).unwrap();
        toast.success("Product removed from cart");
      } else {
        await addToCart(productId).unwrap();
        toast.success("Product added to cart");
      }
      onToggle?.();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isAdding || isRemoving}
      className={`px-4 py-2 rounded transition text-white disabled:opacity-50 ${
        isInCart ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {isAdding || isRemoving ? "Processing..." : isInCart ? "Remove from Cart" : "Add to Cart"}
    </button>
  );
}
