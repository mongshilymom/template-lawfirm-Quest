import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { HeroSlider } from '@/components/HeroSlider';
import { PracticeAreasSection } from '@/components/PracticeAreasSection';
import { NewsSection } from '@/components/NewsSection';
import { InsightsSection } from '@/components/InsightsSection';
import { Footer } from '@/components/Footer';
import type { PracticeArea, NewsItem, Newsletter } from '@shared/schema';

export default function HomePage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LegalService",
      "name": "QUEST Legal",
      "description": "Professional legal services firm specializing in corporate law, litigation, and international transactions",
      "url": window.location.origin,
      "logo": `${window.location.origin}/logo.png`,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "152, Teheran-ro, Gangnam-gu",
        "addressLocality": "Seoul",
        "addressCountry": "KR"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+82-2-3404-0000",
        "contactType": "customer service",
        "email": "info@questlegal.co.kr"
      },
      "areaServed": ["KR", "Global"],
      "serviceType": ["Corporate Law", "Litigation", "International Trade", "Antitrust", "Tax", "Labor & Employment"]
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  const { data: practiceAreas = [], isLoading: isLoadingPractices } = useQuery<PracticeArea[]>({
    queryKey: ['/practice-areas'],
  });

  const { data: newsItems = [], isLoading: isLoadingNews } = useQuery<NewsItem[]>({
    queryKey: ['/news'],
  });

  const { data: newsletters = [], isLoading: isLoadingNewsletters } = useQuery<Newsletter[]>({
    queryKey: ['/newsletters'],
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
