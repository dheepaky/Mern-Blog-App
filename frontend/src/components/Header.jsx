import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  MdOutlineLogout,
  MdPostAdd,
  MdCategory,
  MdOutlineHome,
} from "react-icons/md";

import blogLogo from "../../src/assets/blog.png";
import profileimg from "../../src/assets/avatar-placeholder.png";
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

    const delay = setTimeout(fetchData, 300); // debounce
    return () => clearTimeout(delay);
  }, [query]);

  return (
    <>
      {/* ========== Desktop Header ========== */}
      <header className="p-3 sticky transition-all top-0 z-50 bg-gray-800 text-white shadow-md">
        <div className="flex items-center justify-between">
          {/* === Left: Logo + Search === */}
          <div className="flex items-center gap-5">
            <Link to="/">
              <img
                src={blogLogo}
                alt="logo"
                className="h-10 w-12 bg-white rounded-md p-1"
              />
            </Link>

            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => query && setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                placeholder="Search Blogs..."
                className="w-full px-4 py-2 text-sm md:text-base bg-gray-800 text-white rounded-md focus:ring focus:ring-cyan-500 outline-none"
              />

              {/* Dropdown Results */}
              {showDropdown && (
                <div className="absolute left-0 right-0 bg-white text-black mt-1 rounded-md shadow-lg overflow-hidden z-50">
                  {results.length > 0 ? (
                    results.map((blog) => (
                      <Link
                        key={blog._id}
                        to={`/blog/${blog._id}`}
                        className="block px-4 py-2 hover:bg-gray-100 transition">
                        {blog.title}
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-gray-500">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* === Center Nav === */}
          <nav className="hidden md:block">
            <ul className="flex gap-10 text-sm ">
              {["Home", "About", "Contact"].map((item) => (
                <li key={item}>
                  <NavLink
                    to={`/${
                      item.toLowerCase() === "home" ? "" : item.toLowerCase()
                    }`}
                    className={({ isActive }) =>
                      isActive
                        ? "border-b-2  border-cyan-400  underline-offset-8 scale-125 transition-all  font-semibold"
                        : "hover:scale-50 hover:text-cyan-400 transition-transform duration-300"
                    }>
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* === Right: Actions === */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 text-sm">
              <Link
                to="/create-blog"
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border hover:border-cyan-400 transition">
                <MdPostAdd size={20} />
                Create Blog
              </Link>

              <Link
                to="/create-category"
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border hover:border-cyan-400 transition">
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
              className="h-8 w-8 rounded-full border border-gray-300"
            />
          </div>
        </div>
      </header>

      {/* ========== Mobile Header ========== */}
      <div className="sticky top-0 z-40 bg-black text-white p-4 md:hidden shadow-md">
        <div className="flex justify-around text-xs">
          <Link
            to="/create-blog"
            className="flex items-center gap-1 px-2 py-1 border rounded-md hover:border-cyan-400">
            <MdPostAdd size={15} />
            Blog
          </Link>

          <Link
            to="/"
            className="flex items-center gap-1 px-2 py-1 border-b-2 border-transparent hover:border-cyan-400">
            <MdOutlineHome size={15} />
            Home
          </Link>

          <Link
            to="/create-category"
            className="flex items-center gap-1 px-2 py-1 border rounded-md hover:border-cyan-400">
            <MdCategory size={15} />
            Category
          </Link>
        </div>
      </div>
    </>
  );
}
