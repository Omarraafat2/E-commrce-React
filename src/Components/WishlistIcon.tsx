import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useGetWishlistQuery } from "../features/wishlistApi/wishlistApi";
import { useMemo } from "react";

const WishlistIcon = () => {
  const { data: wishlistData } = useGetWishlistQuery(undefined, { skip: !localStorage.getItem("token") });

  const wishlistCount = useMemo(() => {
    return wishlistData?.data?.length || 0;
  }, [wishlistData?.data]);

  return (
    <Link to="/wishlist" className="relative group">
      <Heart className="w-7 h-7 text-gray-600 group-hover:text-red-500 transition" />
      {wishlistCount > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {wishlistCount}
        </span>
      )}
    </Link>
  );
};

export default WishlistIcon;
