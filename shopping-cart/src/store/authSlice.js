import { createSlice } from "@reduxjs/toolkit";

const loadAuthState = () => {
  try {
    const authState = localStorage.getItem("auth");
    return authState
      ? JSON.parse(authState)
      : { isAuthenticated: false, role: "buyer" }; // Default role: buyer
  } catch (err) {
    console.error("Could not load auth state", err);
    return { isAuthenticated: false, role: "buyer" };
  }
};

const saveAuthState = (state) => {
  try {
    localStorage.setItem("auth", JSON.stringify(state));
  } catch (err) {
    console.error("Could not save auth state", err);
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadAuthState(),
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.role = action.payload.role; // Store user role
      saveAuthState(state);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = "buyer"; // Reset role to default
      saveAuthState(state);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
