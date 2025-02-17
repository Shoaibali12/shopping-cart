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
                className="w-32 h-32 mx-auto mb-2 object-contain  "
              />
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-xs text-gray-400">
                Category: {product.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProducts;
