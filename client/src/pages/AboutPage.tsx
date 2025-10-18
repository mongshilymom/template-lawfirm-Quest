import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, Globe, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type Member = {
  id: number;
  nameKo: string;
  nameEn: string;
  titleKo: string;
  titleEn: string;
  practiceKo: string;
  practiceEn: string;
  photo: string;
};

const members: Member[] = [
  { id: 1, nameKo: '배영민', nameEn: 'Youngmin Bae', titleKo: '파트너변호사', titleEn: 'Partner', practiceKo: '기업지배구조, M&A', practiceEn: 'Corporate Governance, M&A', photo: '/images/attorneys/attorney-01.png' },
  { id: 2, nameKo: '김현성', nameEn: 'Hyunsung Kim', titleKo: '대표변호사',  titleEn: 'Managing Partner', practiceKo: '지배구조, 소송', practiceEn: 'Governance, Litigation', photo: '/images/attorneys/attorney-02.png' },
  { id: 3, nameKo: '이정윤', nameEn: 'Jungyoon Lee', titleKo: '변호사',      titleEn: 'Associate',         practiceKo: '지식재산, 규제', practiceEn: 'IP, Regulatory', photo: '/images/attorneys/attorney-03.png' },
  { id: 4, nameKo: '박지현', nameEn: 'Jihyun Park',  titleKo: '파트너변호사', titleEn: 'Partner',            practiceKo: '노동, 분쟁',     practiceEn: 'Labor, Disputes', photo: '/images/attorneys/attorney-04.png' },
  { id: 5, nameKo: '최민호', nameEn: 'Minho Choi',   titleKo: '파트너변호사', titleEn: 'Partner',            practiceKo: '건설, 국제분쟁', practiceEn: 'Construction, Intl. Arbitration', photo: '/images/attorneys/attorney-05.png' },
  { id: 6, nameKo: '정수연', nameEn: 'Suyeon Jung',  titleKo: '파트너변호사', titleEn: 'Partner',            practiceKo: '디지털자산, 핀테크', practiceEn: 'Digital Assets, Fintech', photo: '/images/attorneys/attorney-06.png' },
  { id: 7, nameKo: '강민준', nameEn: 'Minjun Kang',  titleKo: '파트너변호사', titleEn: 'Partner',            practiceKo: '세무, 투자',     practiceEn: 'Tax, Investment', photo: '/images/attorneys/attorney-07.png' },
  { id: 8, nameKo: '윤서현', nameEn: 'Seohyun Yoon', titleKo: '파트너변호사', titleEn: 'Partner',            practiceKo: '금융, ESG',       practiceEn: 'Finance, ESG', photo: '/images/attorneys/attorney-08.png' },
];

export default function AboutPage() {
  const { language } = useLanguage();

  const stats = [
    { icon: Users,     valueKo: '550+', valueEn: '550+', labelKo: '전문 변호사', labelEn: 'Attorneys' },
    { icon: Building2, valueKo: '9',    valueEn: '9',    labelKo: '해외 사무소', labelEn: 'Global Offices' },
    { icon: Globe,     valueKo: '40+',  valueEn: '40+',  labelKo: '년 경력',     labelEn: 'Years' },
    { icon: Award,     valueKo: '1위',  valueEn: '#1',   labelKo: '국내 톱 로펌', labelEn: 'Top Firm' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-20">
        <div
          className="relative h-96 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&h=600&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-foreground/70" />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
                {language === 'ko' ? '회사 소개' : 'About QUEST Legal'}
              </h1>
              <p className="text-xl">
                {language === 'ko' ? 'QUEST Legal | 전문 법률 서비스' : 'QUEST Legal | Professional Legal Services'}
              </p>
            </div>
          </div>
        </div>

        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">
                  {language === 'ko' ? '법무법인 개요' : 'Firm Overview'}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    {language === 'ko'
                      ? 'QUEST Legal은 종합 법률 서비스를 제공하는 전문 로펌 템플릿입니다. 이 사이트는 데모 목적으로 제작되었으며, 다양한 법률 분야의 전문성을 보여주는 시연용 플랫폼입니다.'
                      : 'QUEST Legal is a professional law firm website template created for demonstration purposes.'}
                  </p>
                  <p>
                    {language === 'ko'
                      ? '기업법무, 소송, 국제거래, 지식재산권 등 다양한 분야를 다루며, 클라이언트에게 최적의 법률 솔루션을 제공하는 것을 목표로 합니다.'
                      : 'We cover corporate law, litigation, international transactions, and IP.'}
                  </p>
                  <p>
                    {language === 'ko'
                      ? '본 웹사이트는 교육 및 시연 목적의 템플릿이며, 실제 법률 서비스를 제공하지 않습니다.'
                      : 'This website is for demo and educational purposes only.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, idx) => (
                  <Card key={idx} className="hover-elevate active-elevate-2 transition-all">
                    <CardContent className="p-6 text-center">
                      <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <div className="text-4xl font-bold text-foreground mb-2">
                        {language === 'ko' ? stat.valueKo : stat.valueEn}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'ko' ? stat.labelKo : stat.labelEn}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-8">
                {language === 'ko' ? '주요 구성원' : 'Key Attorneys'}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {members.map((m) => (
                  <article key={m.id} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-md mb-4 bg-muted">
                      <img
                        src={m.photo}
                        alt={language === 'ko' ? m.nameKo : m.nameEn}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-semibold text-foreground">
                      {language === 'ko' ? m.nameKo : m.nameEn}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'ko' ? m.titleKo : m.titleEn}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {language === 'ko' ? m.practiceKo : m.practiceEn}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
