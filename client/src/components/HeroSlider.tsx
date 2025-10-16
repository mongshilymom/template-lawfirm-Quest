import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const heroSlides = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop',
    // 요구사항: '기업지배 구조 전문 법률 서비스'
    titleKo: '기업지배 구조 전문 법률 서비스',
    titleEn: 'Corporate Governance Legal Services',
    subtitleKo: '변화하는 산업·규제 환경 속에서도 최적의 방향을 제시합니다',
    subtitleEn: 'Providing optimal solutions in changing regulatory environments',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
    titleKo: '글로벌 네트워크',
    titleEn: 'Global Network',
    subtitleKo: '9개 해외 사무소를 통한 국제 법률 서비스',
    subtitleEn: 'International legal services through 9 global offices',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
    // 요구사항: '550여명의 전문가' → 대체
    titleKo: '당신의 비즈니스를 이해하는 로펌',
    titleEn: 'A Law Firm That Understands Your Business',
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
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/70"
            aria-hidden="true"
          />

          <div className="relative h-full flex items-center justify-center">
            <div className="mx-auto px-6 lg:px-8 text-center w-full max-w-6xl">
              <h1
                className="
                  font-bold text-white mb-6 leading-tight tracking-tight
                  text-4xl md:text-6xl lg:text-7xl
                  whitespace-normal xl:whitespace-nowrap
                "
                data-testid={`hero-title-${index}`}
              >
                {language === 'ko' ? slide.titleKo : slide.titleEn}
              </h1>

              <p
                className="text-base md:text-xl lg:text-2xl text-white/90 leading-relaxed"
                data-testid={`hero-subtitle-${index}`}
              >
                {language === 'ko' ? slide.subtitleKo : slide.subtitleEn}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* 왼쪽 화살표 */}
      <button
        type="button"
        onClick={goToPrevious}
        aria-label="이전 슬라이드"
        data-testid="button-prev-slide"
        className="
          absolute top-1/2 -translate-y-1/2 right-auto left-4 md:left-6 lg:left-8
          z-20 grid place-items-center w-12 h-12 rounded-full
          bg-white/20 hover:bg-white/30 backdrop-blur
          text-white transition focus:outline-none
          focus-visible:ring-2 focus-visible:ring-white/80
        "
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* 오른쪽 화살표 - 좌표 충돌 방지 위해 left-auto 명시 */}
      <button
        type="button"
        onClick={goToNext}
        aria-label="다음 슬라이드"
        data-testid="button-next-slide"
        className="
          absolute top-1/2 -translate-y-1/2 left-auto right-4 md:right-6 lg:right-8
          z-20 grid place-items-center w-12 h-12 rounded-full
          bg-white/20 hover:bg-white/30 backdrop-blur
          text-white transition focus:outline-none
          focus-visible:ring-2 focus-visible:ring-white/80
        "
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`${index + 1}번 슬라이드로 이동`}
            data-testid={`button-slide-${index}`}
            className={`
              h-2 p-0 rounded-full transition-all
              ${index === currentSlide ? 'w-12 bg-white' : 'w-2 bg-white/50'}
            `}
          />
        ))}
      </div>

      {/* 요구사항: 스크롤 안내 문구 제거됨 */}
    </div>
  );
}
