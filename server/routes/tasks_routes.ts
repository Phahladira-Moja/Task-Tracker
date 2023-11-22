import express from "express";
import { taskController } from "../controllers";

const router = express.Router();

const { getTask, createTask, updateTask, deleteTask } = taskController;

router.get("/", getTask);
router.post("/", createTask);

router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
