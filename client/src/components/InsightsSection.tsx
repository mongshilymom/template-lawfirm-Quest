import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Newsletter } from '@shared/schema';

interface InsightsSectionProps {
  newsletters: Newsletter[];
}

export function InsightsSection({ newsletters }: InsightsSectionProps) {
  const { language } = useLanguage();

  return (
    <section id="insights" className="py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-12">
          INSIGHTS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsletters.slice(0, 9).map((newsletter) => (
            <Card
              key={newsletter.id}
              className="group overflow-hidden hover-elevate active-elevate-2 transition-all"
              data-testid={`card-newsletter-${newsletter.id}`}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={newsletter.imageUrl}
                  alt={language === 'ko' ? newsletter.titleKo : newsletter.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="bg-white/90 text-foreground mb-2" variant="secondary">
                    {language === 'ko' ? '뉴스레터' : 'Newsletter'}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-muted-foreground">{newsletter.date}</span>
                </div>
                <h3 
                  className="text-lg font-semibold text-foreground mb-3 line-clamp-2"
                  data-testid={`text-newsletter-title-${newsletter.id}`}
                >
                  {language === 'ko' ? newsletter.titleKo : newsletter.titleEn}
                </h3>
                <Button
                  variant="link"
                  className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all text-sm p-0 h-auto"
                  data-testid={`button-read-newsletter-${newsletter.id}`}
                >
                  <span>{language === 'ko' ? '자세히 보기' : 'Read More'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

