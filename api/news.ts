import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json([
    { id: 101, category: 'Awards', titleKo: 'QUEST Legal, 2025 우수 로펌 선정', titleEn: 'Top Firm 2025', date: '2025-09-15', link: '#' },
    { id: 102, category: 'Firm',   titleKo: '신규 파트너 영입',               titleEn: 'New partner joins', date: '2025-08-20', link: '#' }
  ]);
}
