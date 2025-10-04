import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, Globe, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Office, Attorney } from '@shared/schema';

export default function AboutPage() {
  const { language } = useLanguage();

  const { data: offices = [] } = useQuery<Office[]>({
    queryKey: ['/api/offices'],
  });

  const { data: attorneys = [] } = useQuery<Attorney[]>({
    queryKey: ['/api/attorneys'],
  });

  const stats = [
    {
      icon: Users,
      valueKo: '550+',
      valueEn: '550+',
      labelKo: '전문 변호사',
      labelEn: 'Professional Attorneys',
    },
    {
      icon: Building2,
      valueKo: '9',
      valueEn: '9',
      labelKo: '해외 사무소',
      labelEn: 'Global Offices',
    },
    {
      icon: Globe,
      valueKo: '40+',
      valueEn: '40+',
      labelKo: '년 경력',
      labelEn: 'Years of Excellence',
    },
    {
      icon: Award,
      valueKo: '1위',
      valueEn: '#1',
      labelKo: '국내 최대 로펌',
      labelEn: 'Law Firm in Korea',
    },
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
                {language === 'ko' ? '회사 소개' : 'About BKL'}
              </h1>
              <p className="text-xl">
                {language === 'ko'
                  ? '법무법인(유한) 태평양 | Bae, Kim & Lee LLC'
                  : 'Bae, Kim & Lee LLC'}
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
                      ? '법무법인(유한) 태평양(BKL)은 1980년 설립된 대한민국 최대 규모의 종합 법률 서비스 기관입니다. 550여명의 변호사를 포함한 총 710여명의 전문가들이 함께하고 있으며, 국내 최초로 법무법인(유한)으로 조직을 변경하였습니다.'
                      : 'Founded in 1980, Bae, Kim & Lee LLC (BKL) is Korea\'s largest full-service law firm. With over 550 attorneys and 710+ professionals, we were the first Korean law firm to adopt the limited liability partnership structure.'}
                  </p>
                  <p>
                    {language === 'ko'
                      ? '서울 강남 센트로폴리스에 본사를 두고 있으며, 베이징, 상하이, 홍콩, 하노이, 호치민, 두바이, 양곤, 자카르타, 싱가포르 등 9개의 해외 사무소를 운영하고 있습니다.'
                      : 'Headquartered in Centropolis, Gangnam, Seoul, we operate 9 international offices in Beijing, Shanghai, Hong Kong, Hanoi, Ho Chi Minh, Dubai, Yangon, Jakarta, and Singapore.'}
                  </p>
                  <p>
                    {language === 'ko'
                      ? '기업지배구조, 국제중재, M&A, 소송, 지식재산권 등 다양한 분야에서 최고 수준의 법률 서비스를 제공하고 있으며, 재단법인 동천을 통한 공익활동도 활발히 진행하고 있습니다.'
                      : 'We provide top-tier legal services across various practice areas including corporate governance, international arbitration, M&A, litigation, and intellectual property. We also actively engage in pro bono work through the Dongchun Foundation.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="hover-elevate active-elevate-2 transition-all">
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

            <div className="mb-20">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-8">
                {language === 'ko' ? '글로벌 오피스' : 'Global Offices'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offices.map((office) => (
                  <Card
                    key={office.id}
                    className="hover-elevate active-elevate-2 transition-all"
                    data-testid={`card-office-${office.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <Building2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">
                            {language === 'ko' ? office.nameKo : office.nameEn}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {language === 'ko' ? office.addressKo : office.addressEn}
                          </p>
                          <span className="inline-block mt-2 text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground">
                            {office.type}
                          </span>
                        </div>
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
                {attorneys.slice(0, 8).map((attorney) => (
                  <div
                    key={attorney.id}
                    className="group"
                    data-testid={`card-attorney-${attorney.id}`}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-md mb-4 bg-muted">
                      <img
                        src={attorney.imageUrl}
                        alt={language === 'ko' ? attorney.nameKo : attorney.nameEn}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 
                      className="font-semibold text-foreground mb-1"
                      data-testid={`text-attorney-name-${attorney.id}`}
                    >
                      {language === 'ko' ? attorney.nameKo : attorney.nameEn}
                    </h3>
                    <p 
                      className="text-sm text-muted-foreground mb-2"
                      data-testid={`text-attorney-title-${attorney.id}`}
                    >
                      {language === 'ko' ? attorney.titleKo : attorney.titleEn}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {language === 'ko'
                        ? attorney.practiceAreasKo.slice(0, 2).join(', ')
                        : attorney.practiceAreasEn.slice(0, 2).join(', ')}
                    </p>
                  </div>
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
