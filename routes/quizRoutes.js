import express from "express";
import { createQuiz, deleteQuiz, getQuiz, getQuizzes, submitQuiz } from "../controllers/quizController.js";
import { allowRole, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/",protect,allowRole,createQuiz);
router.get("/",getQuizzes);
router.get("/:id",getQuiz);
router.post("/:id/submit",protect,submitQuiz);
router.delete("/:id",protect,allowRole(),deleteQuiz);

export default router;