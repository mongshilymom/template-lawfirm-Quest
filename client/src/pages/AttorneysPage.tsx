import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Attorney, PracticeArea, Office } from '@shared/schema';

export default function AttorneysPage() {
  const { language } = useLanguage();
  const [location, setLocation] = useLocation();
  const isNavigatingRef = useRef(false);
  
  const params = new URLSearchParams(window.location.search);
  const [searchQuery, setSearchQuery] = useState(params.get('search') || '');
  const [selectedPracticeArea, setSelectedPracticeArea] = useState<string>(
    params.get('practiceArea') || 'all'
  );
  const [selectedOffice, setSelectedOffice] = useState<string>(params.get('office') || 'all');

  const { data: attorneys = [], isLoading: isLoadingAttorneys } = useQuery<Attorney[]>({
    queryKey: ['/attorneys'],
  });

  const { data: practiceAreas = [] } = useQuery<PracticeArea[]>({
    queryKey: ['/practice-areas'],
  });

  const { data: offices = [] } = useQuery<Office[]>({
    queryKey: ['/offices'],
  });

  const filteredAttorneys = attorneys.filter((attorney) => {
    const matchesSearch = searchQuery
      ? (language === 'ko' ? attorney.nameKo : attorney.nameEn)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (language === 'ko'
          ? attorney.practiceAreasKo.join(' ')
          : attorney.practiceAreasEn.join(' ')
        )
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      : true;

    const matchesPracticeArea =
      selectedPracticeArea === 'all'
        ? true
        : (language === 'ko' ? attorney.practiceAreasKo : attorney.practiceAreasEn).some(
            (area) => area === selectedPracticeArea
          );

    const matchesOffice =
      selectedOffice === 'all' ? true : attorney.office === selectedOffice;

    return matchesSearch && matchesPracticeArea && matchesOffice;
  });

  const uniquePracticeAreas = Array.from(
    new Set(
      attorneys.flatMap((a) =>
        language === 'ko' ? a.practiceAreasKo : a.practiceAreasEn
      )
    )
  ).sort();

  const uniqueOffices = Array.from(new Set(attorneys.map((a) => a.office))).sort();

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedPracticeArea('all');
    setSelectedOffice('all');
  };

  const hasActiveFilters =
    searchQuery || selectedPracticeArea !== 'all' || selectedOffice !== 'all';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSearch = params.get('search') || '';
    const urlPracticeArea = params.get('practiceArea') || 'all';
    const urlOffice = params.get('office') || 'all';
    
    if (urlSearch !== searchQuery || urlPracticeArea !== selectedPracticeArea || urlOffice !== selectedOffice) {
      isNavigatingRef.current = true;
      setSearchQuery(urlSearch);
      setSelectedPracticeArea(urlPracticeArea);
      setSelectedOffice(urlOffice);
      setTimeout(() => { isNavigatingRef.current = false; }, 0);
    }
  }, [location]);

  useEffect(() => {
    if (isNavigatingRef.current) return;
    
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedPracticeArea !== 'all') params.set('practiceArea', selectedPracticeArea);
    if (selectedOffice !== 'all') params.set('office', selectedOffice);
    
    const newSearch = params.toString();
    const currentPath = window.location.pathname;
    const newUrl = newSearch ? `${currentPath}?${newSearch}` : currentPath;
    const currentUrl = window.location.pathname + window.location.search;
    
    if (currentUrl !== newUrl) {
      setLocation(newUrl);
    }
  }, [searchQuery, selectedPracticeArea, selectedOffice, setLocation]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-20">
        <div
          className="relative h-96 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=600&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-foreground/70" />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1
                className="text-5xl md:text-6xl font-serif font-bold mb-4"
                data-testid="text-attorneys-hero-title"
              >
                {language === 'ko' ? '변호사 검색' : 'Find an Attorney'}
              </h1>
              <p
                className="text-xl"
                data-testid="text-attorneys-hero-subtitle"
              >
                {language === 'ko'
                  ? '550여명의 전문 변호사와 함께합니다'
                  : '550+ Professional Attorneys'}
              </p>
            </div>
          </div>
        </div>

        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12 space-y-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={
                    language === 'ko'
                      ? '변호사 이름 또는 업무분야로 검색...'
                      : 'Search by name or practice area...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12"
                  data-testid="input-search-attorney"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    {language === 'ko' ? '업무분야' : 'Practice Area'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={selectedPracticeArea === 'all' ? 'default' : 'outline'}
                      className="cursor-pointer px-4 py-2 hover-elevate active-elevate-2"
                      onClick={() => setSelectedPracticeArea('all')}
                      data-testid="button-filter-practice-all"
                    >
                      {language === 'ko' ? '전체' : 'All'}
                    </Badge>
                    {uniquePracticeAreas.map((area) => (
                      <Badge
                        key={area}
                        variant={selectedPracticeArea === area ? 'default' : 'outline'}
                        className="cursor-pointer px-4 py-2 hover-elevate active-elevate-2"
                        onClick={() => setSelectedPracticeArea(area)}
                        data-testid={`button-filter-practice-${area}`}
                      >
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    {language === 'ko' ? '오피스' : 'Office'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={selectedOffice === 'all' ? 'default' : 'outline'}
                      className="cursor-pointer px-4 py-2 hover-elevate active-elevate-2"
                      onClick={() => setSelectedOffice('all')}
                      data-testid="button-filter-office-all"
                    >
                      {language === 'ko' ? '전체' : 'All'}
                    </Badge>
                    {uniqueOffices.map((office) => (
                      <Badge
                        key={office}
                        variant={selectedOffice === office ? 'default' : 'outline'}
                        className="cursor-pointer px-4 py-2 hover-elevate active-elevate-2"
                        onClick={() => setSelectedOffice(office)}
                        data-testid={`button-filter-office-${office}`}
                      >
                        {office}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex items-center justify-between py-3 border-t">
                  <p className="text-sm text-muted-foreground">
                    {language === 'ko'
                      ? `${filteredAttorneys.length}명의 변호사를 찾았습니다`
                      : `Found ${filteredAttorneys.length} attorney(s)`}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    data-testid="button-clear-filters"
                  >
                    <X className="w-4 h-4 mr-2" />
                    {language === 'ko' ? '필터 초기화' : 'Clear Filters'}
                  </Button>
                </div>
              )}
            </div>

            {isLoadingAttorneys ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {language === 'ko' ? '로딩 중...' : 'Loading...'}
                </p>
              </div>
            ) : filteredAttorneys.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredAttorneys.map((attorney) => (
                  <Card
                    key={attorney.id}
                    className="hover-elevate active-elevate-2 transition-all group"
                    data-testid={`card-attorney-${attorney.id}`}
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-[3/4] overflow-hidden rounded-t-md bg-muted">
                        <img
                          src={attorney.imageUrl}
                          alt={language === 'ko' ? attorney.nameKo : attorney.nameEn}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3
                          className="font-semibold text-foreground mb-1"
                          data-testid={`text-attorney-name-${attorney.id}`}
                        >
                          {language === 'ko' ? attorney.nameKo : attorney.nameEn}
                        </h3>
                        <p
                          className="text-sm text-muted-foreground mb-2"
                          data-testid={`text-attorney-title-${attorney.id}`}
                        >
                          {language === 'ko' ? attorney.titleKo : attorney.titleEn}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {(language === 'ko'
                            ? attorney.practiceAreasKo.slice(0, 2)
                            : attorney.practiceAreasEn.slice(0, 2)
                          ).map((area, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">{attorney.office}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {language === 'ko'
                    ? '검색 결과가 없습니다.'
                    : 'No attorneys found matching your criteria.'}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
