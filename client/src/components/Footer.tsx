import { useState } from 'react';
import { Link } from 'wouter';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiRequest } from '@/lib/queryClient';

export function Footer() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: language === 'ko' ? '오류' : 'Error',
        description: language === 'ko' ? '유효한 이메일을 입력해주세요.' : 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/subscriptions', { email });

      toast({
        title: language === 'ko' ? '구독 완료' : 'Subscription Successful',
        description: language === 'ko' 
          ? '뉴스레터 구독이 완료되었습니다.'
          : 'You have successfully subscribed to our newsletter.',
      });
      setEmail('');
    } catch (error: any) {
      toast({
        title: language === 'ko' ? '오류' : 'Error',
        description: error.message || (language === 'ko' ? '구독 중 오류가 발생했습니다.' : 'An error occurred during subscription.'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerSections = {
    about: {
      titleKo: 'QUEST Legal',
      titleEn: 'QUEST Legal',
      descriptionKo:
        '전문 법률 서비스를 제공하는 종합 로펌 템플릿입니다. 기업법무, 소송, 국제거래 등 다양한 법률 분야를 다루는 데모 사이트입니다.',
      descriptionEn:
        'A professional law firm website template. This is a demonstration site showcasing legal services including corporate law, litigation, and international transactions.',
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
        { icon: Mail, textKo: 'info@questlegal.co.kr', textEn: 'info@questlegal.co.kr' },
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
        <div className="mb-12 pb-12 border-b">
          <div className="max-w-2xl mx-auto text-center">
            <h3 
              className="text-2xl font-serif font-semibold text-foreground mb-4"
              data-testid="text-newsletter-title"
            >
              {language === 'ko' ? '뉴스레터 구독' : 'Subscribe to Newsletter'}
            </h3>
            <p 
              className="text-muted-foreground mb-6"
              data-testid="text-newsletter-description"
            >
              {language === 'ko'
                ? '최신 법률 동향과 인사이트를 이메일로 받아보세요.'
                : 'Receive the latest legal trends and insights via email.'}
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={language === 'ko' ? '이메일 주소' : 'Email address'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="input-newsletter-email"
                className="flex-1"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                data-testid="button-subscribe-newsletter"
              >
                {isSubmitting 
                  ? (language === 'ko' ? '처리중...' : 'Submitting...') 
                  : (language === 'ko' ? '구독하기' : 'Subscribe')}
              </Button>
            </form>
          </div>
        </div>

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
          <div className="mb-6 p-4 bg-muted/50 rounded-md">
            <p className="text-xs text-muted-foreground leading-relaxed" data-testid="text-disclaimer">
              {language === 'ko' 
                ? '본 사이트는 일반적인 법률 정보 제공 및 상담 예약을 위한 것으로, 개별 사안에 대한 법률 자문이 아닙니다. 구체적인 사건 판단과 대응은 변호사와의 직접 상담이 필요합니다. 본 사이트는 데모 템플릿이며 교육 및 시연 목적으로만 제공됩니다.'
                : 'This website provides general legal information and consultation booking only. It does not constitute legal advice for individual cases. Specific case analysis and response require direct consultation with an attorney. This is a demonstration template provided for educational purposes only.'}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p 
              className="text-sm text-muted-foreground"
              data-testid="text-copyright"
            >
              © 2025 QUEST Legal. All rights reserved.
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
