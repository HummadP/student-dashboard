import { useState, useEffect, useRef } from "react";
import { RotateCcw, Pause, Play, Trash2, Hourglass } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import alarmSound from "../../assets/alarmSound.mp3";

const Pomodoro = () => {
  const FOCUS_DURATION = 25 * 60;
  const BREAK_DURATION = 5 * 60;
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [onBreak, setOnBreak] = useState(false);
  const [showBreakModal, setShowBreakModal] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(new Audio(alarmSound));
  const [sessionDuration, setSessionDuration] = useState(FOCUS_DURATION);
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const progress = ((sessionDuration - secondsLeft) / sessionDuration) * 100;
  const strokeOffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  useEffect(() => {
    if (secondsLeft === 0 && isActive) {
      clearInterval(intervalRef.current);
      setTimeout(() => {
        handleTimerEnd();
      }, 300);
    }
  }, [secondsLeft, isActive]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setSecondsLeft(25 * 60);
    setIsActive(false);
  };
  const clearFocusTime = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${
          import.meta.env.API_URL || "http://localhost:5000"
        }/api/pomodoro/clear`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalFocusTime(0);
      toast.success("Focus time cleared!");
    } catch (err) {
      console.error("Error clearing pomodoro sessions", err);
      toast.error("Failed to clear focus time");
    }
  };

  const handleTimerEnd = async () => {
    setIsActive(false);
    audioRef.current.play();

    if (onBreak) {
      toast.success("Break Over! Time to focus");
      setOnBreak(false);
      setSessionDuration(FOCUS_DURATION);
      setSecondsLeft(FOCUS_DURATION);
      setShowBreakModal(false);
    } else {
      toast.success("Pomodoro session complete!");
      setOnBreak(true);
      setSessionDuration(BREAK_DURATION);
      setSecondsLeft(BREAK_DURATION);
      setShowBreakModal(true);

      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `${import.meta.env.API_URL || "http://localhost:5000"}/api/pomodoro`,
          { focusMinutes: 25 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTimeout(fetchTotalFocusTime, 500);
      } catch (err) {
        console.error("Error saving session:", err);
      }
    }
  };

  const fetchTotalFocusTime = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${
          import.meta.env.API_URL || "http://localhost:5000"
        }/api/pomodoro/total`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTotalFocusTime(Number(res.data.focusTime) || 0);
    } catch (err) {
      console.error("Error fetching total focus time:", err);
      setTotalFocusTime(0);
    }
  };

  useEffect(() => {
    fetchTotalFocusTime();
  }, []);

  return (
    <div className="w-full h-[500px] rounded-2xl shadow-lg p-6 bg-white dark:bg-[#0c1a2c] text-black dark:text-white flex flex-col justify-between">
      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-[#03045E] dark:text-[#E8F9FF] mb-1">
          <Hourglass className="w-5 h-5" />
          Pomodoro Timer
        </h2>
        <p className="text-sm text-[#03045E] dark:text-[#E8F9FF] mb-6">
          Boost focus with timed work sessions
        </p>
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              className="text-gray-300 dark:text-gray-700"
            />

            <circle
              cx="96"
              cy="96"
              r={radius}
              stroke="currentColor"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              className={`transition-all duration-100 ease-linear ${
                onBreak
                  ? "text-green-500"
                  : "text-[#03045E] dark:text-[#471396]"
              }`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
            {formatTime(secondsLeft)}
          </div>
        </div>
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={toggleTimer}
            className="bg-[#03045E] dark:bg-[#471396] hover:opacity-90 text-white px-4 py-2 rounded-full"
          >
            {isActive ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={resetTimer}
            disabled={isActive}
            className={`${
              isActive ? "opacity-50 cursor-not-allowed" : ""
            } bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-full`}
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center text-sm text-gray-700 dark:text-gray-300">
          <p>
            Total Focus Time : <strong>{totalFocusTime} min</strong>
          </p>
          <button
            onClick={clearFocusTime}
            className="text-xs text-red-500 dark:text-red-400 flex items-center justify-center mx-auto mt-2 hover:underline"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </button>
        </div>
      </div>
      {showBreakModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-xl p-6 w-80 text-center">
            <h2 className="text-lg font-semibold mb-3 text-[#03045E] dark:text-[#E8F9FF]">
              Take a Short Break?
            </h2>
            <p className="text-sm text-[#03045E] dark:text-gray-300 mb-4">
              Start a 5-minute break or skip to restart Pomodoro.
            </p>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => {
                  setOnBreak(true);
                  setSecondsLeft(BREAK_DURATION);
                  setIsActive(true);
                  setShowBreakModal(false);
                }}
                className="bg-[#03045E] dark:bg-[#471396] hover:opacity-90 text-white px-4 py-2 rounded-md text-sm"
              >
                Start Break
              </button>
              <button
                onClick={() => {
                  setOnBreak(false);
                  setSessionDuration(FOCUS_DURATION);
                  setSecondsLeft(FOCUS_DURATION);
                  setIsActive(false);
                  setShowBreakModal(false);
                }}
                className="border border-gray-400 dark:border-gray-300 text-[#03045E] dark:text-[#E8F9FF] px-4 py-2 rounded-md text-sm"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pomodoro;
