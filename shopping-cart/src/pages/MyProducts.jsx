import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not logged in. Redirecting...");
          setTimeout(() => navigate("/signin"), 2000);
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/products/my-products",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProducts(response.data);
      } catch (err) {
        console.error("🚨 Error fetching products:", err.response?.data || err);
        setError(
          err.response?.data?.message || "Failed to fetch your products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyProducts();
  }, [navigate]);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/products/delete/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setProducts(products.filter((product) => product._id !== productId));
      alert("✅ Product deleted successfully!");
    } catch (err) {
      console.error("🚨 Error deleting product:", err.response?.data || err);
      setError(err.response?.data?.message || "Failed to delete product.");
    }
  };

  return (
    <div>
      <Navbar msg="📦 My Products" />
      <div className="container mx-auto mt-8 p-4">
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {products.length === 0 && !loading && !error && (
          <p className="text-center text-gray-500">No products found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.title}
                className="w-36 h-36 mx-auto  object-contain"
              />
              <h3 className="text-lg font-semibold mt-2 text-center">
                {product.title}
              </h3>
              <p className="text-gray-600 text-center">${product.price}</p>
              <p className="text-sm text-gray-500 text-center">
                {product.description}
              </p>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(product._id)}
                className="mt-3 bg-red-700 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition w-full"
              >
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
