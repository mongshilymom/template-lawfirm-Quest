import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json([
    { id: 201, titleKo: '공정거래 동향 9월호', titleEn: 'Antitrust Update – Sep', summaryKo: '가이드라인 개정 핵심 정리', summaryEn: 'Key guideline updates', date: '2025-09-30', fileUrl: '#' },
    { id: 202, titleKo: '국제거래 규제 브리프', titleEn: 'Intl Trade Brief',       summaryKo: '수출통제 및 제재 동향',     summaryEn: 'Export control trends',  date: '2025-09-10', fileUrl: '#' }
  ]);
}
