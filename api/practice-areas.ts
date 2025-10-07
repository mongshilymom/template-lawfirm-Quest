import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json([
    {
      id: 1,
      titleKo: '기업지배구조',
      titleEn: 'Corporate Governance',
      descriptionKo: '이사회, 주주총회, 지배구조 자문',
      descriptionEn: 'Board, shareholders, governance advisory',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80'
    },
    {
      id: 2,
      titleKo: '분쟁/소송',
      titleEn: 'Litigation & Dispute',
      descriptionKo: '민·형사 및 국제중재',
      descriptionEn: 'Civil/criminal & international arbitration',
      imageUrl: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=1200&q=80'
    },
    {
      id: 3,
      titleKo: '국제거래',
      titleEn: 'International Transactions',
      descriptionKo: 'Cross-border 계약/규제',
      descriptionEn: 'Cross-border contracts & compliance',
      imageUrl: 'https://images.unsplash.com/photo-1499914485622-a88fac536970?w=1200&q=80'
    }
  ]);
}
