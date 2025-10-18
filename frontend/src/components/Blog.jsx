import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BlogList from "./BlogList";
import { API_BASE_URL } from "../baseurl/BaseUrl";
import BlogSkeleton from "../pages/BlogSkeleton";

export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [blogs, setblogs] = useState([]);
  const [categories, setcategory] = useState([]);
  const [categoriespost, setcategorypost] = useState([]);

  const { id } = useParams();

  // const axiosInstance = axios.create({
  //   baseURL: "/api",
  // });

  const fetchblog = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.get(`${API_BASE_URL}/blog/blogs`);
      setblogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchcategory = async () => {
    const response = await axios.get(`${API_BASE_URL}/category/categories`);
    setcategory(response.data);
  };

  useEffect(() => {
    fetchblog();
    fetchcategory();
  }, []);

  if (loading) return <BlogSkeleton />;

  if (!blogs || blogs.length === 0) {
    return <p className="text-3xl text-black text-center">Blog not found</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-5">
      {/* Left Section - Blog List */}

      <div className="w-full md:w-[70%]">
        <h1 className="text-3xl font-bold mb-6">Recent Blogs</h1>
        {blogs.map((blog) => (
          <BlogList key={blog._id} blog={blog} />
        ))}
      </div>
      <div className="w-full md:w-[30%]">
        <h1 className="text-center text-2xl font-bold mb-4">Categories</h1>

        <ul className="space-y-3 gap-5">
          {categories.map((category) => (
            <li
              key={category._id}
              className="bg-gray-100 p-3  text-center py-4 rounded-md hover:bg-gray-200 cursor-pointer">
              <Link to={`/category/${category._id}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
