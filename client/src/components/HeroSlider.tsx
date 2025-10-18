import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const heroSlides = [
  {
    imageUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop',
    // ?붽뎄?ы빆: '湲곗뾽吏諛?援ъ“ ?꾨Ц 踰뺣쪧 ?쒕퉬??
    titleKo: '湲곗뾽吏諛?援ъ“ ?꾨Ц 踰뺣쪧 ?쒕퉬??,
    titleEn: 'Corporate Governance Legal Services',
    subtitleKo: '蹂?뷀븯???곗뾽쨌洹쒖젣 ?섍꼍 ?띿뿉?쒕룄 理쒖쟻??諛⑺뼢???쒖떆?⑸땲??,
    subtitleEn: 'Providing optimal solutions in changing regulatory environments',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop',
    titleKo: '湲濡쒕쾶 ?ㅽ듃?뚰겕',
    titleEn: 'Global Network',
    subtitleKo: '9媛??댁쇅 ?щТ?뚮? ?듯븳 援?젣 踰뺣쪧 ?쒕퉬??,
    subtitleEn: 'International legal services through 9 global offices',
  },
  {
    imageUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop',
    // ?붽뎄?ы빆: '550?щ챸???꾨Ц媛' ???泥?    titleKo: '?뱀떊??鍮꾩쫰?덉뒪瑜??댄빐?섎뒗 濡쒗럩',
    titleEn: 'A Law Firm That Understands Your Business',
    subtitleKo: '?띾???寃쏀뿕怨??꾨Ц?깆쓣 諛뷀깢?쇰줈 怨좉컼 留욎땄???붾（???쒓났',
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

      {/* ?쇱そ ?붿궡??*/}
      <button
        type="button"
        onClick={goToPrevious}
        aria-label="?댁쟾 ?щ씪?대뱶"
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

      {/* ?ㅻⅨ履??붿궡??- 醫뚰몴 異⑸룎 諛⑹? ?꾪빐 left-auto 紐낆떆 */}
      <button
        type="button"
        onClick={goToNext}
        aria-label="?ㅼ쓬 ?щ씪?대뱶"
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

      {/* ?몃뵒耳?댄꽣 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`${index + 1}踰??щ씪?대뱶濡??대룞`}
            data-testid={`button-slide-${index}`}
            className={`
              h-2 p-0 rounded-full transition-all
              ${index === currentSlide ? 'w-12 bg-white' : 'w-2 bg-white/50'}
            `}
          />
        ))}
      </div>

      {/* ?붽뎄?ы빆: ?ㅽ겕濡??덈궡 臾멸뎄 ?쒓굅??*/}
    </div>
  );
}
