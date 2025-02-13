import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import { ShoppingCart, LogOut, User } from "lucide-react";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";

function Navbar({ msg }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
        {/* Cart Icon with Count */}
        <Link to="/cart" className="relative flex items-center">
          <FiShoppingCart size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <p className="font-semibold">{user.name}</p>
            <User size={24} />
            <button onClick={handleLogout} className="text-white">
              <LogOut size={24} />
            </button>
          </div>
        ) : (
          <Link to="/signin" className="bg-blue-500 px-3 py-1 rounded-lg">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
