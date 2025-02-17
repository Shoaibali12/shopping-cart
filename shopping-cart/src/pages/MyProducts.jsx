import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold text-center text-purple-700">
        📦 My Products
      </h2>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {products.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500">No products found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-md">
            <img
              src={`http://localhost:5000/uploads/${product.image}`}
              alt={product.title}
              className="w-full h-40 object-cover rounded-md"
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
  );
};

export default MyProducts;
