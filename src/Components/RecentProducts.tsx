import { useParams } from 'react-router-dom';
import { useGetAllProductsQuery } from "../services/productsApi";
import ProductCard from "./ProductCard";
import { Skeleton } from "./ui/skeleton";
import { Product } from "../Interfaces/Product";
import { motion } from "framer-motion";
import { useGetWishlistQuery } from "../features/wishlistApi/wishlistApi";

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function RecentProducts() {
  const { categori } = useParams();
  const { data, isLoading, isError } = useGetAllProductsQuery(
    { category: categori, limit: 8, sort: "-createdAt" }
  );

  const { data: wishlistData } = useGetWishlistQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
    skip: !localStorage.getItem("token"),
  });

  const products = data?.data || [];
  const wishlistItems = wishlistData?.data || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10">
        {[...Array(8)].map((_, idx) => (
          <div key={idx} className="border rounded-2xl p-4 shadow animate-pulse">
            <Skeleton className="h-48 w-full mb-4 rounded-xl" />
            <Skeleton className="h-4 w-3/4 mb-2 rounded" />
            <Skeleton className="h-4 w-1/3 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-500">Error fetching products.</p>;
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10"
      initial="hidden"
      animate="visible"
      variants={listVariants}
    >
      {products.map((product: Product) => (
        <motion.div key={product._id} variants={itemVariants}>
          <ProductCard
            product={product}
            category={product.category?.name}
            wishlistData={wishlistItems}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
