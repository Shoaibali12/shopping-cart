import { createSlice } from "@reduxjs/toolkit";

const loadAuthState = () => {
  try {
    const authState = localStorage.getItem("auth");
    return authState ? JSON.parse(authState) : { isAuthenticated: false };
  } catch (err) {
    console.error("Could not load auth state", err);
    return { isAuthenticated: false };
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
    login: (state) => {
      state.isAuthenticated = true;
      saveAuthState(state);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      saveAuthState(state);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
