import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import type { PracticeArea } from '@shared/schema';

interface PracticeAreasSectionProps {
  practiceAreas: PracticeArea[];
}

export function PracticeAreasSection({ practiceAreas }: PracticeAreasSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();

  const itemsPerPage = 3;
  const totalPages = Math.ceil(practiceAreas.length / itemsPerPage);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - itemsPerPage));
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      Math.min(practiceAreas.length - itemsPerPage, prev + itemsPerPage)
    );
  };

  const visibleAreas = practiceAreas.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section id="practices" className="py-20 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground">
            {language === 'ko' ? 'Practices' : 'Practices'}
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              data-testid="button-practices-prev"
              className="rounded-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              disabled={currentIndex + itemsPerPage >= practiceAreas.length}
              data-testid="button-practices-next"
              className="rounded-md"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleAreas.map((area) => (
            <Card
              key={area.id}
              className="group hover-elevate active-elevate-2 overflow-hidden transition-all duration-300"
              data-testid={`card-practice-${area.id}`}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={area.imageUrl}
                  alt={language === 'ko' ? area.titleKo : area.titleEn}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
              </div>
              <CardContent className="p-6">
                <h3 
                  className="text-xl font-semibold text-foreground mb-3"
                  data-testid={`text-practice-title-${area.id}`}
                >
                  {language === 'ko' ? area.titleKo : area.titleEn}
                </h3>
                <p 
                  className="text-muted-foreground leading-relaxed mb-4"
                  data-testid={`text-practice-description-${area.id}`}
                >
                  {language === 'ko' ? area.descriptionKo : area.descriptionEn}
                </p>
                <Button
                  variant="ghost"
                  className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all p-0 h-auto"
                  data-testid={`button-learn-more-${area.id}`}
                >
                  <span>{language === 'ko' ? '?먯꽭??蹂닿린' : 'Learn More'}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="icon"
              onClick={() => setCurrentIndex(index * itemsPerPage)}
              className={`h-2 p-0 rounded-full transition-all hover:bg-transparent ${
                Math.floor(currentIndex / itemsPerPage) === index
                  ? 'w-12 bg-primary'
                  : 'w-2 bg-border'
              }`}
              data-testid={`button-page-${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
