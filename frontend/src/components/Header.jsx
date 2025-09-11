import { Link } from "react-router-dom";
import blog from "../../src/assets/blog.png";
import profileimg from "../../src/assets/avatar-placeholder.png";
import {
  MdOutlineLogout,
  MdPostAdd,
  MdCategory,
  MdOutlineHome,
} from "react-icons/md";

export default function Header() {
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
            <input
              type="text"
              placeholder="Search Blogs..."
              className="px-3 py-1 rounded-md text-green-200 outline-none w-60 caret-cyan-400"
            />
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
