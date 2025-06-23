import { useState } from "react";
import { Trash2 } from "lucide-react";

const FlashcardItem = ({ card, onDelete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const isFrontLong = card.front.length > 250;
  const isBackLong = card.back.length > 250;

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="relative w-full h-32 sm:h-40 md:h-48 cursor-pointer [perspective:1000px]"
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div
          className={`absolute w-full h-full rounded-2xl p-4 shadow-md 
          flex flex-col ${isFrontLong ? "justify-start" : "justify-center"} 
          text-base sm:text-md font-medium 
          text-center text-[#03045E] dark:text-[#E8F9FF]
          bg-[#CAF0F8] dark:bg-[#1a2c48] 
          [backface-visibility:hidden] break-words custom-scroll`}
        >
          <div
            className={`h-full w-full overflow-y-auto ${
              isFrontLong ? "" : "flex items-center justify-center"
            } pr-1 custom-scroll`}
          >
            {card.front}
          </div>
        </div>

        <div
          className={`absolute w-full h-full rounded-2xl p-4 shadow-md 
          flex flex-col ${isBackLong ? "justify-start" : "justify-center"} 
          text-base sm:text-md font-medium 
          text-center text-[#03045E] dark:text-[#E8F9FF]
          bg-[#ADE8F4] dark:bg-[#2c3a5e] 
          [transform:rotateY(180deg)] [backface-visibility:hidden] 
          break-words custom-scroll`}
        >
          <div
            className={`h-full w-full overflow-y-auto ${
              isBackLong ? "" : "flex items-center justify-center"
            } pr-1 custom-scroll`}
          >
            {card.back}
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(card._id);
        }}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-20"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default FlashcardItem;
