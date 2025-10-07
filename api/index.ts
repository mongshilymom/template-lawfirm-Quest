import express from "express";
import cors from "cors";
import { registerRoutes } from "../server/routes";

const app = express();
app.use(cors());
app.use(express.json());

// 라우트 등록
registerRoutes(app);

// Vercel 서버리스 핸들러
export default app;
