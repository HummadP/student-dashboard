import Todo from "./tools/Todo";
import Pomodoro from "./tools/Pomodoro";
import Flashcards from "./tools/Flashcards";
import Navbar from "../components/Navbar";

const Dashboard = ({ toggleDarkMode, darkMode }) => {
  return (
    <>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div
        className="min-h-screen transition-colors text-black dark:text-white 
        bg-[#E8F9FF] dark:bg-gradient-to-br dark:from-[#090040] dark:to-[#471396] p-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-6 mt-8">
          <Todo />
          <Pomodoro />
          <Flashcards />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
