import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-black dark:text-white transition-colors">
        <Toaster position="top-center" reverseOrder={false} />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard
                    toggleDarkMode={() => setDarkMode((prev) => !prev)}
                    darkMode={darkMode}
                  />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
