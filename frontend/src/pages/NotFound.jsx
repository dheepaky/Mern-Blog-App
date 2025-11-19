export default function NotFound() {
  return (
    <div className="flex flex-col items-center  min-h-screen text-center">
      <h5 className="text-2xl mt-5 mb-3 text-[#1ac1c9] font-bold">404</h5>
      <h2 className="text-3xl mb-3 font-bold">Page Not Found</h2>
      <p className="text-lg mb-5 font-medium">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <img src="404-error.png" alt="404-error" className="md:h-70 h-40" />
      <a
        href="/"
        className="text-white mt-5 bg-[#1ac1c9] p-3 rounded-lg font-medium hover:opacity-80 active:opacity-70">
        Back to Homepage
      </a>
    </div>
  );
}
