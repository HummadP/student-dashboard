import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getTasks,
  createTask,
  updateTask,
  toggleTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", protect, getTasks);

router.post("/", protect, createTask);

router.put("/:id", protect, updateTask);

router.patch("/:id/toggle", protect, toggleTask);

router.delete("/:id", protect, deleteTask);

export default router;
