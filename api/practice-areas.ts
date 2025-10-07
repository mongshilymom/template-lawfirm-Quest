import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json([
    {
      id: 1,
      titleKo: '기업법',
      titleEn: 'Corporate Law',
      descriptionKo: '기업 설립, M&A, 지배구조 자문',
      descriptionEn: 'Incorporation, M&A, governance advisory',
      imageUrl: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600'
    },
    {
      id: 2,
      titleKo: '분쟁/소송',
      titleEn: 'Litigation',
      descriptionKo: '복잡한 상사/민사/행정소송',
      descriptionEn: 'Complex commercial/civil/administrative disputes',
      imageUrl: 'https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=1600'
    },
    {
      id: 3,
      titleKo: '국제거래',
      titleEn: 'International Transactions',
      descriptionKo: '계약/규제/통상 이슈',
      descriptionEn: 'Contracts, compliance and trade matters',
      imageUrl: 'https://images.unsplash.com/photo-1499914485622-a88fac536970?q=80&w=1600'
    }
  ]);
}
