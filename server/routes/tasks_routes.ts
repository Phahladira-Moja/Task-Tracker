import express from "express";
import { taskController } from "../controllers";
import { checkToken } from "../middleware/jwt_validation";

const router = express.Router();

const { createTask, updateTask, deleteTask, getTask } = taskController;

router.get("/", checkToken, getTask);
router.post("/", checkToken, createTask);
router.patch("/:id", checkToken, updateTask);
router.delete("/:id", checkToken, deleteTask);

module.exports = router;
