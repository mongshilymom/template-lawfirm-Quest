// API 베이스 URL - 개발/프로덕션 환경 자동 감지
const API_BASE = import.meta.env.VITE_API_BASE ?? '/api';

export const api = {
  get: (path: string, init?: RequestInit) =>
    fetch(`${API_BASE}${path}`, { ...init }),
  
  post: (path: string, body: any, init?: RequestInit) =>
    fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
      body: JSON.stringify(body),
      ...init,
    }),
};
