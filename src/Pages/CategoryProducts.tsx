import { useParams } from 'react-router-dom';
import { useGetProductsByCategoryQuery } from '../services/productsApi';
import ProductCard from '../Components/ProductCard';
import { Product } from '../Interfaces/Product';

export default function CategoryProducts() {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading, isError } = useGetProductsByCategoryQuery(slug!);

  if (isLoading) return <p className="text-center py-10">Loading products...</p>;
  if (isError || !data?.data) return <p className="text-center text-red-500 py-10">Failed to load products.</p>;

  const products = data.data;
  const categoryName = products[0]?.category.name;

  console.log(data);

  return (
    <div className="max-w-7xl mx-auto px-4 pt-20">
     {categoryName?<h2 className="text-3xl font-extrabold mb-8 text-center capitalize text-gray-800 py-4 border-b border-gray-300">
        {categoryName} Products
      </h2>: null} 
      {products.length === 0 ? (
        <div className="text-center py-10">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 2v3m0-3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-xl font-semibold text-gray-600">No products in this category yet.</p>
          <p className="mt-2 text-gray-500">Stay tuned for updates!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}