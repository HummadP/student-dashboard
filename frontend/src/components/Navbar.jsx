import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-full bg-[#E8F9FF] dark:bg-[#0c1a2c] border-b border-[#03045E] dark:border-[#471396] px-10 py-4 shadow-sm">
      <div className="max-w-8xl mx-auto flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 sm:w-14 sm:h-14 object-contain rounded-md shadow-md flex-shrink-0"
          />

          <div className="overflow-hidden">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#03045E] dark:text-[#E8F9FF] truncate">
              All-in-One Student Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-[#03045E] dark:text-[#E8F9FF] hidden sm:block">
              Your tools for productivity, focus, and smarter learning – all in
              one place.
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 ml-auto">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-[#03045E] dark:bg-[#471396] text-white hover:scale-105 transition"
            title="Toggle Dark Mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={handleLogout}
            className="bg-[#03045E] dark:bg-[#471396] hover:opacity-90 text-white px-4 py-2 rounded-md text-sm transition"
          >
            Logout
          </button>
        </div>

        <div className="md:hidden ml-auto">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md bg-[#CAF0F8] dark:bg-[#14243c] text-[#03045E] dark:text-white"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-2 px-4">
          <div className="flex flex-col gap-2 bg-[#E8F9FF] dark:bg-[#1b2a3a] rounded-md p-3 shadow-md border border-[#03045E] dark:border-[#471396]">
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#CAF0F8] dark:bg-[#14243c] text-[#03045E] dark:text-white"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md bg-[#03045E] dark:bg-[#471396] hover:opacity-90 text-white text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
