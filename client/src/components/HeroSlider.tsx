import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const heroSlides = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop',
    titleKo: '기업지배구조 전문 법률 서비스',
    titleEn: 'Corporate Governance Legal Services',
    subtitleKo: '변화하는 산업·규제 환경 속에서도 최적의 방향을 제시합니다',
    subtitleEn: 'Providing optimal solutions in changing regulatory environments',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
    titleKo: '글로벌 네트워크',
    titleEn: 'Global Network',
    subtitleKo: '9개 해외 사무소를 통한 국제 법률 서비스',
    subtitleEn: 'International legal services through 9 global offices',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
    titleKo: '550여명의 전문가',
    titleEn: '550+ Legal Professionals',
    subtitleKo: '풍부한 경험과 전문성을 바탕으로 고객 맞춤형 솔루션 제공',
    subtitleEn: 'Customized solutions based on extensive experience and expertise',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden" data-testid="hero-slider">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/70" />
          
          <div className="relative h-full flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                data-testid={`hero-title-${index}`}
              >
                {language === 'ko' ? slide.titleKo : slide.titleEn}
              </h1>
              <p 
                className="text-xl md:text-2xl text-white/90 leading-relaxed"
                data-testid={`hero-subtitle-${index}`}
              >
                {language === 'ko' ? slide.subtitleKo : slide.subtitleEn}
              </p>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        data-testid="button-prev-slide"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full h-12 w-12"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        data-testid="button-next-slide"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full h-12 w-12"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {heroSlides.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            onClick={() => goToSlide(index)}
            data-testid={`button-slide-${index}`}
            className={`h-2 p-0 rounded-full transition-all hover:bg-transparent ${
              index === currentSlide ? 'w-12 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
        <a
          href="#practices"
          data-testid="link-scroll-down"
          className="text-white text-sm tracking-widest flex flex-col items-center gap-2 hover-elevate active-elevate-2 px-4 py-2 rounded-md"
        >
          <span>{language === 'ko' ? 'SCROLL' : 'SCROLL'}</span>
          <span className="text-xs opacity-80">
            {language === 'ko' ? '화면을 아래로 스크롤 하세요' : 'Scroll down'}
          </span>
        </a>
      </div>
    </div>
  );
}
