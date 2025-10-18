import { useLanguage } from '@/contexts/LanguageContext';

const names = [
  ['배영민','Youngmin Bae'],
  ['김현성','Hyunsung Kim'],
  ['이정윤','Jungyoon Lee'],
  ['박지현','Jihyun Park'],
  ['최민호','Minho Choi'],
  ['정수연','Suyeon Jung'],
  ['강민준','Minjun Kang'],
  ['윤서현','Seohyun Yoon'],
];

function srcByIndex(i: number) {
  const n = String(i + 1).padStart(2, '0');
  return `/images/attorneys/attorney-${n}.png`;
}

export default function FeaturedAttorneysHome() {
  const { language } = useLanguage();
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-serif font-semibold">
          {language === 'ko' ? '주요 구성원' : 'Key Attorneys'}
        </h2>
        <span className="text-sm text-muted-foreground">
          {language === 'ko' ? '총 8명' : '8 members'}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {names.map(([ko, en], i) => (
          <article key={i} className="group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
              <img
                src={srcByIndex(i)}
                alt={language === 'ko' ? ko : en}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-3 font-semibold text-foreground">{language === 'ko' ? ko : en}</h3>
            <p className="text-sm text-muted-foreground">{language === 'ko' ? '파트너변호사' : 'Partner'}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
