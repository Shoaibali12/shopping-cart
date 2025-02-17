import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { LogOut, User, PlusCircle, List } from "lucide-react"; // Added List icon
import { logout } from "../store/authSlice";

function Navbar({ msg }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user authentication and role from Redux
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin", { replace: true });
  };

  return (
    <div className="w-full h-16 bg-gray-800 text-white flex justify-between items-center px-8 shadow-lg">
      <Link to="/" className="text-xl font-bold">
        🛒 Shopping
      </Link>

      <p className="text-lg font-semibold">{msg}</p>

      <div className="flex items-center gap-6">
        {/* Cart Icon with Count (For All Users) */}
        {isAuthenticated && (
          <Link to="/cart" className="relative flex items-center">
            <FiShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        )}

        {/* Show "Add Product" Button for Sellers Only */}
        {isAuthenticated && role === "seller" && (
          <Link
            to="/add-product"
            className="flex items-center gap-2 bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700 transition"
          >
            <PlusCircle size={20} /> <span>Add Product</span>
          </Link>
        )}

        {/* Show "My Products" Button for Sellers Only */}
        {isAuthenticated && role === "seller" && (
          <Link
            to="/my-products"
            className="flex items-center gap-2 bg-yellow-500 px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
          >
            <List /> <span>My Products</span>
          </Link>
        )}

        {/* Show User Info and Logout Button */}
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <p className="font-semibold capitalize">{role}</p>
            <User size={24} />
            <button onClick={handleLogout} className="text-white">
              <LogOut size={24} />
            </button>
          </div>
        ) : (
          <Link
            to="/signin"
            className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600 transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
