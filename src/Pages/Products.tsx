import { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../services/productsApi";
import ProductCard from "../Components/ProductCard";
import ProductCardSkeleton from "../Components/ui/ProductCardSkeleton";
import { motion } from "framer-motion";
import { usePrefetch } from "../services/productsApi";

const Products = () => {
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading, isError } = useGetAllProductsQuery({ page, limit });
  const totalPages = data?.metadata?.numberOfPages || 1;

  const prefetchProducts = usePrefetch("getAllProducts");

  useEffect(() => {
    // Prefetch الصفحة التالية لو لسه فيه صفحات
    if (page < totalPages) {
      prefetchProducts({ page: page + 1, limit }, { force: true });
    }

    // Prefetch الصفحة السابقة (اختياري)
    if (page > 1) {
      prefetchProducts({ page: page - 1, limit }, { force: true });
    }
  }, [page, totalPages, prefetchProducts, limit]);

  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-center text-gray-800 mb-10"
      >
        Explore Our Products
      </motion.h1>

      {isError && (
        <p className="text-center text-red-500">
          Failed to load products. Please try again later.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: limit }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))
          : data?.data.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05, duration: 0.3 }}
              >
                <ProductCard
                  product={product}
                  category={product.category?.name}
                />
              </motion.div>
            ))}
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded ${
                page === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
