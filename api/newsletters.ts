import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json([
    {
      id: 1,
      titleKo: '공정거래 이슈 브리핑',
      titleEn: 'Antitrust Briefing',
      excerptKo: '대규모유통업법 개정 포인트 요약.',
      excerptEn: 'Key points from recent antitrust amendments.',
      link: '#'
    },
    {
      id: 2,
      titleKo: '세무/조세 인사이트',
      titleEn: 'Tax Insights',
      excerptKo: '해외원천소득 과세 이슈 점검.',
      excerptEn: 'Overview of cross-border withholding matters.',
      link: '#'
    }
  ]);
}
