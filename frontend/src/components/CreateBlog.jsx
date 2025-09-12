import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [categories, setcategory] = useState([]);
  const [title, setTitle] = useState("");
  const [img, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const axiosInstance = axios.create({
    baseURL: "/api",
  });
  const navigate = useNavigate();
  const fetchcategory = async () => {
    const response = await axiosInstance.get(`category/categories`);
    setcategory(response.data);
  };

  useEffect(() => {
    fetchcategory();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    if (img) {
      formData.append("img", img);
    }
    try {
      const response = await axiosInstance.post(`blog/create-blog`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Blog created:", response.data);
      navigate("/");
    } catch (error) {
      console.error("error in Createblog", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Create New Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Blog Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
            required>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Blog Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-fit border border-black "
          />
        </div>

        {/* Content */}
        <div>
          <label className="block mb-1 font-medium">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content here..."
            className="w-full border rounded-md px-3 py-2 h-40 outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition">
          Publish Blog
        </button>
      </form>
    </div>
  );
}
