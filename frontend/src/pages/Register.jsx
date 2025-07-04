import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/auth/register`,
        { name, email, password }
      );
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#E8F9FF] dark:bg-gradient-to-br dark:from-[#090040] dark:to-[#471396] transition-colors duration-300">
      <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-[#1c1c3a] dark:border-[#471396]">
        <div className="p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6 md:space-y-6">
          <h1 className="text-xl font-bold text-[#03045E] dark:text-white text-center">
            Register
          </h1>
          <form
            onSubmit={handleRegister}
            className="space-y-4 sm:space-y-5 md:space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-[#03045E] focus:border-[#03045E] block w-full p-2.5 dark:bg-[#2a2a48] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#471396] dark:focus:border-[#471396]"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-[#03045E] focus:border-[#03045E] block w-full p-2.5 dark:bg-[#2a2a48] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#471396] dark:focus:border-[#471396]"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-[#03045E] focus:border-[#03045E] block w-full p-2.5 dark:bg-[#2a2a48] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#471396] dark:focus:border-[#471396]"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-[#03045E] hover:bg-[#023E8A] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#471396] dark:hover:bg-[#5f29b7] dark:focus:ring-[#5f29b7]"
            >
              Create an account
            </button>
            <p className="text-sm text-center text-gray-600 dark:text-gray-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#03045E] dark:text-[#B8A4F9] hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
