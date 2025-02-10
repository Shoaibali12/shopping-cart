import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { removeItem, updateQuantity } from "../store/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
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
  );
}
export default Cart;
