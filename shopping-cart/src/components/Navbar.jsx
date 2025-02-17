import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FiShoppingCart } from "react-icons/fi";
import { LogOut, User, PlusCircle, List } from "lucide-react";
import { logout } from "../store/authSlice";

function Navbar({ msg }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Get user authentication and role from Redux
  const { isAuthenticated, user, role } = useSelector((state) => state.auth);
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
            <List size={20} /> <span>My Products</span>
          </Link>
        )}

        {/* User Dropdown */}
        {isAuthenticated ? (
          <div className="relative flex items-center gap-2">
            {/* ✅ Role displayed as text before the icon */}
            <span className="text-sm font-medium">
              {role === "seller" ? "Seller" : "Buyer"}
            </span>

            {/* ✅ User Icon at the end */}
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="focus:outline-none"
            >
              <User size={24} />
            </button>

            {showDropdown && (
              <div className="absolute -left-16 right-0 mt-40 w-36 bg-white text-gray-800 rounded-md shadow-lg py-2">
                <p className="px-4 py-2 font-semibold border-b">
                  {user?.name || "User"}
                </p>
                <p className="px-4 py-2 text-xs text-gray-600">
                  {role?.toUpperCase()}
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                >
                  <LogOut size={20} className="inline-block mr-2" /> Logout
                </button>
              </div>
            )}
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
