import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    // navigate("/cart");
  };

  return (
    <div className="text-center ">
      <div className="mb-8">
        <Navbar msg="Product" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 mx-auto mb-2 object-contain"
            />
            <span className="block font-medium">{product.title}</span>
            <span className="block text-lg font-bold">${product.price}</span>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ProductList;
