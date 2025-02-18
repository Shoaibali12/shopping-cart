import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "../store/cartSlice"; // ✅ Import Redux actions
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Cart() {
  const cart = useSelector((state) => state.cart); // ✅ Get cart from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (id) => {
    dispatch(removeItem({ id })); // ✅ Remove from Redux store
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity })); // ✅ Update quantity in Redux
  };

  const handleClearCart = () => {
    dispatch(clearCart()); // ✅ Clear the cart
  };

  const totalBill = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ); // ✅ Calculate total

  return (
    <div className="text-center w-full flex flex-col justify-center items-center">
      <Navbar msg="Cart Items" />
      <div className="w-1/2 mt-4">
        {cart.length === 0 ? (
          <p className="text-gray-500">🛒 Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-2 mb-2"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain"
              />
              <span className="flex-1">
                {item.title} - ${item.price} x {item.quantity}
              </span>
              <input
                type="number"
                className="border p-1 w-16 text-center"
                value={item.quantity}
                onChange={(e) =>
                  handleUpdateQuantity(item.id, Number(e.target.value))
                }
              />
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <>
          <div className="mt-4 text-xl font-semibold">
            Total: ${totalBill.toFixed(2)}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </>
      )}

      <button
        className="mt-8 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        onClick={() => navigate("/")}
      >
        Back to Products
      </button>
    </div>
  );
}

export default Cart;
