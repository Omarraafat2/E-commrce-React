import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useGetUserCartQuery } from "../features/cart/cartApi";
import { useMemo } from "react";

const CartIcon = () => {
  const { data: cartData } = useGetUserCartQuery(undefined, { skip: !localStorage.getItem("token") });

  const totalItems = useMemo(() => {
    return cartData?.data?.products?.reduce((acc, item) => acc + item.count, 0) || 0;
  }, [cartData?.data?.products]);

  return (
    <Link to="/cart" className="relative group">
      <ShoppingCart className="w-7 h-7 text-gray-600 group-hover:text-blue-600 transition" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
