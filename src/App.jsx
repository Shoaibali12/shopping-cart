import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";

function App() {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Redux Shopping Cart</h1>
        <ProductList />
        <Cart />
      </div>
    </Provider>
  );
}

export default App;
