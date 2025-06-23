import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#E8F9FF] to-[#CAF0F8] dark:from-[#090040] dark:to-[#471396] transition-colors duration-300">
      <div
        className="w-full max-w-xl text-center px-6 py-12 rounded-2xl shadow-xl dark:border
        bg-white/90 dark:bg-[#1c1c3a] dark:border-[#471396] backdrop-blur-md"
      >
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Dashboard Logo"
            className="w-14 h-14 sm:w-20 sm:h-20 object-contain rounded-md shadow-md"
          />
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-[#03045E] dark:text-white mb-3 leading-tight">
          Welcome to All-in-One Student Dashboard
        </h1>

        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-6">
          Boost your productivity with our all-in-one dashboard. Manage tasks,
          focus with Pomodoro, and memorize with smart flashcards — all in one
          place.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/login">
            <button className="px-6 py-2 rounded-lg bg-[#03045E] text-white hover:bg-[#023E8A] dark:bg-[#471396] dark:hover:bg-[#5f29b7] transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="px-6 py-2 rounded-lg border border-[#03045E] text-[#03045E] dark:border-white dark:text-white hover:bg-[#5f29b7] hover:text-white transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
