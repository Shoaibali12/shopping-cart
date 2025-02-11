import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total bill
  const totalBill = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Handle purchase
  const handlePurchase = () => {
    cart.forEach((item) => dispatch(removeItem(item)));
    alert("Purchase successful! Your cart is now empty.");
  };

  return (
    <div className="text-center w-full flex flex-col justify-center items-center ">
      <div className="mb-8 w-full">
        <Navbar msg="Cart Items" />
      </div>
      <div className="w-1/2">
        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty</p>
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
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: Number(e.target.value),
                    })
                  )
                }
              />
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => dispatch(removeItem(item))}
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
            Total Bill: ${totalBill.toFixed(2)}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handlePurchase}
          >
            Buy
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
