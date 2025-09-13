import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BlogList from "./BlogList";
import { API_BASE_URL } from "../baseurl/BaseUrl";

export default function Categories() {
  const [categories, setcategory] = useState([]);

  const { id } = useParams();

  // const axiosInstance = axios.create({
  //   baseURL: "/api",
  // });

  const fetchcategory = async () => {
    const response = await axios.get(`${API_BASE_URL}/blog/category/${id}`);
    setcategory(response.data);
  };

  useEffect(() => {
    fetchcategory();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-5">
      {/* Left Section - category List */}

      <div className="w-full md:w-[70%]">
        <h1 className="text-3xl font-bold mb-6">{categories.name}</h1>
        {categories.length === 0 && (
          <p className="text-center py-10 text-2xl w-full">Empty Blog!</p>
        )}

        {categories.map((blog) => (
          <BlogList key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
