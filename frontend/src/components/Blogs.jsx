export default function Blogs() {
  const blog =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo incidunt repellat inventore temporibus vitae blanditiis.lo";
  return (
    <div className="flex flex-col md:flex-row gap-6 p-5">
      {/* Left Section - Blog List */}
      <div className="w-full md:w-[70%]">
        <h1 className="text-3xl font-bold mb-6">Recent Blogs</h1>

        {/* Blog Card */}
        <div className="border border-gray-300 rounded-lg p-4 mb-6 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-5">Blog Title</h2>
          <img
            src="https://via.placeholder.com/600x300"
            alt="blog"
            className="w-full h-48 object-cover rounded-md mb-3"
          />

          <p className="text-gray-700">
            {blog.length > 100 ? blog.substr(0, 100) + "..." : blog}
          </p>
        </div>
        <div className="border border-gray-300 rounded-lg p-4 mb-6 shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-5">Blog Title</h2>
          <img
            src="https://via.placeholder.com/600x300"
            alt="blog"
            className="w-full h-48 object-cover rounded-md mb-3"
          />

          <p className="text-gray-700">
            {blog.length > 100 ? blog.substr(0, 100) + "..." : blog}
          </p>
        </div>
      </div>

      {/* Right Section - Categories */}
      <div className="w-full md:w-[30%]">
        <h1 className="text-center text-2xl font-bold mb-4">Categories</h1>
        <ul className="space-y-3">
          <li className="bg-gray-100 p-3 rounded-md hover:bg-gray-200 cursor-pointer">
            Technology
          </li>
        </ul>
      </div>
    </div>
  );
}
