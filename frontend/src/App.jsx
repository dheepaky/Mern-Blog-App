import Blog from "./components/Blog";
import CreateBlog from "./components/CreateBlog";
import CreateCategory from "./components/CreateCategory";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ScrollToTop from "./pages/ScrollToTop";
import BlogDetails from "./components/BlogDetails";
import Categories from "./components/Categories";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <>
      <Router>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/category/:id" element={<Categories />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          {/* auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
