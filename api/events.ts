import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json([
    {
      id: 1,
      type: "Seminar",
      titleKo: "2025 공정거래법 주요 개정사항",
      titleEn: "2025 Antitrust Law Key Amendments",
      descriptionKo: "공정거래법 개정안의 주요 내용과 기업에 미치는 영향을 분석합니다.",
      descriptionEn: "Analyzing key amendments to the Antitrust Act and their impact on businesses.",
      date: "2025-11-15",
      time: "14:00 - 17:00",
      location: "QUEST Legal 서울 본사",
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      registrationUrl: "#"
    },
    {
      id: 2,
      type: "Workshop",
      titleKo: "스타트업 투자계약 실무",
      titleEn: "Startup Investment Contracts Workshop",
      descriptionKo: "투자 유치를 준비하는 스타트업을 위한 실전 계약서 작성 워크숍입니다.",
      descriptionEn: "Practical workshop on drafting investment contracts for startups seeking funding.",
      date: "2025-11-20",
      time: "10:00 - 13:00",
      location: "온라인 웨비나",
      imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      registrationUrl: "#"
    },
    {
      id: 3,
      type: "Conference",
      titleKo: "2025 국제중재 컨퍼런스",
      titleEn: "2025 International Arbitration Conference",
      descriptionKo: "글로벌 분쟁해결 트렌드와 한국 기업의 대응 전략을 논의합니다.",
      descriptionEn: "Discussing global dispute resolution trends and Korean companies' response strategies.",
      date: "2025-12-05",
      time: "09:00 - 18:00",
      location: "그랜드 하얏트 서울",
      imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
      registrationUrl: "#"
    },
    {
      id: 4,
      type: "Seminar",
      titleKo: "ESG 경영과 법률 리스크",
      titleEn: "ESG Management and Legal Risks",
      descriptionKo: "ESG 규제 강화에 따른 기업의 법률적 대응방안을 제시합니다.",
      descriptionEn: "Presenting corporate legal response strategies to strengthened ESG regulations.",
      date: "2025-10-10",
      time: "15:00 - 17:30",
      location: "QUEST Legal 서울 본사",
      imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
      registrationUrl: null
    },
    {
      id: 5,
      type: "Webinar",
      titleKo: "개인정보보호법 최신 동향",
      titleEn: "Latest Trends in Privacy Law",
      descriptionKo: "데이터 3법 시행 이후 주요 이슈와 컴플라이언스 포인트를 짚습니다.",
      descriptionEn: "Reviewing key issues and compliance points following the Data 3 Laws implementation.",
      date: "2025-09-25",
      time: "14:00 - 16:00",
      location: "온라인 웨비나",
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
      registrationUrl: null
    }
  ]);
}
