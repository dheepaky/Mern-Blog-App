import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetails() {
  const [blog, setblog] = useState(null);
  const { id } = useParams();

  const axiosInstance = axios.create({
    baseURL: "/api",
  });
  const API_BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : window.location.origin;

  const fetchblog = async () => {
    try {
      const response = await axiosInstance.get(`blog/blogs/${id}`);
      setblog(response.data);
    } catch (error) {
      console.error("error in blog fetch", error);
    }
  };

  useEffect(() => {
    fetchblog();
  }, []);

  if (!blog) {
    return <p>Loading...</p>;
  }
  if (blog.length === 0) {
    return <p>This page Empty</p>;
  }

  const formattedDate = Intl.DateTimeFormat("en-Us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(blog.createdAt));

  return (
    <>
      <div className="border border-gray-300 rounded-lg p-4 mb-6 shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-5">{blog.title}</h2>
        <h4>{formattedDate}</h4>

        <div className=" flex justify-center">
          <img
            src={`${API_BASE_URL}${blog.img}`}
            alt="blog image"
            className="w-fit h-80 object-contain rounded-md mb-3 "
          />
        </div>

        <p className="text-gray-700">{blog.content}</p>
      </div>
    </>
  );
}
