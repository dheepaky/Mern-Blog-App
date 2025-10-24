import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import CreateCategory from "./components/CreateCategory";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ScrollToTop from "./pages/ScrollToTop";
import BlogDetails from "./components/BlogDetails";
import Categories from "./components/Categories";
import SearchResults from "./pages/SearchResults";

import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/joy/CircularProgress";

import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import OpenIconSpeedDial from "./components/OpenIconSpeedDial";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        toast.error(error.message);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <CircularProgress variant="soft" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />

      <Router>
        <Header />
        <ScrollToTop />
        <OpenIconSpeedDial />
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/category/:id" element={<Categories />} />
          <Route path="/search/:query" element={<SearchResults />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          {/* auth */}
          <Route
            path="/create-blog"
            element={authUser ? <CreateBlog /> : <Navigate to="/login" />}
          />

          <Route
            path="/create-category"
            element={authUser ? <CreateCategory /> : <Navigate to="/login" />}
          />

          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
