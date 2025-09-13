import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../baseurl/BaseUrl";

export default function CreateCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  // const axiosInstance = axios.create({
  //   baseURL: "/api",
  // });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/category/create-category`,
        {
          name,
          description,
        }
      );

      console.log("Category created:", response.data);

      navigate("/");
    } catch (error) {
      console.error("Error in create-category:", error.message);
    }

    setName("");
    setDescription("");
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Category</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Name */}
        <div>
          <label className="block font-medium mb-1">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
        </div>

        {/* Category Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter category description (optional)"
            className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-cyan-400"
            rows={2}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-500 text-white py-2 rounded-md transition">
          Create Category
        </button>
      </form>
    </div>
  );
}
