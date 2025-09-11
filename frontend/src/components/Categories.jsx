import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BlogList from "./BlogList";

export default function Categories() {
  const [categories, setcategory] = useState([]);

  const { id } = useParams();

  const PORT = "http://localhost:5000/api/";

  const fetchcategory = async () => {
    const response = await axios.get(`${PORT}blog/category/${id}`);
    setcategory(response.data);
  };

  useEffect(() => {
    fetchcategory();
  }, []);

  if (categories.length > 0) {
    <p className="text-3xl text-black">blog not found</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-5">
      {/* Left Section - category List */}

      <div className="w-full md:w-[70%]">
        <h1 className="text-3xl font-bold mb-6">{categories.name}</h1>
        {categories.map((blog) => (
          <BlogList key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
