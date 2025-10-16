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
        title: language === 'ko' ? '?�류' : 'Error',
        description: language === 'ko' ? '?�효???�메?�을 ?�력?�주?�요.' : 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/subscriptions', { email });

      toast({
        title: language === 'ko' ? '구독 ?�료' : 'Subscription Successful',
        description: language === 'ko' 
          ? '?�스?�터 구독???�료?�었?�니??'
          : 'You have successfully subscribed to our newsletter.',
      });
      setEmail('');
    } catch (error: any) {
      toast({
        title: language === 'ko' ? '?�류' : 'Error',
        description: error.message || (language === 'ko' ? '구독 �??�류가 발생?�습?�다.' : 'An error occurred during subscription.'),
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
        '?�문 법률 ?�비?��? ?�공?�는 종합 로펌 ?�사?�트?�니?? 기업법무, ?�송, �?��거래 ???�양??법률 분야�??�문?�로 ?�니??',
      descriptionEn:
        'A professional law firm website providing comprehensive legal services including corporate law, litigation, and international transactions.',
    },
    quickLinks: {
      titleKo: '바로가�?,
      titleEn: 'Quick Links',
      links: [
        { labelKo: '?�무 분야', labelEn: 'Practices', href: '#practices' },
        { labelKo: '?�스', labelEn: 'News', href: '#news' },
        { labelKo: '?�사?�트', labelEn: 'Insights', href: '#insights' },
        { labelKo: '?�사 ?�개', labelEn: 'About', href: '/about' },
      ],
    },
    contact: {
      titleKo: '문의',
      titleEn: 'Contact',
      items: [
        {
          icon: MapPin,
          textKo: '?�울 강남�??�트로폴리스',
          textEn: 'Centropolis, Gangnam, Seoul',
        },
        { icon: Phone, textKo: '+82-2-3404-0000', textEn: '+82-2-3404-0000' },
        { icon: Mail, textKo: 'info@questlegal.co.kr', textEn: 'info@questlegal.co.kr' },
      ],
    },
    offices: {
      titleKo: '글로벌 ?�피??,
      titleEn: 'Global Offices',
      locations: [
        { nameKo: '베이�?, nameEn: 'Beijing' },
        { nameKo: '?�하??, nameEn: 'Shanghai' },
        { nameKo: '?�콩', nameEn: 'Hong Kong' },
        { nameKo: '?�노??, nameEn: 'Hanoi' },
        { nameKo: '?�치�?, nameEn: 'Ho Chi Minh' },
        { nameKo: '?�바??, nameEn: 'Dubai' },
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
              {language === 'ko' ? '?�스?�터 구독' : 'Subscribe to Newsletter'}
            </h3>
            <p 
              className="text-muted-foreground mb-6"
              data-testid="text-newsletter-description"
            >
              {language === 'ko'
                ? '최신 법률 ?�향�??�사?�트�??�메?�로 받아보세??'
                : 'Receive the latest legal trends and insights via email.'}
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={language === 'ko' ? '?�메??주소' : 'Email address'}
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
                  ? (language === 'ko' ? '처리�?..' : 'Submitting...') 
                  : (language === 'ko' ? '구독?�기' : 'Subscribe')}
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
                ? '�??�이?�는 ZENTA LawFirm WebSite ?�루?�으�??�작?�었?�니?? ?�반?�인 법률 ?�보 ?�공???�한 것으�? 개별 ?�안???�??법률 ?�문???�닙?�다. 구체?�인 법률 ?�담?� 변?�사?� 직접 ?�담?�시�?바랍?�다.'
                : 'This website is built with ZENTA LawFirm WebSite solution. It provides general legal information only and does not constitute legal advice for individual cases. For specific legal consultation, please contact an attorney directly.'}
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
                {language === 'ko' ? '개인?�보처리방침' : 'Privacy Policy'}
              </a>
              <a
                href="#"
                data-testid="link-terms-of-service"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {language === 'ko' ? '?�용?��?' : 'Terms of Service'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
