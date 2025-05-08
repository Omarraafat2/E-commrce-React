import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetSingleProductQuery,
  useGetAllProductsQuery,
} from '../services/productsApi';
import { Skeleton } from '../Components/ui/skeleton';
import ProductImageGallery from '../Components/ProductImageGallery';
import RatingStars from '../Components/RatingStars';
import AddToCartButton from '../Components/CartToggleButton';
import ProductCard from '../Components/ProductCard';
import { formatPrice } from '../lib/utils';

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { data: singleData, isLoading, isError } = useGetSingleProductQuery(productId || '');
  const { data: relatedData, isLoading: relatedLoading } = useGetAllProductsQuery({});

  const product = singleData?.data;
  // console.log(product?.category?.name);
  // console.log(relatedData?.data);

  if (isLoading || relatedLoading) {
    return (
      <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Skeleton className="h-80 w-full rounded" />
        <div>
          <Skeleton className="h-6 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-10 w-1/3 mt-4" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return <p className="text-center text-red-500">Product not found.</p>;
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto ">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
        <ProductImageGallery images={product.images} mainImage={product.imageCover} />
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-blue-600 text-lg font-semibold mb-4">{formatPrice(product.price)}</p>
          <RatingStars rating={product.ratingsAverage} count={product.ratingsQuantity} />
          <p className="text-gray-700 my-4 whitespace-pre-line">{product.description}</p>
          <AddToCartButton productId={product._id} isInCart={false} />
        </div>
      </div>

      {relatedData?.data && relatedData.data.length > 1 && (
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {relatedData.data
              .filter(
                (relatedProduct) =>
                  relatedProduct._id !== product._id &&
                  relatedProduct.category?.name === product?.category?.name
              )
              .map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} product={relatedProduct} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}