import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mongoConnect } from "./config/db.js";
import quizRoutes from "./routes/quizRoutes.js"
import authRoutes from "./routes/authRoutes.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/quizzes",quizRoutes);
mongoConnect();
const PORT = process.env.PORT;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));
