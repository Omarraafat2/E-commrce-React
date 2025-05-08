// src/Pages/SearchResults.tsx
import { useLocation, Link } from 'react-router-dom';
import { useGetAllProductsQuery } from '../services/productsApi';
import { useGetAllBrandsQuery } from '../features/brands/brandApi';
import { useGetAllCategoriesQuery } from '../features/auth/authApi';
import { Skeleton } from '../Components/ui/skeleton';
import ProductCard from '../Components/ProductCard';
import { motion } from 'framer-motion';

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function SearchResults() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const query = params.get('query') || '';
  const lowerQuery = query.trim().toLowerCase();

  // Products
  const {
    data: prodResp,
    isLoading: prodLoading,
    isError: prodError,
  } = useGetAllProductsQuery({ limit: 20, keyword: query });
  const products = prodResp?.data || [];

  // Brands
  const {
    data: brandResp,
    isLoading: brandLoading,
    isError: brandError,
  } = useGetAllBrandsQuery({ limit: 20, keyword: query });
  const brands = brandResp?.data || [];

  // Categories (client-filtered)
  const {
    data: catResp,
    isLoading: catLoading,
    isError: catError,
  } = useGetAllCategoriesQuery();
  const categories = catResp?.data || [];
  const filteredCats = categories.filter((c: any) =>
    c.name.toLowerCase().includes(lowerQuery)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Search Results for “{query}”</h1>

        {/* Products Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          {prodLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))}
            </div>
          ) : prodError ? (
            <p className="text-red-500">Failed to load products.</p>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={listVariants}
            >
              {products.map((p) => (
                <motion.div key={p._id} variants={itemVariants}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* Brands Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Brands</h2>
          {brandLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))}
            </div>
          ) : brandError ? (
            <p className="text-red-500">Failed to load brands.</p>
          ) : brands.length === 0 ? (
            <p>No brands found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
              {brands.map((b) => (
                <Link
                  key={b._id}
                  to={`/brand/${b._id}`}
                  className="flex flex-col items-center bg-white rounded-lg p-4 shadow hover:shadow-lg transition"
                >
                  <img
                    loading="lazy"
                    src={b.image}
                    alt={b.name}
                    className="h-20 w-20 object-contain mb-2"
                  />
                  <span className="font-medium text-gray-800 truncate">{b.name}</span>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Categories Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          {catLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-60 w-full rounded-lg" />
              ))}
            </div>
          ) : catError ? (
            <p className="text-red-500">Failed to load categories.</p>
          ) : filteredCats.length === 0 ? (
            <p>No categories found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredCats.map((c: any) => (
                <Link
                  key={c._id}
                  to={`/category/${c._id}`}
                  className="group block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
                >
                  <div className="relative">
                    <img
                      loading="lazy"
                      src={c.image}
                      alt={c.name}
                      className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <h3 className="text-white text-xl font-bold text-center px-2">
                        {c.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
