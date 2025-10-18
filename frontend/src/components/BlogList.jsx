import { Link } from "react-router-dom";

export default function BlogList({ blog }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-6 shadow-sm bg-white">
      <h2 className="text-xl font-semibold mb-5">{blog.title.toUpperCase()}</h2>
      <div className=" flex justify-center">
        {blog.img ? (
          <img
            // src={`${API_BASE_URL}${blog.img}`}
            src={blog.img}
            alt="blog image"
            className="w-fit h-80 object-contain rounded-md mb-3 "
          />
        ) : null}
      </div>

      <div className="mt-4">
        <div
          dangerouslySetInnerHTML={{
            __html:
              blog.content.length > 100
                ? blog.content.substr(0, 100) + "..."
                : blog.content,
          }}
        />
      </div>
      {/* <div>
        {blog.content.length > 100
          ? blog.content.substr(0, 100) + "..."
          : blog.content}
      </div> */}

      <Link to={`/blog/${blog._id}`}>
        <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 border-0 focus:0 text-white p-2 my-5 rounded-md cursor-pointer ">
          Read More
        </button>
      </Link>
    </div>
  );
}
