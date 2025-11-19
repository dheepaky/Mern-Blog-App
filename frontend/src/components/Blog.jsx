import axios from "axios";
import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import BlogList from "./BlogList";
import { API_BASE_URL } from "../baseurl/BaseUrl";
import BlogSkeleton from "../pages/BlogSkeleton";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { getAuthUser } from "../api/Auth";
import { useQuery } from "@tanstack/react-query";

import { Helmet } from "react-helmet-async";

export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  const fetchBlogs = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100)); // Simulated loading
      const response = await axios.get(`${API_BASE_URL}/blog/blogs`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category/categories`);
      setCategories(response.data.filter(Boolean)); // remove undefined
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryDelete = async (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/category/${categoryId}`, {
        withCredentials: true,
      });
      toast.success("Category Deleted");

      // Remove deleted category from state
      setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  if (loading) return <BlogSkeleton />;

  if (!blogs || blogs.length === 0) {
    return <p className="text-3xl text-black text-center">Blog not found</p>;
  }

  const userId = authUser?.user?._id;
  const isAuthenticated = authUser;

  return (
    <>
      <Helmet>
        <title>Blog WebApp</title>
        <meta name="description" content="MERN Blog WebApp" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="flex flex-col md:flex-row gap-6 p-5 page">
        {/* Left Section - Blog List */}
        <div className="w-full md:w-[70%]">
          <h1 className="text-3xl font-bold mb-6">Recent Blogs</h1>
          {blogs.map((blog) => (
            <BlogList key={blog._id} blog={blog} />
          ))}
        </div>

        {/* Right Section - Categories */}
        <div className="w-full md:w-[30%]">
          <h1 className="text-center text-2xl font-bold mb-4">Categories</h1>
          <ul className="space-y-3 gap-5">
            {categories.map((category) => {
              const isMyCategory =
                isAuthenticated && category.author?._id === userId;

              return (
                <div className="bg-gray-100 p-3 flex justify-center items-center gap-10 text-center py-4 rounded-md hover:bg-gray-200 cursor-pointer">
                  <NavLink
                    to={`/category/${category.slug}`}
                    key={category._id}
                    className="block p-3 text-center font-semibold bg-gradient-to-r from-cyan-700 via-cyan-600 to-cyan-700 
bg-clip-text text-transparent tracking-normal drop-shadow-lg 
hover:tracking-[0.2px]  py-4 rounded-md cursor-pointer transition-all duration-300">
                    {category.name}
                  </NavLink>
                  {isMyCategory && (
                    <button
                      onClick={() => handleCategoryDelete(category._id)}
                      className="ml-3 cursor-pointer hover:scale-110 hover:text-cyan-600 p-2 rounded-full hover:bg-red-500 active:bg-red-400 bg-red-600">
                      <MdDeleteOutline size={20} className="text-white" />
                    </button>
                  )}
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
