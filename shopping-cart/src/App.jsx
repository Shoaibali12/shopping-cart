import React from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import store from "./store/store";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";

// Private Route Component
const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/signin" replace />;
};

// Public Route Component (prevents logged-in users from accessing signin/signup)
const PublicRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to="/" replace /> : element;
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/signup"
            element={<PublicRoute element={<Signup />} />}
          />
          <Route
            path="/signin"
            element={<PublicRoute element={<Signin />} />}
          />

          {/* Private Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute element={<ProductList msg="Product List" />} />
            }
          />
          <Route
            path="/cart"
            element={<PrivateRoute element={<Cart msg="Cart Items" />} />}
          />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
