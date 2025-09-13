import { Link } from "react-router-dom";
import blog from "../../src/assets/blog.png";
import profileimg from "../../src/assets/avatar-placeholder.png";
import {
  MdOutlineLogout,
  MdPostAdd,
  MdCategory,
  MdOutlineHome,
} from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../baseurl/BaseUrl";

export default function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === "") {
        setResults([]);
        return;
      }
      try {
        const res = await axios.get(
          `${API_BASE_URL}/blog/search?query=${query}`
        );
        setResults(res.data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error searching blogs:", error);
      }
    };
    const delay = setTimeout(fetchData, 300); // debounce 300ms
    return () => clearTimeout(delay);
  }, [query]);
  return (
    <>
      {/* Desktop Header */}
      <div className="p-3 sticky top-0 bgcolor text-white shadow-md ">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-5 ml-2">
            <Link to="/">
              <img
                src={blog}
                alt="logo"
                className="h-8 w-[40px] md:h-10 md:w-[50px] bg-white rounded-lg p-1"
              />
            </Link>
            <div className="relative w-full max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search Blogs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="px-2 py-1 md:px-3  caret-cyan-400 text-green-100 md:py-2 focus:ring-1 focus:ring-gray-600 rounded-md outline-none   w-full"
              />

              {showDropdown && results.length > 0 && (
                <ul className="absolute bg-white text-black border rounded-md mt-1 w-full shadow-md z-10">
                  {results.map((blog) => (
                    <li key={blog._id}>
                      <Link
                        to={`/blog/${blog._id}`}
                        className="block px-3 py-2 hover:bg-gray-100">
                        {blog.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {showDropdown && query && results.length === 0 && (
                <div className="absolute bg-white border rounded-md mt-1 w-full shadow-md px-3 py-2 text-gray-500">
                  No results found
                </div>
              )}
            </div>
          </div>

          {/* Center: Navigation */}
          <div className="md:block hidden">
            <ul className="flex items-center space-x-10">
              <li>
                <Link
                  to="/"
                  className="cursor-pointer border-b-2 border-transparent hover:border-cyan-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="cursor-pointer border-b-2 border-transparent hover:border-cyan-400 transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="cursor-pointer border-b-2 border-transparent hover:border-cyan-400 transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right: Actions + Profile */}
          <div className="flex items-center gap-4">
            <div className="md:flex items-center gap-4 hidden">
              <Link
                to="/create-blog"
                className="flex items-center gap-2 border border-transparent  hover:border-cyan-400 active:bg-blue-500 px-3 py-1.5 rounded-md transition">
                <MdPostAdd size={20} />
                Create Blog
              </Link>

              <Link
                to="/create-category"
                className="flex items-center gap-2  border border-transparent  hover:border-cyan-400 active:bg-emerald-500 px-3 py-1.5 rounded-md transition">
                <MdCategory size={20} />
                Create Category
              </Link>
            </div>

            <button className="flex items-center gap-1 hover:text-red-400 transition">
              <MdOutlineLogout size={18} />
              Logout
            </button>

            <img
              src={profileimg}
              alt="profile"
              className="md:h-8 md:w-8 h-7 w-7 rounded-full border border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Mobile Header - Action Buttons */}
      <div className="sticky top-0 bgcolor p-4 block md:hidden shadow-md">
        <div className="flex justify-around text-xs text-white">
          <Link
            to="/create-blog"
            className="flex items-center gap-1 border border-transparent  hover:border-cyan-400 active:bg-blue-500 px-2 py-1 rounded-md transition">
            <MdPostAdd size={15} />
            Blog
          </Link>

          <Link
            to="/"
            className="flex items-center cursor-pointer border-b-2 border-transparent hover:border-cyan-400 transition-colors duration-300">
            <MdOutlineHome size={15} />
            Home
          </Link>

          <Link
            to="/create-category"
            className="flex items-center gap-1 border border-transparent  hover:border-cyan-400 active:bg-emerald-500 px-2 py-1 rounded-md transition">
            <MdCategory size={15} />
            Category
          </Link>
        </div>
      </div>
    </>
  );
}
