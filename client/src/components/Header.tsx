import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { pathKo: '#intro', pathEn: '#intro', labelKo: 'INTRO', labelEn: 'INTRO' },
    { pathKo: '#practices', pathEn: '#practices', labelKo: 'PRACTICES', labelEn: 'PRACTICES' },
    { pathKo: '#news', pathEn: '#news', labelKo: 'NEWS', labelEn: 'NEWS' },
    { pathKo: '#insights', pathEn: '#insights', labelKo: 'INSIGHTS', labelEn: 'INSIGHTS' },
    { pathKo: '/attorneys', pathEn: '/attorneys', labelKo: 'ATTORNEYS', labelEn: 'ATTORNEYS' },
    { pathKo: '/events', pathEn: '/events', labelKo: 'EVENTS', labelEn: 'EVENTS' },
    { pathKo: '/about', pathEn: '/about', labelKo: 'ABOUT', labelEn: 'ABOUT' },
    { pathKo: '/contact', pathEn: '/contact', labelKo: 'CONTACT', labelEn: 'CONTACT' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 hover-elevate active-elevate-2 px-4 py-2 rounded-md transition-colors cursor-pointer">
              <div className="text-2xl font-bold tracking-tight">
                <span className="text-foreground">QUEST</span>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => {
              const path = language === 'ko' ? item.pathKo : item.pathEn;
              const label = language === 'ko' ? item.labelKo : item.labelEn;
              const isActive = location === path || (path.startsWith('#') && location === '/');
              
              return path.startsWith('#') ? (
                <a
                  key={path}
                  href={path}
                  data-testid={`link-${item.labelEn.toLowerCase()}`}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                    isActive ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {label}
                </a>
              ) : (
                <Link key={path} href={path}>
                  <span
                    data-testid={`link-${item.labelEn.toLowerCase()}`}
                    className={`text-sm font-medium tracking-wide transition-colors hover:text-primary cursor-pointer ${
                      isActive ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              data-testid="button-language-toggle"
              className="rounded-md"
            >
              <Globe className="w-5 h-5" />
              <span className="sr-only">Language toggle</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => {
                const path = language === 'ko' ? item.pathKo : item.pathEn;
                const label = language === 'ko' ? item.labelKo : item.labelEn;
                
                return path.startsWith('#') ? (
                  <a
                    key={path}
                    href={path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`link-mobile-${item.labelEn.toLowerCase()}`}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    {label}
                  </a>
                ) : (
                  <Link key={path} href={path}>
                    <span
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-testid={`link-mobile-${item.labelEn.toLowerCase()}`}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2 cursor-pointer block"
                    >
                      {label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
