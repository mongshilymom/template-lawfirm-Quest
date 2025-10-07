import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json([
    {
      id: 1,
      category: 'Awards',
      titleKo: '퀘스트, 스타트업 M&A 자문',
      titleEn: 'QUEST advises startup M&A',
      date: '2025-10-01',
      summaryKo: '모빌리티 스타트업 인수 자문을 성공적으로 마쳤습니다.',
      summaryEn: 'Successfully advised on a mobility startup acquisition.',
      link: '#'
    },
    {
      id: 2,
      category: 'Firm',
      titleKo: '국제중재 세미나 개최',
      titleEn: 'International Arbitration Seminar',
      date: '2025-09-15',
      summaryKo: '해외 중재 트렌드와 전략을 공유했습니다.',
      summaryEn: 'Shared trends and strategies in cross-border arbitration.',
      link: '#'
    }
  ]);
}
