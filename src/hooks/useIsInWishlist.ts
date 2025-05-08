import { useGetWishlistQuery } from "../features/wishlistApi/wishlistApi";

export const useIsInWishlist = (productId: string) => {
  const { data: wishlistData } = useGetWishlistQuery();
  return wishlistData?.data?.some((item: { _id: string; }) => item._id === productId);
};
