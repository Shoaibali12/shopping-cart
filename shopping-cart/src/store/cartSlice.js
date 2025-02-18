import { createSlice } from "@reduxjs/toolkit";

// ✅ Define the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: [], // Cart is stored in Redux only (no backend)
  reducers: {
    addItem: (state, action) => {
      const itemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state[itemIndex] = {
          ...state[itemIndex],
          quantity: state[itemIndex].quantity + 1,
        }; // ✅ Increase quantity
      } else {
        state.push({ ...action.payload, quantity: 1 }); // ✅ Add new item
      }
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id); // ✅ Remove item from cart
    },
    updateQuantity: (state, action) => {
      const itemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state[itemIndex] = {
          ...state[itemIndex],
          quantity: action.payload.quantity,
        }; // ✅ Update quantity
      }
    },
    clearCart: () => {
      return []; // ✅ Empty the cart
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
