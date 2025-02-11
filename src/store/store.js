import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Load cart from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    console.error("Could not load state", err);
    return [];
  }
};

// Save cart to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

// Create Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: { cart: loadState() }, // Load initial state
});

// Subscribe to store changes to persist cart
store.subscribe(() => {
  saveState(store.getState().cart);
});

export default store;
