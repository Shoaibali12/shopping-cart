import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";

const loadCartState = () => {
  try {
    const cartState = localStorage.getItem("cart");
    return cartState ? JSON.parse(cartState) : [];
  } catch (err) {
    console.error("Could not load cart state", err);
    return [];
  }
};

const saveCartState = (state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (err) {
    console.error("Could not save cart state", err);
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
  preloadedState: { cart: loadCartState(), auth: { isAuthenticated: false } },
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
});

export default store;
