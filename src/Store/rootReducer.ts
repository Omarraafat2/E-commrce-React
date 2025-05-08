import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import { authApi } from '../features/auth/authApi';
import { productsApi } from '../services/productsApi';
import { cartApi } from '../features/cart/cartApi';
import { brandApi } from '../features/brands/brandApi';
import { orderApi } from '../features/orderApi/orderApi';
import { wishlistApi } from '../features/wishlistApi/wishlistApi'; // ✅ import wishlistApi

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  [authApi.reducerPath]: authApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [brandApi.reducerPath]: brandApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer, // ✅ register reducer
});

export default rootReducer;
