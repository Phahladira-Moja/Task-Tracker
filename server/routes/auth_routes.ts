import express from "express";
import { authController } from "../controllers";

const router = express.Router();

const { login, signup } = authController;

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
