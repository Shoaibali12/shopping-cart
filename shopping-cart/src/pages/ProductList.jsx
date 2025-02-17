import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import Navbar from "../components/Navbar";
import axios from "axios";

function ProductList() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/all"
        );
        setProducts(response.data);

        // Extract unique categories from real products
        const uniqueCategories = [
          "all",
          ...new Set(response.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("🚨 Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="">
      <div className="mb-8">
        <Navbar msg="Product List" />
      </div>

      <div className="mb-6 ml-8">
        <p className="font-semibold">Select Category</p>
        <select
          className="px-4 py-2 border rounded-md"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className="text-center text-gray-600">Loading products...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {filteredProducts.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500">No products available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
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
