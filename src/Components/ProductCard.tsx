import { Link } from "react-router-dom";
import { memo, useCallback, useMemo } from "react";
import { ShoppingCart, Heart } from "lucide-react";

import { Product } from "../Interfaces/Product";
import { formatPrice } from "../lib/utils";
import { useProductActions } from "../hooks/useProductActions";

interface ProductCardProps {
  product: Product;
  category?: string;
  wishlistData?: { _id: string }[];
}

function ProductCard({ product, category, wishlistData = [] }: ProductCardProps) {
  const { handleAddToCart, handleToggleWishlist } = useProductActions();

  const isInWishlist = useMemo(() => {
    return wishlistData.some((item) => item._id === product._id);
  }, [wishlistData, product._id]);

  const onAddToCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      handleAddToCart(product._id, e);
    },
    [handleAddToCart, product._id]
  );

  const onAddToWishlist = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      handleToggleWishlist(product._id, isInWishlist, e);
    },
    [handleToggleWishlist, isInWishlist, product._id]
  );

  const categoryUrlPart = category ? `?category=${category}` : "";

  return (
    <Link
      to={`/product/${product._id}${categoryUrlPart}`}
      className="group flex flex-col h-full bg-white rounded-2xl p-4 shadow hover:shadow-xl transition duration-200"
    >
      <img
        src={product.imageCover}
        alt={product.title}
        loading="lazy"
        className="w-full h-48 object-cover mb-4 rounded-xl transition-transform duration-300 group-hover:scale-105"
      />
      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition">
        {product.title}
      </h3>
      <p className="text-blue-600 font-bold mb-4">{formatPrice(product.price)}</p>
      <div className="mt-auto flex items-center gap-2">
        <button
          onClick={onAddToCart}
          className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white text-sm px-3 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
        <button
          onClick={onAddToWishlist}
          aria-label="Toggle Wishlist"
          className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300
            ${isInWishlist
              ? "bg-red-100 text-red-600 scale-110 shadow-inner"
              : "bg-gray-100 text-red-500 hover:bg-red-100 hover:text-red-600"}
          `}
        >
          <Heart
            size={18}
            className={`transition-transform duration-300 ${
              isInWishlist ? "fill-red-600 scale-110" : "fill-transparent"
            }`}
          />
        </button>
      </div>
    </Link>
  );
}

export default memo(ProductCard);
