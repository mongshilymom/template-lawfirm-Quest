import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // 실제 구현에서는 데이터베이스에 저장
  console.log('Newsletter subscription:', email);

  return res.status(200).json({ 
    ok: true, 
    message: 'Successfully subscribed to newsletter' 
  });
}
