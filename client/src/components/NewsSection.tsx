import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { NewsItem } from '@shared/schema';

interface NewsSectionProps {
  newsItems: NewsItem[];
}

export function NewsSection({ newsItems }: NewsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { language } = useLanguage();

  const categories = [
    { value: 'all', labelKo: '전체', labelEn: 'All' },
    { value: 'Select Topics', labelKo: 'Select Topics', labelEn: 'Select Topics' },
    { value: 'Awards', labelKo: 'Awards', labelEn: 'Awards' },
    { value: '법인소식', labelKo: '법인소식', labelEn: 'Firm News' },
  ];

  const filteredNews =
    selectedCategory === 'all'
      ? newsItems
      : newsItems.filter((item) => item.category === selectedCategory);

  const featuredNews = filteredNews[0];
  const regularNews = filteredNews.slice(1, 7);

  return (
    <section id="news" className="py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-8">
            NEWS
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Badge
                key={category.value}
                variant={selectedCategory === category.value ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2 text-sm hover-elevate active-elevate-2"
                onClick={() => setSelectedCategory(category.value)}
                data-testid={`button-category-${category.value}`}
              >
                {language === 'ko' ? category.labelKo : category.labelEn}
              </Badge>
            ))}
          </div>
        </div>

        {filteredNews.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {featuredNews && (
              <Card
                className="lg:col-span-2 overflow-hidden hover-elevate active-elevate-2 transition-all"
                data-testid={`card-news-featured-${featuredNews.id}`}
              >
                <div className="grid md:grid-cols-2 h-full">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <img
                      src={featuredNews.imageUrl}
                      alt={language === 'ko' ? featuredNews.titleKo : featuredNews.titleEn}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <Badge variant="secondary">{featuredNews.category}</Badge>
                        <span className="text-sm text-muted-foreground">{featuredNews.date}</span>
                      </div>
                      <h3 
                        className="text-2xl font-semibold text-foreground mb-4"
                        data-testid={`text-news-title-${featuredNews.id}`}
                      >
                        {language === 'ko' ? featuredNews.titleKo : featuredNews.titleEn}
                      </h3>
                      {featuredNews.descriptionKo && (
                        <p 
                          className="text-muted-foreground leading-relaxed"
                          data-testid={`text-news-description-${featuredNews.id}`}
                        >
                          {language === 'ko'
                            ? featuredNews.descriptionKo
                            : featuredNews.descriptionEn}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all mt-4 p-0 h-auto"
                      data-testid={`button-read-more-${featuredNews.id}`}
                    >
                      <span>{language === 'ko' ? '자세히 보기' : 'Read More'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </div>
              </Card>
            )}

            <div className="lg:col-span-1 grid gap-6">
              {regularNews.slice(0, 2).map((news) => (
                <Card
                  key={news.id}
                  className="overflow-hidden hover-elevate active-elevate-2 transition-all"
                  data-testid={`card-news-${news.id}`}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={news.imageUrl}
                      alt={language === 'ko' ? news.titleKo : news.titleEn}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {news.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{news.date}</span>
                    </div>
                    <h3 
                      className="text-base font-semibold text-foreground line-clamp-2"
                      data-testid={`text-news-title-${news.id}`}
                    >
                      {language === 'ko' ? news.titleKo : news.titleEn}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regularNews.slice(2).map((news) => (
            <Card
              key={news.id}
              className="overflow-hidden hover-elevate active-elevate-2 transition-all"
              data-testid={`card-news-${news.id}`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={news.imageUrl}
                  alt={language === 'ko' ? news.titleKo : news.titleEn}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-xs">
                    {news.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{news.date}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground line-clamp-2">
                  {language === 'ko' ? news.titleKo : news.titleEn}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
