// api/index.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cors from 'cors';
import { registerRoutes } from '../server/routes';

let app: ReturnType<typeof express> | null = null;

async function getApp() {
  if (!app) {
    app = express();
    app.use(cors());
    app.use(express.json());
    // registerRoutes는 라우트를 app에 붙인 뒤 httpServer를 반환하지만,
    // 서버리스에선 app만 쓰면 됩니다.
    await registerRoutes(app);
  }
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await getApp();
  // @ts-ignore - Express는 (req,res) 호출 시 핸들러로 동작
  return app(req, res);
}
