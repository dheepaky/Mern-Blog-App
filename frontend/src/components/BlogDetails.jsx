import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import ContentView from "./ContentView";
import { API_BASE_URL } from "../baseurl/BaseUrl";
import { getAuthUser } from "../api/Auth";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import BlogDetailSkeleton from "../pages/BlogDetailSkeleton";
import { useQuery } from "@tanstack/react-query";
import profileimg from "../../src/assets/avatar-placeholder.png";

import { Helmet } from "react-helmet";

export default function BlogDetails() {
  const [loading, setLoading] = useState(true);
  const [blog, setblog] = useState(null);
  const [suggestBlog, setSuggestBlog] = useState(null);
  const { id } = useParams();
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  const fetchblog = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const response = await axios.get(`${API_BASE_URL}/blog/blogs/${slug}`);
      const data = response.data;
      setblog(data.blog);
      setSuggestBlog(data.otherBlogs);
    } catch (error) {
      console.error("error in blog fetch", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchblog();
  }, [slug]);

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/blog/blogs/${blog._id}`, {
        withCredentials: true,
      });
      toast.success("Blog deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <BlogDetailSkeleton />;

  if (!blog || blog.length === 0) {
    return <p className="text-3xl text-black text-center">Blog not found</p>;
  }

  const formattedDate = Intl.DateTimeFormat("en-Us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(blog.createdAt));

  // console.log(suggestBlog.map((item) => item.title));

  const isAuthenticated = authUser;
  const isMyBlog = isAuthenticated && authUser?.user._id === blog.author?._id;

  // console.log("authUserId", authUser.user._id);
  // console.log("blogAuthorId", blog.author);
  // console.log("check", isMyBlog);
  // console.log(blog);

  return (
    <>
      <Helmet>
        <title>{blog.title} | MERN Blog App</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={blog.content?.slice(0, 150)} />

        {/* Open Graph for Facebook / WhatsApp */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.content?.slice(0, 150)} />
        <meta property="og:image" content={blog.img} />
        <meta property="og:type" content="article" />

        {/* Twitter Cards */}
        <meta name="twitter:title" content={blog.title} />
        <meta
          name="twitter:description"
          content={blog.content?.slice(0, 150)}
        />
        <meta name="twitter:image" content={blog.img} />
      </Helmet>

      <div className="flex flex-col md:flex-row gap-6 p-5 create-page ">
        {/* Left Section - Blog List */}
        <div className="w-full md:w-[70%] ">
          <div className="border border-gray-300 rounded-lg p-4 mb-6 shadow-sm bg-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <img
                src={blog.author?.profileImg || profileimg}
                alt="profile"
                className="h-8 w-8 md:h-12 md:w-12 rounded-full hover:scale-95  active:scale-95   cursor-pointer"
              />
              <h2 className="text-[17px] font-semibold mb-2 text-blue-700">
                @{blog.author?.userName}
              </h2>
            </div>

            <div className="flex items-center justify-between">
              <h1
                className="text-2xl md:text-3xl font-extrabold text-center 
bg-gradient-to-r from-cyan-700 via-cyan-600 to-cyan-700 
bg-clip-text text-transparent tracking-normal drop-shadow-lg 
hover:tracking-[1px] transition-all duration-300 mb-5">
                {blog.title}
              </h1>

              {isMyBlog && (
                <button
                  onClick={handleDelete}
                  className="cursor-pointer hover:scale-110 hover:bg-red-500 bg-red-600 active:bg-red-400 text-white p-2 mb-5 rounded-full transition"
                  title="Delete Blog">
                  <MdDeleteOutline size={20} />
                </button>
              )}
            </div>

            <h4 className="mb-5 text-[14px] md:text-[16px] text-gray-700">
              {formattedDate} |{" "}
              {new Date(blog.updatedAt).toLocaleString("en-US", {
                timeStyle: "short",
              })}
            </h4>

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

            <h2 className="prose bg-gray-50 md:text-lg text-[17px]">
              {/* Add 'prose' class for basic typography */}
              <ContentView content={blog.content} />
            </h2>
          </div>
        </div>

        {/* === Suggested Blogs Section === */}
        <div className="w-full md:w-[30%]">
          <h1 className="text-center text-2xl font-bold md:sticky top-16 bg-white p-2 border-b border-gray-200">
            Suggestions
          </h1>

          <div className="mt-4">
            {suggestBlog && suggestBlog.length > 0 ? (
              suggestBlog.map((item) => (
                <div
                  className="bg-gray-100  mb-5 p-2 page shadow-gray-300 rounded-md shadow-sm"
                  key={item._id}>
                  <div className="flex flex-wrap items-center gap-2 ">
                    <img
                      src={blog.author?.profileImg || profileimg}
                      alt="profile"
                      className="h-7 w-7 md:h-10 md:w-10 rounded-full hover:scale-95  active:scale-95   cursor-pointer"
                    />
                    <h2 className="text-[13px] font-semibold mb-2 text-gray-700">
                      @{blog.author?.userName}
                    </h2>
                  </div>
                  <NavLink
                    to={`/blog/${item.slug}`}
                    className="block hover:opacity-90 items-center flex justify-center gap-2">
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-32 h-24 object-contain rounded-md mb-2 "
                      />
                    )}
                    <div className="text-gray-800 font-medium  overflow-auto">
                      {item.title.toUpperCase()}
                    </div>
                  </NavLink>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">
                No suggestions available
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
