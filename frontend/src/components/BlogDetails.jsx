import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContentView from "./ContentView";
import { API_BASE_URL } from "../baseurl/BaseUrl";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogDetailSkeleton from "../pages/BlogDetailSkeleton";

export default function BlogDetails() {
  const [loading, setLoading] = useState(true);
  const [blog, setblog] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  // const axiosInstance = axios.create({
  //   baseURL: "/api",
  // });

  const fetchblog = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.get(`${API_BASE_URL}/blog/blogs/${id}`);
      setblog(response.data);
    } catch (error) {
      console.error("error in blog fetch", error);
    } finally {
      setLoading(false);
    }
  };
  const handledelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${API_BASE_URL}/blog/blogs/${id}`);
      setblog(null);
      toast("Blog Deleted");
      navigate("/");
    } catch (error) {
      console.error("error in blog fetch", error);
    }
  };

  useEffect(() => {
    fetchblog();
  }, []);

  if (loading) return <BlogDetailSkeleton />;

  if (!blog || blog.length === 0) {
    return <p className="text-3xl text-black text-center">Blog not found</p>;
  }

  const formattedDate = Intl.DateTimeFormat("en-Us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(blog.createdAt));

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 p-5">
        {/* Left Section - Blog List */}

        <div className="w-full md:w-[70%]">
          <div className="border border-gray-300 rounded-lg p-4 mb-6 shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-5">
              {blog.title.toUpperCase()}
            </h2>
            <h4>{formattedDate}</h4>
            <button onClick={handledelete}>Delete</button>
            <ToastContainer />
            <div className=" flex justify-center">
              {blog.img ? (
                <img
                  // src={`${API_BASE_URL}${blog.img}`}
                  src={blog.img}
                  alt="blog image"
                  className="w-fit h-80 object-contain rounded-md mb-3 "
                />
              ) : null}
            </div>

            <div className="prose">
              {/* Add 'prose' class for basic typography */}
              <ContentView content={blog.content} />
            </div>
          </div>
        </div>

        <div className="w-full md:w-[30%] ">
          <h1 className="text-center text-2xl font-bold mb-4 md:sticky bg-white top-16 p-2">
            Suggestions
          </h1>

          <div className=" flex justify-center">
            {blog.img ? (
              <img
                // src={`${API_BASE_URL}${blog.img}`}
                src={blog.img}
                alt="blog image"
                className="w-fit h-80 object-contain rounded-md mb-3 "
              />
            ) : null}
          </div>

          <div className="prose">
            {/* Add 'prose' class for basic typography */}
            <ContentView content={blog.content} />
          </div>
        </div>
      </div>
    </>
  );
}
