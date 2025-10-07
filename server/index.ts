import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { registerRoutes } from "./routes";

dotenv.config();

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());

// 포트 설정 (환경변수 → 기본 5000)
const PORT = Number(process.env.PORT) || 5000;

// 라우트 등록 및 서버 시작
registerRoutes(app).then((server) => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  });
});
