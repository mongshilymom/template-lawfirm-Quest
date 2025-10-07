import express from "express";
import cors from "cors";
import { registerRoutes } from "../server/routes";

const app = express();

app.use(cors());
app.use(express.json());

// API 라우트 등록
registerRoutes(app);

// Vercel serverless export
export default app;
