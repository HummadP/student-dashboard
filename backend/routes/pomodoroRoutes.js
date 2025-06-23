import express from "express";
import {
  savePomodoroSession,
  getTotalFocusTime,
  clearPomodoroSessions,
} from "../controllers/pomodoroController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, savePomodoroSession);
router.get("/total", protect, getTotalFocusTime);
router.delete("/clear", protect, clearPomodoroSessions);

export default router;
