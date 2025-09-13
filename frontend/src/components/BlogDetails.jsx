import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentView from "./ContentView";
import { API_BASE_URL } from "../baseurl/BaseUrl";

export default function BlogDetails() {
  const [blog, setblog] = useState(null);
  const { id } = useParams();

  // const axiosInstance = axios.create({
  //   baseURL: "/api",
  // });

  const fetchblog = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/blog/blogs/${id}`);
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
    </>
  );
}
