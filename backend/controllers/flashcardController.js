import Flashcard from "../models/Flashcard.js";

export const createFlashcard = async (req, res) => {
  const { front, back } = req.body;
  try {
    const card = new Flashcard({ userId: req.user.id, front, back });
    await card.save();
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ error: "Server error creating flashcard." });
  }
};

export const getFlashcards = async (req, res) => {
  try {
    const cards = await Flashcard.find({ userId: req.user.id });
    res.status(201).json(cards);
  } catch (err) {
    res.status(500).json({ error: "Server error fetching flashcards." });
  }
};

export const deleteFlashcard = async (req, res) => {
  try {
    await Flashcard.deleteOne({ _id: req.params.id, userId: req.user.id });
    res.status(200).json({ msg: "Flashcard deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error deleting flashcard" });
  }
};
