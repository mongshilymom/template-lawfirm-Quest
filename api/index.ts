import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from "express";
import cors from "cors";
import { registerRoutes } from "../server/routes";

const app = express();

app.use(cors());
app.use(express.json());

// API 라우트 등록
let serverPromise: Promise<any>;

const getServer = async () => {
  if (!serverPromise) {
    serverPromise = registerRoutes(app);
  }
  return serverPromise;
};

// Vercel serverless handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await getServer();
  
  // Express 앱을 Vercel request/response로 연결
  return new Promise((resolve) => {
    app(req as any, res as any, () => {
      resolve(undefined);
    });
  });
}
