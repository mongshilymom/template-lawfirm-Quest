// API 踰좎씠??URL - 媛쒕컻/?꾨줈?뺤뀡 ?섍꼍 ?먮룞 媛먯?
const API_BASE = import.meta.env.VITE_API_BASE ?? '/api';

console.log('?뵩 API Configuration:', {
  VITE_API_BASE: import.meta.env.VITE_API_BASE,
  API_BASE,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD
});

export const api = {
  get: async (path: string, init?: RequestInit) => {
    const url = `${API_BASE}${path}`;
    console.log('?뱻 API GET:', url);
    
    try {
      const response = await fetch(url, { ...init });
      console.log('??API Response:', url, response.status);
      return response;
    } catch (error) {
      console.error('??API Error:', url, error);
      throw error;
    }
  },
  
  post: async (path: string, body: any, init?: RequestInit) => {
    const url = `${API_BASE}${path}`;
    console.log('?뱻 API POST:', url, body);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
        body: JSON.stringify(body),
        ...init,
      });
      console.log('??API Response:', url, response.status);
      return response;
    } catch (error) {
      console.error('??API Error:', url, error);
      throw error;
    }
  },
};
