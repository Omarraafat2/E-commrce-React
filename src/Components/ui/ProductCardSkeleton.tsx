
const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col p-4 bg-white rounded-2xl shadow">
      <div className="h-48 bg-gray-300 rounded-xl mb-4" />
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4" />
      <div className="flex gap-2 mt-auto">
        <div className="flex-1 h-10 bg-gray-300 rounded-xl" />
        <div className="w-10 h-10 bg-gray-300 rounded-xl" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
