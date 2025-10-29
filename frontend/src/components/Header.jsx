import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  MdOutlineLogin,
  MdSearch,
  MdEdit,
  MdClose,
  MdHome,
  MdInfo,
  MdLogin,
} from "react-icons/md";
import { BiEnvelope } from "react-icons/bi";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import blogLogo from "../../src/assets/blog.png";
import profileimg from "../../src/assets/avatar-placeholder.png";
import { API_BASE_URL } from "../baseurl/BaseUrl";
import { getAuthUser } from "../api/Auth";

export default function Header() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);

  const menuRef = useRef();
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const navItems = [
    { name: "Home", icon: <MdHome size={24} />, path: "/" },
    { name: "About", icon: <MdInfo size={24} />, path: "/about" },
    { name: "Contact", icon: <BiEnvelope size={24} />, path: "/contact" },
  ];

  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

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

    const delay = setTimeout(fetchData, 300);
    return () => clearTimeout(delay);
  }, [query]);

  // === Close search when clicking outside ===
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // === Logout Mutation ===
  const { mutate: logout, isPending } = useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.invalidateQueries(["authUser"]);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Logout failed. Try again.");
    },
  });

  // === Image Upload Logic ===
  const handleIconClick = () => fileInputRef.current.click();

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleProfile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const base64 = await convertToBase64(file);
      const res = await axios.put(
        `${API_BASE_URL}/auth/updateprofile/${authUser?.user?._id}`,
        { profileImg: base64 },
        { withCredentials: true }
      );

      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries(["authUser"]); // Refresh user data
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed!");
      console.error("Profile upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="relative p-3 md:px-5 sticky top-0 bg-gray-800 text-white shadow-md z-50">
        <div className="flex items-center justify-between">
          {/* === Left: Logo + Search === */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={blogLogo}
                alt="logo"
                className="md:h-10 h-8 md:w-12 w-8 bg-white rounded-md p-1"
              />
              <h2 className="text-[#1ac1c9] font-bold">BLOG</h2>
            </Link>

            {/* Mobile search icon */}
            <div className="flex gap-3 items-center">
              <div
                className="md:hidden block p-1 cursor-pointer ml-3"
                onClick={() => setShowSearch(true)}>
                <MdSearch
                  className="hover:text-cyan-400 text-gray-400"
                  size={22}
                />
              </div>

              <div className="md:hidden block">
                <ul className="flex gap-3 text-sm ">
                  {navItems.map((item) => (
                    <li key={item.name} className="text-gray-400">
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          isActive
                            ? "border-b-2 border-cyan-400 scale-105 transition-normal text-cyan-500 "
                            : "hover:scale-95 hover:text-cyan-400 transition-transform duration-300"
                        }>
                        {item.icon}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Desktop search */}
            <div className="flex items-center   ">
              <div className="relative  hidden md:block  ">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => query && setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  placeholder="🔎 Search Blogs..."
                  className="max-w-md  px-3  py-2 text-base bg-gray-800 text-white rounded-md focus:ring-2 focus:ring-cyan-500 outline-none"
                />
                {showDropdown && (
                  <div className="absolute left-0 right-0 bg-white text-black mt-1 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                    {results.length > 0 ? (
                      results.map((blog) => (
                        <Link
                          key={blog._id}
                          to={`/blog/${blog._id}`}
                          className="block px-4 py-2 truncate hover:bg-cyan-100 transition">
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

            {/*  */}
          </div>

          {/* === Center Nav === */}
          <div className="flex justify-center ">
            <nav className="hidden md:block">
              <ul className="flex md:gap-5 text-sm">
                {navItems.map((item) => (
                  <li key={item.name} className="text-gray-400 flex">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        isActive
                          ? "border-b border-cyan-400 scale-105 text-cyan-500"
                          : "hover:scale-95 hover:text-cyan-400 transition"
                      }>
                      <div className="flex items-center gap-0.5 p-1">
                        {item.icon}
                        {item.name}
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* === Right: Profile & Logout === */}
          {authUser ? (
            <div className="flex items-center md:gap-5 gap-2">
              <span className=" overflow-hidden truncate text-sm sm:text-base md:text-[16px] text-cyan-100 font-semibold">
                {authUser?.user?.userName.toUpperCase()}
              </span>
              <div className="relative">
                <img
                  src={authUser?.user?.profileImg || profileimg}
                  alt="profile"
                  onClick={() => setOpen(!open)}
                  className="h-9 w-9 md:h-12 md:w-12 rounded-full hover:scale-95  active:scale-95   cursor-pointer"
                />

                {open && (
                  <ul
                    className="absolute right-0 mt-2 rounded-lg w-40 dropdown bg-white shadow-lg border border-gray-300 text-sm text-gray-700 z-50"
                    onMouseLeave={() => setOpen(false)}>
                    <li className="px-4 py-4 text-center font-bold ">
                      Profile
                    </li>
                    <li className="px-4 py-3 font-semibold">
                      Hi, {authUser?.user?.userName}
                    </li>
                    <li className="px-4 py-3 hover:bg-cyan-100 flex justify-between items-center cursor-pointer">
                      <span>Picture</span>
                      <div className="flex items-center gap-3">
                        {loading ? (
                          <span className="text-sm text-gray-500">
                            Uploading...
                          </span>
                        ) : (
                          <MdEdit
                            size={20}
                            onClick={handleIconClick}
                            className="cursor-pointer text-cyan-700 hover:text-cyan-900 transition"
                          />
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleProfile}
                          className="hidden"
                        />
                      </div>
                    </li>
                    <li
                      className="px-4 py-3 hover:bg-red-100 text-red-600 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                      }}>
                      Logout
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center md:gap-5 gap-2">
              <div className="">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${
                      isActive
                        ? " scale-105 transition-normal text-cyan-500 "
                        : "hover:scale-95 hover:text-cyan-400 transition-transform text-gray-400 duration-300"
                    }`
                  }>
                  <MdLogin size={18} />
                  <span className="text-lg md:block hidden">Login</span>
                </NavLink>
              </div>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `bg-blue-600 md:text-[15px] text-[10px] md:px-3 md:py-1 px-2 py-1 rounded-[10px] text-white  transition-all ${
                    isActive
                      ? " bg-blue-500 scale-105 transition-normal text-cyan-500"
                      : "hover:scale-95 hover:text-cyan-300 transition-transform text-gray-400 duration-300"
                  }`
                }>
                Get Started
              </NavLink>
            </div>
          )}
        </div>
        {/* === Mobile Search === */}
        {showSearch && (
          <div
            ref={menuRef}
            className="absolute top-0 left-0 w-full h-full md:hidden bg-gray-800 flex items-center px-3 z-50 transition-all duration-300">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query && setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              placeholder="🔎 Search Blogs..."
              className="flex-1 py-2 px-4 text-base bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-cyan-500 outline-none"
            />
            <button
              onClick={() => setShowSearch(false)}
              className="ml-2 text-gray-300 hover:text-cyan-400">
              <MdClose size={22} />
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white text-black mt-1 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
                {results.length > 0 ? (
                  results.map((blog) => (
                    <Link
                      key={blog._id}
                      to={`/blog/${blog._id}`}
                      className="block px-4 py-2 truncate hover:bg-cyan-100 transition"
                      onClick={() => setShowSearch(false)}>
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
        )}
      </header>
    </>
  );
}
