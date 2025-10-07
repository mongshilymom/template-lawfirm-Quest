import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json([
    {
      id: "e08dc2d0-5ca1-4d8d-af61-64b682d9337c",
      nameKo: "김철수",
      nameEn: "Kim, Chul-Soo",
      titleKo: "대표변호사",
      titleEn: "Managing Partner",
      practiceAreasKo: ["기업법", "M&A", "지배구조"],
      practiceAreasEn: ["Corporate Law", "M&A", "Corporate Governance"],
      office: "Seoul",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop"
    },
    {
      id: "cf18c0cb-4e9c-4a52-a0bb-266e3a8c0872",
      nameKo: "이영희",
      nameEn: "Lee, Young-Hee",
      titleKo: "파트너변호사",
      titleEn: "Partner",
      practiceAreasKo: ["관세·국제통상", "FTA", "이전가격", "산업융합"],
      practiceAreasEn: ["Customs & International Trade", "FTA", "Transfer Pricing", "Industry Convergence"],
      office: "Seoul",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop"
    },
    {
      id: "c54f2664-f59a-4877-91e1-84a5471b0d54",
      nameKo: "박민준",
      nameEn: "Park, Min-Joon",
      titleKo: "파트너변호사",
      titleEn: "Partner",
      practiceAreasKo: ["공정거래·경쟁법", "규제", "행정법"],
      practiceAreasEn: ["Antitrust & Competition", "Regulatory", "Administrative Law"],
      office: "Seoul",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=600&fit=crop"
    },
    {
      id: "73842827-9945-4665-8c98-58bc914d8b31e",
      nameKo: "정서연",
      nameEn: "Jung, Seo-Yeon",
      titleKo: "변호사",
      titleEn: "Associate",
      practiceAreasKo: ["컴플라이언스", "규제", "컴플라이언스"],
      practiceAreasEn: ["Compliance", "Regulatory", "Compliance"],
      office: "Busan",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop"
    },
    {
      id: "3e7c7a3a-0496-4414-b163-9f9afb93ae80",
      nameKo: "최지훈",
      nameEn: "Choi, Ji-Hoon",
      titleKo: "변호사",
      titleEn: "Associate",
      practiceAreasKo: ["디지털금융", "IT", "금융", "금융규제"],
      practiceAreasEn: ["Digital Finance", "IT", "Finance", "Financial Regulation"],
      office: "Seoul",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop"
    },
    {
      id: "3b18352d-9bc5-45b5-a239-fc0c5b9ede56",
      nameKo: "강하은",
      nameEn: "Kang, Ha-Eun",
      titleKo: "변호사",
      titleEn: "Associate",
      practiceAreasKo: ["국제중재", "국제거래", "소송"],
      practiceAreasEn: ["International Arbitration", "International Transactions", "Litigation"],
      office: "Seoul",
      imageUrl: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=600&fit=crop"
    }
  ]);
}
