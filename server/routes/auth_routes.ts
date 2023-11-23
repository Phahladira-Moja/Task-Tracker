import express from "express";
import { authController, taskController } from "../controllers";

const router = express.Router();

const { getTask } = taskController;
const { login, signup } = authController;

router.post("/login", login);
router.post("/signup", signup);
router.get("/:id/tasks", getTask);

module.exports = router;
