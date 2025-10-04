import { Link } from 'wouter';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { language } = useLanguage();

  const footerSections = {
    about: {
      titleKo: '법무법인(유한) 태평양',
      titleEn: 'Bae, Kim & Lee LLC',
      descriptionKo:
        '1980년 설립된 대한민국 최대 규모의 종합 법률 서비스 기관으로, 550여명의 변호사와 9개의 해외 사무소를 통해 글로벌 법률 서비스를 제공합니다.',
      descriptionEn:
        'Founded in 1980, we are Korea\'s largest full-service law firm providing global legal services through 550+ attorneys and 9 international offices.',
    },
    quickLinks: {
      titleKo: '바로가기',
      titleEn: 'Quick Links',
      links: [
        { labelKo: '업무 분야', labelEn: 'Practices', href: '#practices' },
        { labelKo: '뉴스', labelEn: 'News', href: '#news' },
        { labelKo: '인사이트', labelEn: 'Insights', href: '#insights' },
        { labelKo: '회사 소개', labelEn: 'About', href: '/about' },
      ],
    },
    contact: {
      titleKo: '문의',
      titleEn: 'Contact',
      items: [
        {
          icon: MapPin,
          textKo: '서울 강남구 센트로폴리스',
          textEn: 'Centropolis, Gangnam, Seoul',
        },
        { icon: Phone, textKo: '+82-2-3404-0000', textEn: '+82-2-3404-0000' },
        { icon: Mail, textKo: 'info@bkl.co.kr', textEn: 'info@bkl.co.kr' },
      ],
    },
    offices: {
      titleKo: '글로벌 오피스',
      titleEn: 'Global Offices',
      locations: [
        { nameKo: '베이징', nameEn: 'Beijing' },
        { nameKo: '상하이', nameEn: 'Shanghai' },
        { nameKo: '홍콩', nameEn: 'Hong Kong' },
        { nameKo: '하노이', nameEn: 'Hanoi' },
        { nameKo: '호치민', nameEn: 'Ho Chi Minh' },
        { nameKo: '두바이', nameEn: 'Dubai' },
      ],
    },
  };

  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 
              className="text-lg font-semibold text-foreground mb-4"
              data-testid="text-footer-about-title"
            >
              {language === 'ko' ? footerSections.about.titleKo : footerSections.about.titleEn}
            </h3>
            <p 
              className="text-sm text-muted-foreground leading-relaxed"
              data-testid="text-footer-about-description"
            >
              {language === 'ko'
                ? footerSections.about.descriptionKo
                : footerSections.about.descriptionEn}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {language === 'ko'
                ? footerSections.quickLinks.titleKo
                : footerSections.quickLinks.titleEn}
            </h3>
            <ul className="space-y-3">
              {footerSections.quickLinks.links.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      data-testid={`link-footer-${link.labelEn.toLowerCase().replace(' ', '-')}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {language === 'ko' ? link.labelKo : link.labelEn}
                    </a>
                  ) : (
                    <Link href={link.href}>
                      <span 
                        data-testid={`link-footer-${link.labelEn.toLowerCase().replace(' ', '-')}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                      >
                        {language === 'ko' ? link.labelKo : link.labelEn}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {language === 'ko'
                ? footerSections.contact.titleKo
                : footerSections.contact.titleEn}
            </h3>
            <ul className="space-y-3">
              {footerSections.contact.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <item.icon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span 
                    className="text-sm text-muted-foreground"
                    data-testid={`text-contact-${index}`}
                  >
                    {language === 'ko' ? item.textKo : item.textEn}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {language === 'ko'
                ? footerSections.offices.titleKo
                : footerSections.offices.titleEn}
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {footerSections.offices.locations.map((location, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Globe className="w-3 h-3 text-primary flex-shrink-0" />
                  <span 
                    className="text-sm text-muted-foreground"
                    data-testid={`text-office-${index}`}
                  >
                    {language === 'ko' ? location.nameKo : location.nameEn}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p 
              className="text-sm text-muted-foreground"
              data-testid="text-copyright"
            >
              © 2025 Bae, Kim & Lee LLC. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                data-testid="link-privacy-policy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {language === 'ko' ? '개인정보처리방침' : 'Privacy Policy'}
              </a>
              <a
                href="#"
                data-testid="link-terms-of-service"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {language === 'ko' ? '이용약관' : 'Terms of Service'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
