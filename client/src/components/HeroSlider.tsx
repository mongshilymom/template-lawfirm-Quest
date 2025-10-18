import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&h=1080&fit=crop",
    titleKo: "기업지배 구조 전문 법률 서비스",
    titleEn: "Corporate Governance Legal Services",
    subtitleKo: "당신의 비즈니스를 이해하는 로펌",
    subtitleEn: "A firm that understands your business",
  },
  {
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop",
    titleKo: "분쟁과 규제의 변화에도 최적의 해법",
    titleEn: "Optimal solutions in shifting regulations",
    subtitleKo: "핵심 이슈를 정확히 짚습니다",
    subtitleEn: "We get to the crux",
  },
];

export function HeroSlider() {
  const [i, setI] = React.useState(0);
  const s = slides[i];
  const prev = () => setI((v) => (v - 1 + slides.length) % slides.length);
  const next = () => setI((v) => (v + 1) % slides.length);

  return (
    <section className="relative h-[68vh] md:h-[80vh]">
      <img src={s.img} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex items-center">
        <div className="text-white">
          <h1 className="text-3xl md:text-5xl font-serif font-bold md:leading-tight xl:whitespace-nowrap">
            {s.titleKo}
          </h1>
          <p className="mt-4 text-lg md:text-xl">{s.subtitleKo}</p>
        </div>
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full hover:bg-white"
        onClick={prev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full hover:bg-white"
        onClick={next}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
}
