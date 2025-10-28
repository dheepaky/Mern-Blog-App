import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { API_BASE_URL } from "../baseurl/BaseUrl";
import { toast } from "react-toastify";
export default function CreateBlog() {
  const [categories, setcategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [img, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  // const [preview, setPreview] = useState("");

  // const axiosInstance = axios.create({
  //   baseURL: "/api",
  // });
  const navigate = useNavigate();

  const fetchcategory = async () => {
    const response = await axios.get(`${API_BASE_URL}/category/categories`, {
      withCredentials: true,
    });
    setcategory(response.data);
  };

  useEffect(() => {
    fetchcategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // if (!preview) return;
    try {
      const response = await axios.post(
        `${API_BASE_URL}/blog/create-blog`,
        {
          title,
          category,
          content,
          img: img,
        },
        {
          withCredentials: true,
        }
      );
      // console.log("Blog created:", response.data);
      setTimeout(() => {
        toast.success("Blog Created Successfully");
        navigate("/");
      }, 200);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.error("error in Createblog", error);
    }
    // console.log(img);
  };
  const handlefileupload = (e) => {
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Create New Blog
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          className="w-full border rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
          required
        />
        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-md px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
          required>
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Image */}
        <div className="flex items-center space-x-4">
          <input
            type="file"
            accept="image/*"
            onChange={handlefileupload}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors duration-200"
          />
          {img && <img src={img} alt="Preview" className="h-20 rounded-md" />}
        </div>

        {/* Content */}
        {/* <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog content here..."
          className="w-full border rounded-md px-3 py-2 h-40"
          required
        /> */}

        <ReactQuill theme="snow" value={content} onChange={setContent} />
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md">
          {loading ? "Publish Blog...." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
