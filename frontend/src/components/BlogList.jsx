import { Link } from "react-router-dom";

export default function BlogList({ blog }) {
  const API_BASE_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : window.location.origin;

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-6 shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-5">{blog.title}</h2>
      <div className=" flex justify-center">
        <img
          src={`${API_BASE_URL}${blog.img}`}
          alt="blog image"
          className="w-fit h-80 object-contain rounded-md mb-3 "
        />
      </div>

      <p className="text-gray-700">
        {blog.content.length > 100
          ? blog.content.substr(0, 100) + "..."
          : blog.content}
      </p>
      <Link to={`/blog/${blog._id}`}>
        <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 border-0 focus:0 text-white p-2 my-5 rounded-md cursor-pointer ">
          Read More
        </button>
      </Link>
    </div>
  );
}
