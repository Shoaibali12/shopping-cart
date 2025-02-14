import { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return setError("Please upload an image");

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("image", formData.image);

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        "http://localhost:5000/api/products/add",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Product added successfully!");
      setFormData({
        title: "",
        price: "",
        description: "",
        category: "",
        image: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg border border-gray-300">
        <h2 className="text-2xl font-bold text-center text-purple-700">
          🛍️ Add New Product
        </h2>
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-gray-700">Product Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Living</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Product Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-400"
              accept="image/*"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 transition"
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
