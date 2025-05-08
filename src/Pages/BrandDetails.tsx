import { useParams } from 'react-router-dom';
import { useGetBrandByIdQuery } from '../features/brands/brandApi';
import { Skeleton } from '../Components/ui/skeleton';

export default function BrandDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: brand, isLoading, isError } = useGetBrandByIdQuery(id!);
console.log(brand);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-8 animate-pulse">
        <Skeleton className="h-64 w-full rounded-lg mb-6" />
        <Skeleton className="h-8 w-1/3 rounded mb-2" />
        <Skeleton className="h-4 w-2/3 rounded" />
      </div>
    );
  }

  if (isError || !brand) {
    return <p className="text-center text-red-500 py-10">Brand not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 text-center">
      <img
        src={brand.image}
        alt={brand.name}
        className="mx-auto w-64 h-64 object-contain rounded-lg shadow-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{brand.name}</h1>
      <p className="text-gray-600 mb-4">Slug: {brand.slug}</p>
    </div>
  );
}
