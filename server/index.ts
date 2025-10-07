import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { registerRoutes } from "./routes";

dotenv.config();

const app = express();

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`📨 ${req.method} ${req.url}`);
  next();
});

// CORS 설정 (로컬 개발 + 프로덕션 모두 허용)
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? true  // 프로덕션: 모든 오리진 허용 (같은 도메인)
    : ['http://localhost:5173', 'http://localhost:5000'], // 로컬: Vite dev server
  credentials: true
};

console.log('🔧 CORS Configuration:', corsOptions);
app.use(cors(corsOptions));

app.use(express.json());

// 포트 설정 (환경변수 → 기본 5000)
const PORT = Number(process.env.PORT) || 5000;

// 라우트 등록 및 서버 시작
registerRoutes(app).then((server) => {
  server.listen(PORT, () => {
    console.log('========================================');
    console.log('🚀 Server running at http://localhost:' + PORT);
    console.log('📊 API endpoints available at http://localhost:' + PORT + '/api');
    console.log('🌍 Environment: ' + (process.env.NODE_ENV || 'development'));
    console.log('========================================');
  });
}).catch((error) => {
  console.error('❌ Failed to start server:', error);
});
