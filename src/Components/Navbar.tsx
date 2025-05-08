import { useSelector, useDispatch } from "react-redux";
import { selectAuth, logout } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useMemo } from "react";
import logo from "../assets/OmarLogo.png";
import { ShoppingCart, Heart } from "lucide-react";
import { useGetUserCartQuery } from "../features/cart/cartApi";
import { useGetWishlistQuery } from "../features/wishlistApi/wishlistApi";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector(selectAuth);
  const [menuOpen, setMenuOpen] = useState(false);

  const { data: cartData } = useGetUserCartQuery(undefined, { skip: !token });
  const { data: wishlistData } = useGetWishlistQuery(undefined, { skip: !token });

  const totalItems = useMemo(() => {
    return cartData?.data?.products?.reduce((acc, item) => acc + item.count, 0) || 0;
  }, [cartData]);

  const wishlistCount = useMemo(() => {
    return wishlistData?.data?.length || 0;
  }, [wishlistData]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const CartIcon = (
    <Link to="/cart" className="relative group">
      <ShoppingCart className="w-7 h-7 text-gray-600 group-hover:text-blue-600 transition" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {totalItems}
        </span>
      )}
    </Link>
  );

  const WishlistIcon = (
    <Link to="/wishlist" className="relative group">
      <Heart className="w-7 h-7 text-gray-600 group-hover:text-red-500 transition" />
      {wishlistCount > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
          {wishlistCount}
        </span>
      )}
    </Link>
  );

  const renderAuthLinks = (isMobile = false) => (
    <div className={`flex ${isMobile ? "flex-col space-y-4" : "items-center space-x-6"}`}>
      <div className={`flex ${isMobile ? "space-x-6" : "space-x-4"} mb-2`}>
        {CartIcon}
        {WishlistIcon}
      </div>
      <Link to="/home" className="text-gray-700 hover:text-blue-600 font-medium transition" onClick={() => setMenuOpen(false)}>
        Home
      </Link>
      <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium transition" onClick={() => setMenuOpen(false)}>
        Products
      </Link>
      <Link to="/profile" className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition" onClick={() => setMenuOpen(false)}>
        <FontAwesomeIcon icon={faUserCircle} className="mr-2 text-blue-500" size="lg" />
        <span>{user?.name?.split(" ")[0] || "Profile"}</span>
      </Link>
      <button onClick={handleLogout} className="text-red-600 hover:text-red-700 font-semibold transition">
        Logout
      </button>
    </div>
  );

  const renderGuestLinks = (isMobile = false) => (
    <div className={`flex ${isMobile ? "flex-col space-y-4" : "items-center space-x-6"}`}>
      <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition" onClick={() => setMenuOpen(false)}>
        Login
      </Link>
      <Link to="/register" className="text-gray-700 hover:text-blue-600 font-medium transition" onClick={() => setMenuOpen(false)}>
        Register
      </Link>
    </div>
  );

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <Link to="/" className="flex items-center space-x-3">
        <img src={logo} alt="OmarStore Logo" className="h-10 w-auto" />
      </Link>

      <div className="hidden md:flex">
        {token ? renderAuthLinks() : renderGuestLinks()}
      </div>

      <button className="md:hidden text-3xl text-gray-600 focus:outline-none" onClick={toggleMenu}>
        <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-[72px] left-0 w-full bg-white z-40 shadow-md transition-all duration-300 ease-in-out md:hidden ${
          menuOpen ? "max-h-[100vh] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col px-6 py-4">
          {token ? renderAuthLinks(true) : renderGuestLinks(true)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
