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

// ✅ Load auth state from localStorage
const loadAuthState = () => {
  try {
    const authState = localStorage.getItem("auth");
    return authState
      ? JSON.parse(authState)
      : { isAuthenticated: false, role: "buyer" };
  } catch (err) {
    console.error("Could not load auth state", err);
    return { isAuthenticated: false, role: "buyer" };
  }
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
  preloadedState: {
    cart: loadCartState(),
    auth: loadAuthState(), // ✅ Use the loaded auth state
  },
});

store.subscribe(() => {
  saveCartState(store.getState().cart);
});

export default store;
