import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BlogList from "./BlogList";

export default function Blog() {
  const [blogs, setblogs] = useState([]);
  const [categories, setcategory] = useState([]);
  const [categoriespost, setcategorypost] = useState([]);

  const { id } = useParams();

  const axiosInstance = axios.create({
    baseURL: "/api",
  });

  const fetchblog = async () => {
    const response = await axiosInstance.get(`blog/blogs`);
    setblogs(response.data);
  };
  const fetchcategory = async () => {
    const response = await axiosInstance.get(`category/categories`);
    setcategory(response.data);
  };

  useEffect(() => {
    fetchblog();
    fetchcategory();
  }, []);

  if (blogs.length > 0) {
    <p className="text-3xl text-black">blog not found</p>;
  }

  if (!blogs) {
    return <p>Loading...</p>;
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
        {categories.map((category) => (
          <>
            <ul className="space-y-3 ">
              <li className="bg-gray-100 p-3 text-center rounded-md hover:bg-gray-200 cursor-pointer">
                <Link to={`/category/${category._id}`}>{category.name}</Link>
              </li>
            </ul>
          </>
        ))}
      </div>
    </div>
  );
}
