import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<ProductList msg="Product List" />} />
          <Route path="/cart" element={<Cart msg="Cart Items" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
