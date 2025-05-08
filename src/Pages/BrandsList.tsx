import { useGetAllBrandsQuery } from '../features/brands/brandApi';
import { Link } from 'react-router-dom';
import { Skeleton } from '../Components/ui/skeleton';

export default function BrandsList() {
  const { data: resp, isLoading, isError } = useGetAllBrandsQuery({ limit: 20 });
  const brands = resp?.data || [];
  console.log(resp);
  

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError || !resp?.data?.length) {
    return null; // لو في مشكلة أو البيانات فاضية منرجعش حاجة
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Our Brands</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand._id}
            to={`/brand/${brand._id}`}
            className="flex flex-col items-center bg-white rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={brand.image}
              alt={brand.name}
              loading="lazy"
              className="h-20 w-20 object-contain mb-2"
            />
            <span className="font-medium text-gray-800 text-center truncate">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
