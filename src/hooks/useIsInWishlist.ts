// hooks/useIsInWishlist.ts
import { useMemo } from "react";
import { useGetWishlistQuery } from "../features/wishlistApi/wishlistApi";

export const useIsInWishlist = (productId: string) => {
  const { data: wishlistData } = useGetWishlistQuery(undefined, {
    // Prevent refetching on focus/reconnect
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  });

  return useMemo(() => {
    return wishlistData?.data?.some((item: { _id: string }) => item._id === productId);
  }, [wishlistData?.data, productId]);
};
