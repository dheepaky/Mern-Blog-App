import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../baseurl/BaseUrl";
import { toast } from "react-toastify";

export default function CreateCategory() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  // const axiosInstance = axios.create({
  //   baseURL: "/api",
  // });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/category/create-category`,
        {
          name,
          description,
        },
        { withCredentials: true }
      );
      // console.log("Category created:", response.data);
      setTimeout(() => {
        toast.success("Category Created Successfully");
        navigate("/");
      }, 200);
    } catch (error) {
      console.error("Error in create-category:", error.message);
    }

    setName("");
    setDescription("");
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10 pagedown">
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
          className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-500 text-white py-2 rounded-md transition">
          {loading ? "Create Category...." : "Create Category"}
        </button>
      </form>
    </div>
  );
}
