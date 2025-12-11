import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          {`<Portfolio />`}
        </Link>
        <div className="flex gap-6 items-center">
          <a href="/#projects" className="text-darkText hover:text-blue-600 transition">
            Projects
          </a>
          <a href="/#about" className="text-darkText hover:text-blue-600 transition">
            About
          </a>
          <a href="/#contact" className="text-darkText hover:text-blue-600 transition">
            Contact
          </a>
          {token ? (
            <>
              <Link to="/admin" className="text-darkText hover:text-blue-600 transition">
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
