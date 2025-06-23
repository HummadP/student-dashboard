import { useState, useEffect } from "react";
import axios from "axios";
import { BookCopy } from "lucide-react";
import FlashcardItem from "./FlashcardItem";

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.API_URL || "http://localhost:5000"
          }/api/flashcards`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFlashcards(res.data);
      } catch (err) {
        console.error("Failed to fetch flashcards", err);
      }
    };
    fetchFlashcards();
  }, []);

  const addFlashcard = async () => {
    if (!front.trim() || !back.trim()) return;
    try {
      const res = await axios.post(
        `${import.meta.env.API_URL || "http://localhost:5000"}/api/flashcards`,
        { front, back },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFlashcards((prev) => [...prev, res.data]);
      setFront("");
      setBack("");
    } catch (err) {
      console.error("Failed to add flashcard", err);
    }
  };

  const deleteFlashcard = async (id) => {
    try {
      await axios.delete(
        `${
          import.meta.env.API_URL || "http://localhost:5000"
        }/api/flashcards/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFlashcards((prev) => prev.filter((card) => card._id !== id));
    } catch (err) {
      console.error("Failed to delete flashcard", err);
    }
  };

  const isLongText = (text) => text.length > 120;
  const hasLongCard = flashcards.some(
    (card) => isLongText(card.front) || isLongText(card.back)
  );

  return (
    <div className="w-full h-[500px] rounded-2xl shadow-lg p-6 bg-white dark:bg-[#0c1a2c] text-black dark:text-[#E8F9FF] flex flex-col">
      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-[#03045E] dark:text-[#E8F9FF] mb-1">
          <BookCopy className="w-5 h-5" />
          Flashcards
        </h2>
        <p className="text-sm text-[#03045E] dark:text-[#E8F9FF] mb-6">
          Create and flip custom flashcards.
        </p>

        <div className="space-y-2 mb-6">
          <input
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="Front text"
            className="w-full px-3 py-2 rounded-md border text-sm 
              bg-gray-100 text-[#03045E] border-gray-300 
              dark:bg-[#14243c] dark:text-[#E8F9FF] dark:border-[#1f3556]
              placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <input
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="Back text"
            className="w-full px-3 py-2 rounded-md border text-sm 
              bg-gray-100 text-[#03045E] border-gray-300 
              dark:bg-[#14243c] dark:text-[#E8F9FF] dark:border-[#1f3556]
              placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <button
            onClick={addFlashcard}
            disabled={!front.trim() || !back.trim()}
            className="w-full bg-[#03045E] dark:bg-[#471396] hover:opacity-90 text-white py-2 rounded-md text-sm disabled:opacity-70"
          >
            Add Flashcard
          </button>
        </div>

        <div
          className={`max-h-[200px] flex-1 overflow-y-auto grid gap-4 pr-2 custom-scroll ${
            hasLongCard ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
          }`}
        >
          {flashcards.map((card) => (
            <FlashcardItem
              key={card._id}
              card={card}
              onDelete={deleteFlashcard}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
