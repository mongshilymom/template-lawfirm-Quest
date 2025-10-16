import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, Globe, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Office, Attorney } from '@shared/schema';

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

// index(0~7) ??/images/attorneys/attorney-0X.png
function getLocalHeadshotPath(index: number) {
  return `/images/attorneys/attorney-${pad2(index + 1)}.png`;
}

export default function AboutPage() {
  const { language } = useLanguage();

  const { data: offices = [] } = useQuery<Office[]>({
    queryKey: ['/offices'],
  });

  const { data: attorneys = [] } = useQuery<Attorney[]>({
    queryKey: ['/attorneys'],
  });

  const stats = [
    {
      icon: Users,
      valueKo: '550+',
      valueEn: '550+',
      labelKo: '?�문 변?�사',
      labelEn: 'Professional Attorneys',
    },
    {
      icon: Building2,
      valueKo: '9',
      valueEn: '9',
      labelKo: '?�외 ?�무??,
      labelEn: 'Global Offices',
    },
    {
      icon: Globe,
      valueKo: '40+',
      valueEn: '40+',
      labelKo: '??경력',
      labelEn: 'Years of Excellence',
    },
    {
      icon: Award,
      valueKo: '1??,
      valueEn: '#1',
      labelKo: '�?�� 최�? 로펌',
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
              <h1
                className="text-5xl md:text-6xl font-serif font-bold mb-4"
                data-testid="text-about-hero-title"
              >
                {language === 'ko' ? '?�사 ?�개' : 'About QUEST Legal'}
              </h1>
              <p className="text-xl" data-testid="text-about-hero-subtitle">
                {language === 'ko'
                  ? 'QUEST Legal | ?�문 법률 ?�비??
                  : 'QUEST Legal | Professional Legal Services'}
              </p>
            </div>
          </div>
        </div>

        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <div>
                <h2
                  className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6"
                  data-testid="text-firm-overview-title"
                >
                  {language === 'ko' ? '법무법인 개요' : 'Firm Overview'}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p data-testid="text-firm-overview-p1">
                    {language === 'ko'
                      ? 'QUEST Legal?� 종합 법률 ?�비?��? ?�공?�는 ?�문 로펌 ?�사?�트?�니?? ?�양??법률 분야???�문?�을 갖춘 변?�사?�이 고객??법률 문제 ?�결???�해 최선???�합?�다.'
                      : 'QUEST Legal is a professional law firm website providing comprehensive legal services. Our attorneys with expertise across various legal practice areas are dedicated to resolving clients\' legal issues.'}
                  </p>
                  <p data-testid="text-firm-overview-p2">
                    {language === 'ko'
                      ? '기업법무, ?�송, �?��거래, 지?�재?�권 ???�양??분야�??�루�? ?�라?�언?�에�?최적??법률 ?�루?�을 ?�공?�는 것을 목표�??�니??'
                      : 'We cover various areas including corporate law, litigation, international transactions, and intellectual property, aiming to provide optimal legal solutions to clients.'}
                  </p>
                  <p data-testid="text-firm-overview-p3">
                    {language === 'ko'
                      ? '�??�사?�트??ZENTA LawFirm WebSite ?�루?�으�??�작?�었?�니?? ?�제 법률 ?�비?��? ?�요??경우 ?�문 변?�사?� 직접 ?�담?�시�?바랍?�다.'
                      : 'This website is built with ZENTA LawFirm WebSite solution. For actual legal services, please consult directly with a professional attorney.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="hover-elevate active-elevate-2 transition-all"
                    data-testid={`card-stat-${index}`}
                  >
                    <CardContent className="p-6 text-center">
                      <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <div
                        className="text-4xl font-bold text-foreground mb-2"
                        data-testid={`text-stat-value-${index}`}
                      >
                        {language === 'ko' ? stat.valueKo : stat.valueEn}
                      </div>
                      <div
                        className="text-sm text-muted-foreground"
                        data-testid={`text-stat-label-${index}`}
                      >
                        {language === 'ko' ? stat.labelKo : stat.labelEn}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-20">
              <h2
                className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-8"
                data-testid="text-global-offices-title"
              >
                {language === 'ko' ? '글로벌 ?�피?? : 'Global Offices'}
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
                          <h3
                            className="font-semibold text-foreground mb-2"
                            data-testid={`text-office-name-${office.id}`}
                          >
                            {language === 'ko' ? office.nameKo : office.nameEn}
                          </h3>
                          <p
                            className="text-sm text-muted-foreground"
                            data-testid={`text-office-address-${office.id}`}
                          >
                            {language === 'ko' ? office.addressKo : office.addressEn}
                          </p>
                          <span
                            className="inline-block mt-2 text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground"
                            data-testid={`text-office-type-${office.id}`}
                          >
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
              <h2
                className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-8"
                data-testid="text-key-attorneys-title"
              >
                {language === 'ko' ? '주요 구성?? : 'Key Attorneys'}
              </h2>

              {/* A?? ?�적 경로 직접 ?�용 */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {attorneys.slice(0, 8).map((attorney, index) => {
                  const localSrc = getLocalHeadshotPath(index);
                  const displayName =
                    language === 'ko' ? attorney.nameKo : attorney.nameEn;

                  return (
                    <div
                      key={attorney.id}
                      className="group"
                      data-testid={`card-attorney-${attorney.id}`}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-md mb-4 bg-muted">
                        <img
                          src={localSrc}
                          alt={displayName}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            // 만약 로컬 ?�일???�으�? 기존 API ?��?지�??�백
                            const target = e.currentTarget as HTMLImageElement;
                            if (attorney.imageUrl && target.src !== attorney.imageUrl) {
                              target.src = attorney.imageUrl;
                            }
                          }}
                        />
                      </div>
                      <h3
                        className="font-semibold text-foreground mb-1"
                        data-testid={`text-attorney-name-${attorney.id}`}
                      >
                        {displayName}
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
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
