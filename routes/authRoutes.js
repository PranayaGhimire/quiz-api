import express from "express";
import { login, register, userInfo } from "../controllers/authController.js";
import { body } from "express-validator";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register",[
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({min:6}),
    body("role").optional().isIn(["user","admin"])
],register);

router.post("/login",[
    body("email").isEmail(),
    body("password").notEmpty()
],login);

router.get("/userInfo",protect,userInfo);

export default router;