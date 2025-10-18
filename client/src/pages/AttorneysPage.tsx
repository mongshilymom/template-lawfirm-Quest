// client/src/pages/AttorneysPage.tsx
import { useState } from "react";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Attorney {
  id: number;
  name: string;
  nameKo: string;
  title: string;
  titleKo: string;
  specialization: string;
  specializationKo: string;
  image: string;
  bio: string;
  bioKo: string;
}

const attorneys: Attorney[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    nameKo: "사라 존슨",
    title: "Senior Partner",
    titleKo: "대표 변호사",
    specialization: "Corporate Law",
    specializationKo: "기업법",
    image: "/images/attorneys/attorney-01.png",
    bio: "25+ years of experience in corporate law and M&A transactions",
    bioKo: "기업법 및 M&A 거래 분야에서 25년 이상의 경력"
  },
  {
    id: 2,
    name: "Michael Chen",
    nameKo: "마이클 첸",
    title: "Partner",
    titleKo: "파트너",
    specialization: "Family Law",
    specializationKo: "가족법",
    image: "/images/attorneys/attorney-02.png",
    bio: "Specializing in divorce, custody, and family mediation",
    bioKo: "이혼, 양육권 및 가족 조정 전문"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    nameKo: "에밀리 로드리게스",
    title: "Partner",
    titleKo: "파트너",
    specialization: "Criminal Defense",
    specializationKo: "형사 변호",
    image: "/images/attorneys/attorney-03.png",
    bio: "Experienced trial attorney with a strong track record",
    bioKo: "강력한 실적을 보유한 경험 많은 재판 변호사"
  },
  {
    id: 4,
    name: "David Kim",
    nameKo: "데이비드 김",
    title: "Senior Attorney",
    titleKo: "수석 변호사",
    specialization: "Real Estate",
    specializationKo: "부동산",
    image: "/images/attorneys/attorney-04.png",
    bio: "Expert in commercial and residential property transactions",
    bioKo: "상업 및 주거용 부동산 거래 전문가"
  },
  {
    id: 5,
    name: "Jennifer Taylor",
    nameKo: "제니퍼 테일러",
    title: "Partner",
    titleKo: "파트너",
    specialization: "Immigration Law",
    specializationKo: "이민법",
    image: "/images/attorneys/attorney-05.png",
    bio: "Helping families and businesses navigate immigration challenges",
    bioKo: "가족과 기업의 이민 문제 해결 지원"
  },
  {
    id: 6,
    name: "Robert Martinez",
    nameKo: "로버트 마르티네스",
    title: "Senior Attorney",
    titleKo: "수석 변호사",
    specialization: "Intellectual Property",
    specializationKo: "지적재산권",
    image: "/images/attorneys/attorney-06.png",
    bio: "Patent, trademark, and copyright protection specialist",
    bioKo: "특허, 상표 및 저작권 보호 전문가"
  },
  {
    id: 7,
    name: "Lisa Anderson",
    nameKo: "리사 앤더슨",
    title: "Associate",
    titleKo: "변호사",
    specialization: "Employment Law",
    specializationKo: "고용법",
    image: "/images/attorneys/attorney-07.png",
    bio: "Representing employees and employers in workplace disputes",
    bioKo: "직장 분쟁에서 근로자와 고용주를 대리"
  },
  {
    id: 8,
    name: "James Wilson",
    nameKo: "제임스 윌슨",
    title: "Associate",
    titleKo: "변호사",
    specialization: "Tax Law",
    specializationKo: "세법",
    image: "/images/attorneys/attorney-08.png",
    bio: "Providing strategic tax planning and compliance services",
    bioKo: "전략적 세무 계획 및 규정 준수 서비스 제공"
  }
];

export default function AttorneysPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("all");

  const specializations = [
    { value: "all", en: "All Practice Areas", ko: "전체 분야" },
    { value: "Corporate Law", en: "Corporate Law", ko: "기업법" },
    { value: "Family Law", en: "Family Law", ko: "가족법" },
    { value: "Criminal Defense", en: "Criminal Defense", ko: "형사 변호" },
    { value: "Real Estate", en: "Real Estate", ko: "부동산" },
    { value: "Immigration Law", en: "Immigration Law", ko: "이민법" },
    { value: "Intellectual Property", en: "Intellectual Property", ko: "지적재산권" },
    { value: "Employment Law", en: "Employment Law", ko: "고용법" },
    { value: "Tax Law", en: "Tax Law", ko: "세법" }
  ];

  const filteredAttorneys = attorneys.filter((attorney) => {
    const matchesSearch = 
      attorney.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attorney.nameKo.includes(searchTerm) ||
      attorney.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attorney.specializationKo.includes(searchTerm);
    
    const matchesSpecialization = 
      selectedSpecialization === "all" || 
      attorney.specialization === selectedSpecialization;

    return matchesSearch && matchesSpecialization;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              data-testid="text-attorneys-hero-title"
            >
              {language === "ko" ? "변호사 검색" : "Find an Attorney"}
            </h1>
            <p
              className="text-xl opacity-90 mb-8"
              data-testid="text-attorneys-hero-subtitle"
            >
              {language === "ko"
                ? "귀하의 법적 요구사항에 맞는 전문가를 찾아보세요"
                : "Find the right legal expert for your needs"}
            </p>

            <div className="bg-white rounded-lg p-6 shadow-xl">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={
                      language === "ko"
                        ? "이름 또는 전문 분야로 검색..."
                        : "Search by name or specialty..."
                    }
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                    data-testid="input-attorney-search"
                  />
                </div>
                <select
                  value={selectedSpecialization}
                  onChange={(e) => setSelectedSpecialization(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900"
                  data-testid="select-specialization"
                >
                  {specializations.map((spec) => (
                    <option key={spec.value} value={spec.value}>
                      {language === "ko" ? spec.ko : spec.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {filteredAttorneys.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              {language === "ko"
                ? "검색 결과가 없습니다. 다른 검색어를 시도해보세요."
                : "No attorneys found. Try a different search term."}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredAttorneys.map((attorney) => (
              <div
                key={attorney.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                data-testid={`card-attorney-${attorney.id}`}
              >
                <img
                  src={attorney.image}
                  alt={language === "ko" ? attorney.nameKo : attorney.name}
                  className="w-full aspect-square object-cover"
                  data-testid={`image-attorney-${attorney.id}`}
                />
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-1"
                    data-testid={`text-attorney-name-${attorney.id}`}
                  >
                    {language === "ko" ? attorney.nameKo : attorney.name}
                  </h3>
                  <p
                    className="text-primary font-medium mb-2"
                    data-testid={`text-attorney-title-${attorney.id}`}
                  >
                    {language === "ko" ? attorney.titleKo : attorney.title}
                  </p>
                  <p
                    className="text-gray-600 text-sm mb-3"
                    data-testid={`text-attorney-specialization-${attorney.id}`}
                  >
                    {language === "ko"
                      ? attorney.specializationKo
                      : attorney.specialization}
                  </p>
                  <p
                    className="text-gray-600 text-sm mb-4"
                    data-testid={`text-attorney-bio-${attorney.id}`}
                  >
                    {language === "ko" ? attorney.bioKo : attorney.bio}
                  </p>
                  <button
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
                    data-testid={`button-contact-attorney-${attorney.id}`}
                  >
                    {language === "ko" ? "연락하기" : "Contact"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}