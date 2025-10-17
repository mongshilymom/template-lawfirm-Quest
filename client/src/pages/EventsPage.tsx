import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Event } from '@shared/schema';

export default function EventsPage() {
  const { language } = useLanguage();
  const [location, setLocation] = useLocation();
  const isNavigatingRef = useRef(false);

  const params = new URLSearchParams(window.location.search);
  const [selectedType, setSelectedType] = useState<string>(params.get('type') || 'all');

  const { data: events = [], isLoading } = useQuery<Event[]>({
    queryKey: ['/events'],
  });

  const eventTypes = [
    { value: 'all', labelKo: '전체', labelEn: 'All' },
    { value: 'Seminar', labelKo: '세미나', labelEn: 'Seminar' },
    { value: 'Workshop', labelKo: '워크숍', labelEn: 'Workshop' },
    { value: 'Conference', labelKo: '컨퍼런스', labelEn: 'Conference' },
    { value: 'Webinar', labelKo: '웨비나', labelEn: 'Webinar' },
  ];

  const filteredEvents =
    selectedType === 'all' ? events : events.filter((event) => event.type === selectedType);

  const upcomingEvents = filteredEvents.filter(
    (event) => new Date(event.date) >= new Date()
  );
  const pastEvents = filteredEvents.filter(
    (event) => new Date(event.date) < new Date()
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlType = params.get('type') || 'all';

    if (urlType !== selectedType) {
      isNavigatingRef.current = true;
      setSelectedType(urlType);
      setTimeout(() => { isNavigatingRef.current = false; }, 0);
    }
  }, [location]);

  useEffect(() => {
    if (isNavigatingRef.current) return;

    const params = new URLSearchParams();
    if (selectedType !== 'all') params.set('type', selectedType);

    const newSearch = params.toString();
    const currentPath = window.location.pathname;
    const newUrl = newSearch ? `${currentPath}?${newSearch}` : currentPath;
    const currentUrl = window.location.pathname + window.location.search;

    if (currentUrl !== newUrl) {
      setLocation(newUrl);
    }
  }, [selectedType, setLocation]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-20">
        <div
          className="relative h-96 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=600&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-foreground/70" />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1
                className="text-5xl md:text-6xl font-serif font-bold mb-4"
                data-testid="text-events-hero-title"
              >
                {language === 'ko' ? '세미나 & 이벤트' : 'Seminars & Events'}
              </h1>
              <p
                className="text-xl"
                data-testid="text-events-hero-subtitle"
              >
                {language === 'ko'
                  ? '최신 법률 동향과 실무 지식을 공유합니다'
                  : 'Sharing Latest Legal Trends and Practical Knowledge'}
              </p>
            </div>
          </div>
        </div>

        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-12">
              <div className="flex flex-wrap gap-3">
                {eventTypes.map((type) => (
                  <Badge
                    key={type.value}
                    variant={selectedType === type.value ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-2 text-sm hover-elevate active-elevate-2"
                    onClick={() => setSelectedType(type.value)}
                    data-testid={`button-filter-${type.value}`}
                  >
                    {language === 'ko' ? type.labelKo : type.labelEn}
                  </Badge>
                ))}
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {language === 'ko' ? '로딩 중...' : 'Loading...'}
                </p>
              </div>
            ) : (
              <>
                {upcomingEvents.length > 0 && (
                  <div className="mb-16">
                    <h2
                      className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-8"
                      data-testid="text-upcoming-events-title"
                    >
                      {language === 'ko' ? '예정된 이벤트' : 'Upcoming Events'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {upcomingEvents.map((event) => (
                        <Card
                          key={event.id}
                          className="hover-elevate active-elevate-2 transition-all overflow-hidden"
                          data-testid={`card-event-${event.id}`}
                        >
                          <div className="relative h-48">
                            <img
                              src={event.imageUrl}
                              alt={language === 'ko' ? event.titleKo : event.titleEn}
                              className="w-full h-full object-cover"
                            />
                            <Badge
                              className="absolute top-4 right-4"
                              data-testid={`badge-event-type-${event.id}`}
                            >
                              {event.type}
                            </Badge>
                          </div>
                          <CardContent className="p-6">
                            <h3
                              className="text-xl font-semibold text-foreground mb-3"
                              data-testid={`text-event-title-${event.id}`}
                            >
                              {language === 'ko' ? event.titleKo : event.titleEn}
                            </h3>
                            <p
                              className="text-muted-foreground mb-4 line-clamp-2"
                              data-testid={`text-event-description-${event.id}`}
                            >
                              {language === 'ko' ? event.descriptionKo : event.descriptionEn}
                            </p>
                            <div className="space-y-2 mb-4">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span data-testid={`text-event-date-${event.id}`}>
                                  {event.date}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4 text-primary" />
                                <span data-testid={`text-event-time-${event.id}`}>
                                  {event.time}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span data-testid={`text-event-location-${event.id}`}>
                                  {event.location}
                                </span>
                              </div>
                            </div>
                            {event.registrationUrl && (
                              <Button
                                variant="default"
                                className="w-full"
                                data-testid={`button-register-${event.id}`}
                              >
                                <span>
                                  {language === 'ko' ? '등록하기' : 'Register'}
                                </span>
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {pastEvents.length > 0 && (
                  <div>
                    <h2
                      className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-8"
                      data-testid="text-past-events-title"
                    >
                      {language === 'ko' ? '지난 이벤트' : 'Past Events'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {pastEvents.map((event) => (
                        <Card
                          key={event.id}
                          className="hover-elevate active-elevate-2 transition-all opacity-75"
                          data-testid={`card-past-event-${event.id}`}
                        >
                          <CardContent className="p-6">
                            <Badge className="mb-3" variant="secondary">
                              {event.type}
                            </Badge>
                            <h3
                              className="text-lg font-semibold text-foreground mb-2"
                              data-testid={`text-past-event-title-${event.id}`}
                            >
                              {language === 'ko' ? event.titleKo : event.titleEn}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>{event.date}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {filteredEvents.length === 0 && !isLoading && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      {language === 'ko'
                        ? '해당하는 이벤트가 없습니다.'
                        : 'No events found.'}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
