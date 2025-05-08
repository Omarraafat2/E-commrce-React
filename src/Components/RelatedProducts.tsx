// src/components/RelatedProducts.tsx
import ProductCard from "./ProductCard";
import { Product } from "../Interfaces/Product";

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

export default function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  const filteredProducts = products.filter((p) => p._id !== currentProductId);

  if (filteredProducts.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
