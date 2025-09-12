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
          `http://localhost:5000/api/blog/search?query=${query}`
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
      <div className="p-3 sticky top-0 bgcolor text-white shadow-md hidden md:block">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-5 ml-2">
            <Link to="/">
              <img
                src={blog}
                alt="logo"
                className="h-10 w-[50px] bg-white rounded-lg p-1"
              />
            </Link>
            <div className="relative w-full max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search blogs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                className="px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-cyan-400 w-full"
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

          {/* Right: Actions + Profile */}
          <div className="flex items-center gap-4">
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

            <button className="flex items-center gap-2 hover:text-red-400 transition">
              <MdOutlineLogout size={20} />
              Logout
            </button>

            <img
              src={profileimg}
              alt="profile"
              className="h-8 w-8 rounded-full border border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Mobile Header - Top Bar */}
      <div className="p-3 block md:hidden bgcolor text-white shadow-md">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img
              src={blog}
              alt="logo"
              className="h-8 w-[40px] bg-white rounded-lg p-1"
            />
          </Link>

          <input
            type="text"
            placeholder="Search..."
            className="px-2 py-1 rounded-md text-black outline-none w-32 caret-cyan-400"
          />

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-red-100 transition">
              <MdOutlineLogout size={20} className="text-red-500" />
            </button>

            <img
              src={profileimg}
              alt="profile"
              className="h-8 w-8 rounded-full border border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Mobile Header - Action Buttons */}
      <div className="sticky top-0 bgcolor p-2 block md:hidden shadow-md">
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
