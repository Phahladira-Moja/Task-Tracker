import express from "express";
import { authController, taskController } from "../controllers";
import { checkToken } from "../middleware/jwt_validation";

const router = express.Router();

const { getTask } = taskController;
const { login, signup } = authController;

router.post("/login", login);
router.post("/signup", signup);
router.get("/:id/tasks", checkToken, getTask);

module.exports = router;
