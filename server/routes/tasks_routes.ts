import express from "express";
import { taskController } from "../controllers";

const router = express.Router();

const { createTask, updateTask, deleteTask } = taskController;

router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
