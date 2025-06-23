import { useState, useEffect } from "react";
import axios from "axios";
import { Pencil, Trash2, CheckCircle } from "lucide-react";

const Todo = () => {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.API_URL || "http://localhost:5000"}/api/tasks`,
          config
        );
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks", err);
      }
    };
    fetchTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      if (editId) {
        const res = await axios.put(
          `${
            import.meta.env.API_URL || "http://localhost:5000"
          }/api/tasks/${editId}`,
          { text },
          config
        );
        setTasks((prev) =>
          prev.map((task) => (task._id === editId ? res.data : task))
        );
        setEditId(null);
      } else {
        const res = await axios.post(
          `${import.meta.env.API_URL || "http://localhost:5000"}/api/tasks`,
          { text },
          config
        );
        setTasks([res.data, ...tasks]);
      }
      setText("");
    } catch (err) {
      console.error("Error saving task", err);
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await axios.patch(
        `${
          import.meta.env.API_URL || "http://localhost:5000"
        }/api/tasks/${id}/toggle`,
        {},
        config
      );
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );
    } catch (err) {
      console.error("Error toggling task", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.API_URL || "http://localhost:5000"}/api/tasks/${id}`,
        config
      );
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const handleEdit = (task) => {
    setText(task.text);
    setEditId(task._id);
  };

  return (
    <div className="w-full h-[500px] rounded-2xl shadow-lg p-6 bg-white dark:bg-[#0c1a2c] text-black dark:text-white flex flex-col justify-between">
      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-[#03045E] dark:text-[#E8F9FF] mb-1">
          <CheckCircle className="w-5 h-5" />
          To-Do List
        </h2>
        <p className="text-sm text-[#03045E] dark:text-[#E8F9FF] mb-4">
          Manage daily tasks with ease.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter a task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md 
             bg-gray-100 dark:bg-[#14243c] 
             text-[#03045E] dark:text-[#E8F9FF]
             placeholder:text-gray-500 dark:placeholder:text-gray-400 
             text-sm focus:outline-none"
          />

          <button
            type="submit"
            className="bg-[#03045E] dark:bg-[#471396] hover:opacity-90 text-white px-4 py-2 rounded-md text-sm"
          >
            {editId ? "Update" : "Add"}
          </button>
        </form>

        <ul className="space-y-2 overflow-y-auto max-h-[220px] pr-1">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`flex justify-between items-center px-3 py-2 rounded-md text-sm ${
                task.completed
                  ? "bg-green-100 dark:bg-green-800/30 line-through text-gray-500 dark:text-gray-400"
                  : "bg-[#CAF0F8] dark:bg-[#1a2c48] text-[#03045E] dark:text-[#E8F9FF]"
              }`}
            >
              <span
                className="cursor-pointer w-full"
                onClick={() => handleToggle(task._id)}
              >
                {task.text}
              </span>
              <div className="flex gap-2 ml-2">
                <Pencil
                  className="w-4 h-4 text-[#03045E] dark:text-[#E8F9FF] hover:text-blue-700 dark:hover:text-[#c2b6ff] cursor-pointer"
                  onClick={() => handleEdit(task)}
                />
                <Trash2
                  className="w-4 h-4 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 cursor-pointer"
                  onClick={() => handleDelete(task._id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
