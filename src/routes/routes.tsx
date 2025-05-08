import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';

import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Profile from '../Pages/Profile';
import ChangePassword from '../Pages/ChangePassword';
import ForgotPassword from '../Pages/ForgotPassword';
import VerifyResetCode from '../Pages/VerifyResetCode';
import ResetPassword from '../Pages/ResetPassword';
import NotFound from '../Pages/NotFound';
import ProductDetails from '../Pages/ProductDetails';
import Categories from '../Pages/Categories';
import CategoryProducts from '../Pages/CategoryProducts';
import Cart from '../Pages/Cart';
import BrandDetails from '../Pages/BrandDetails';
import BrandsList from '../Pages/BrandsList';
import SearchResults from '../Pages/SearchResults';
import Payment from '../Pages/Payment';
import AllOrders from '../Pages/AllOrders';
import Wishlist from '../Pages/Wishlist';
import Products from '../Pages/Products';

import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  const { token } = useSelector(selectAuth);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={token ? '/home' : '/login'} replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<MainLayout showFooter={false}><Login /></MainLayout>} />
      <Route path="/register" element={<MainLayout showFooter={false}><Register /></MainLayout>} />
      <Route path="/forgot-password" element={<MainLayout showFooter={false}><ForgotPassword /></MainLayout>} />
      <Route path="/verify-reset-code" element={<MainLayout showFooter={false}><VerifyResetCode /></MainLayout>} />
      <Route path="/reset-password" element={<MainLayout showFooter={false}><ResetPassword /></MainLayout>} />

      {/* Protected Routes */}
      <Route path="/home" element={<ProtectedRoute><MainLayout><Home /></MainLayout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
      <Route path="/change-password" element={<ProtectedRoute><MainLayout><ChangePassword /></MainLayout></ProtectedRoute>} />
      <Route path="/product/:productId/:categori?" element={<ProtectedRoute><MainLayout><ProductDetails /></MainLayout></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><MainLayout><Products /></MainLayout></ProtectedRoute>} />
      <Route path="/categories" element={<ProtectedRoute><MainLayout><Categories /></MainLayout></ProtectedRoute>} />
      <Route path="/category/:slug" element={<ProtectedRoute><MainLayout><CategoryProducts /></MainLayout></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><MainLayout><Cart /></MainLayout></ProtectedRoute>} />
      <Route path="/brands" element={<ProtectedRoute><MainLayout><BrandsList /></MainLayout></ProtectedRoute>} />
      <Route path="/brand/:id" element={<ProtectedRoute><MainLayout><BrandDetails /></MainLayout></ProtectedRoute>} />
      <Route path="/payment" element={<ProtectedRoute><MainLayout><Payment /></MainLayout></ProtectedRoute>} />
      <Route path="/allorders" element={<ProtectedRoute><MainLayout><AllOrders /></MainLayout></ProtectedRoute>} />
      <Route path="/wishlist" element={<ProtectedRoute><MainLayout><Wishlist /></MainLayout></ProtectedRoute>} />
      <Route path="/search" element={<ProtectedRoute><MainLayout><SearchResults /></MainLayout></ProtectedRoute>} />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
