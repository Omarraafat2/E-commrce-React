import { productsApi } from '../services/productsApi';
import { authApi } from '../features/auth/authApi';
import { cartApi } from '../features/cart/cartApi';
import { brandApi } from '../features/brands/brandApi';
import { orderApi } from '../features/orderApi/orderApi';
import { wishlistApi } from '../features/wishlistApi/wishlistApi'; // ✅ import wishlistApi

const rootMiddleware = [
  productsApi.middleware,
  authApi.middleware,
  cartApi.middleware,
  brandApi.middleware,
  orderApi.middleware,
  wishlistApi.middleware, // ✅ add wishlist middleware
];

export default rootMiddleware;
