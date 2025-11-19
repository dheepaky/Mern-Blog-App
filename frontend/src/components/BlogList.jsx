import { Link } from "react-router-dom";
import profileimg from "../../src/assets/avatar-placeholder.png";

export default function BlogList({ blog }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-6 shadow-sm bg-white create-page">
      <div className="flex flex-wrap items-center gap-2">
        <img
          src={blog.author?.profileImg || profileimg}
          alt="profile"
          className="h-8 w-8 md:h-12 md:w-12 rounded-full hover:scale-95  active:scale-95   cursor-pointer"
        />
        <h2 className="text-[17px] font-semibold mb-2 text-gray-700">
          @{blog.author?.userName}
        </h2>
      </div>

      <h2
        className="text-[17px] md:text-[22px] font-semibold mb-5 mt-5 bg-gradient-to-r from-cyan-700 via-cyan-600 to-cyan-700 
bg-clip-text text-transparent tracking-normal drop-shadow-lg 
hover:tracking-[0.2px] transition-all duration-300">
        {blog.title.toUpperCase()}
      </h2>
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

      <div className="mt-4 text-[#200028] font-semibold">
        <div
          dangerouslySetInnerHTML={{
            __html:
              blog.content.length > 100
                ? blog.content.substr(0, 200) + "..."
                : blog.content,
          }}
        />
      </div>
      {/* <div>
        {blog.content.length > 100
          ? blog.content.substr(0, 100) + "..."
          : blog.content}
      </div> */}

      <Link to={`/blog/${blog.slug}`}>
        <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 border-0 focus:0 text-white p-2 my-5 rounded-md cursor-pointer ">
          Read More
        </button>
      </Link>

      <h2 className="text-[12px] font-semibold mb-3 text-gray-600">
        Last Updated:{" "}
        {new Date(blog.updatedAt).toLocaleString("en-US", {
          dateStyle: "long",
        })}{" "}
        |{" "}
        {new Date(blog.updatedAt).toLocaleString("en-US", {
          timeStyle: "short",
        })}
      </h2>
    </div>
  );
}
