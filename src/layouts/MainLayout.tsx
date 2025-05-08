// src/layouts/MainLayout.tsx
import { ReactNode } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

interface MainLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export default function MainLayout({ children, showFooter = true }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}