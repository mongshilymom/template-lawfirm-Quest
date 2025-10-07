import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    return res.status(200).json({ ok: true, received: payload });
  } catch (e: any) {
    return res.status(400).json({ error: e?.message || 'Invalid body' });
  }
}
