import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import BlogList from "./BlogList";
import { API_BASE_URL } from "../baseurl/BaseUrl";
import BlogSkeleton from "../pages/BlogSkeleton";

export default function Categories() {
  const [categories, setcategory] = useState([]);

  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  const { id } = useParams();
  const { slug } = useParams();

  // const axiosInstance = axios.create({
  //   baseURL: "/api",
  // });

  const fetchcategory = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const response = await axios.get(`${API_BASE_URL}/blog/category/${slug}`);
      setcategory(response.data);
    } catch (error) {
      console.error("error in category fetch", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryList = async () => {
    const response = await axios.get(`${API_BASE_URL}/category/categories`);
    setCategoryList(response.data);
  };

  useEffect(() => {
    fetchcategory(); // Refetches when category ID changes
  }, [slug]);

  useEffect(() => {
    fetchCategoryList(); // Loads all categories once
  }, []);

  if (loading) return <BlogSkeleton />;

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 p-5 create-page">
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

        <div className="w-full md:w-[30%]">
          <h1 className="text-center text-2xl font-bold mb-4">Categories</h1>

          <ul className="space-y-3 gap-5">
            {categoryList.map((category) => (
              <li key={category._id}>
                <NavLink
                  to={`/category/${category.slug}`}
                  className={({ isActive }) =>
                    ` block p-3 text-center font-semibold bg-gradient-to-r from-cyan-700 via-cyan-600 to-cyan-700 
bg-clip-text text-transparent tracking-normal drop-shadow-lg 
hover:tracking-[0.2px]  py-4 rounded-md cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "bg-gray-300  scale-105 font-semibold"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`
                  }>
                  {category.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
