import { createSlice } from "@reduxjs/toolkit";

const loadAuthState = () => {
  try {
    const authState = localStorage.getItem("auth");
    return authState
      ? JSON.parse(authState)
      : { isAuthenticated: false, role: "buyer", user: null, token: null };
  } catch (err) {
    console.error("Could not load auth state", err);
    return { isAuthenticated: false, role: "buyer", user: null, token: null };
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
      state.role = action.payload.role;
      state.user = action.payload.user; // ✅ Store full user object
      state.token = action.payload.token;
      saveAuthState(state);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = "buyer";
      state.user = null;
      state.token = null;
      saveAuthState(state);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
