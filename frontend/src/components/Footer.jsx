import { MdOutlineHome, MdOutlineInfo, MdOutlineEmail } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="flex  justify-center items-center gap-6 p-5 border-t border-gray-300 mt-10">
        <div className="flex justify-between gap-10 mt-10 text-cyan-900 ">
          <Link
            to="/about"
            className="scroll-smooth p-2 flex items-center gap-1 cursor-pointer border-b-2 border-transparent hover:border-cyan-400 transition-colors duration-300">
            <MdOutlineInfo size={18} />
            About
          </Link>
          <Link
            to="/home"
            className="flex items-center gap-1 cursor-pointer border-b-2 border-transparent hover:border-cyan-400 transition-colors duration-300">
            <MdOutlineHome size={18} />
            Home
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-1 cursor-pointer border-b-2 border-transparent hover:border-cyan-400 transition-colors duration-300">
            <MdOutlineEmail size={18} />
            Contact Us
          </Link>
        </div>
      </div>

      <div className="text-center bg-gray-300 text-gray-600 py-4 w-full">
        &copy; Designed & Developed By{" "}
        <span className="font-semibold">Deepak Y</span>
      </div>
    </>
  );
}
