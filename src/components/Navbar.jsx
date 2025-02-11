import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar({ msg }) {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="w-full h-16 bg-gray-800 text-white flex justify-between items-center px-8 shadow-lg">
      <Link to="/" className="text-xl font-bold">
        🛒 Shopping
      </Link>

      <p className="text-lg font-semibold">{msg}</p>

      <Link to="/cart" className="relative">
        <p className="font-semibold">Cart</p>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {cart.length}
          </span>
        )}
      </Link>
    </div>
  );
}

export default Navbar;
