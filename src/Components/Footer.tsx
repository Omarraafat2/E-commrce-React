// src/components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Your E-commerce Store. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  