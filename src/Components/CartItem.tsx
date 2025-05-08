import { memo } from "react";

interface Props {
  item: {
    _id: string;
    count: number;
    price: number;
    product: {
      _id: string;
      title: string;
      imageCover: string;
      price: number;
    };
  };
  onRemove: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  isRemoving: boolean;
}

function CartItem({ item, onRemove, onIncrement, onDecrement, isRemoving }: Props) {
  const { product, count, price } = item;

  return (
    <li className="border p-4 rounded-lg shadow-sm flex items-center justify-between bg-white hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <img
          src={product.imageCover || "/fallback.jpg"}
          alt={product.title}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div>
          <p className="font-semibold text-lg text-gray-800">{product.title}</p>
          <p className="text-sm text-gray-500 mb-1">Total: {price} EGP</p>
          <div className="flex items-center gap-2">
            <button
              className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800"
              onClick={() => onDecrement(product._id)}
              disabled={count <= 1}
            >-</button>
            <span className="text-sm font-medium text-gray-700">{count}</span>
            <button
              className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800"
              onClick={() => onIncrement(product._id)}
            >+</button>
          </div>
        </div>
      </div>

      <button
        onClick={() => onRemove(product._id)}
        disabled={isRemoving}
        className="text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
      >
        {isRemoving ? "جاري الحذف..." : "حذف"}
      </button>
    </li>
  );
}

export default memo(CartItem);
