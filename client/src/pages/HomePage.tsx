import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { HeroSlider } from '@/components/HeroSlider';
import { PracticeAreasSection } from '@/components/PracticeAreasSection';
import { NewsSection } from '@/components/NewsSection';
import { InsightsSection } from '@/components/InsightsSection';
import { Footer } from '@/components/Footer';
import type { PracticeArea, NewsItem, Newsletter } from '@shared/schema';

export default function HomePage() {
  const { data: practiceAreas = [], isLoading: isLoadingPractices } = useQuery<PracticeArea[]>({
    queryKey: ['/api/practice-areas'],
  });

  const { data: newsItems = [], isLoading: isLoadingNews } = useQuery<NewsItem[]>({
    queryKey: ['/api/news'],
  });

  const { data: newsletters = [], isLoading: isLoadingNewsletters } = useQuery<Newsletter[]>({
    queryKey: ['/api/newsletters'],
  });

  if (isLoadingPractices || isLoadingNews || isLoadingNewsletters) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSlider />
      <PracticeAreasSection practiceAreas={practiceAreas} />
      <NewsSection newsItems={newsItems} />
      <InsightsSection newsletters={newsletters} />
      <Footer />
    </div>
  );
}
