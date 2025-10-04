import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useRoute } from 'wouter';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const [location, navigate] = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscKey);
      const firstFocusable = mobileMenuRef.current?.querySelector('a') as HTMLElement;
      firstFocusable?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMobileMenuOpen]);

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

          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {menuItems.map((item) => {
              const path = language === 'ko' ? item.pathKo : item.pathEn;
              const label = language === 'ko' ? item.labelKo : item.labelEn;
              const isActive = location === path || (path.startsWith('#') && location === '/');
              
              return path.startsWith('#') ? (
                <a
                  key={path}
                  href={path}
                  data-testid={`link-${item.labelEn.toLowerCase()}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm ${
                    isActive ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {label}
                </a>
              ) : (
                <Link key={path} href={path}>
                  <span
                    data-testid={`link-${item.labelEn.toLowerCase()}`}
                    aria-current={isActive ? 'page' : undefined}
                    tabIndex={0}
                    className={`text-sm font-medium tracking-wide transition-colors hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm cursor-pointer ${
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
              aria-label={`Switch to ${language === 'ko' ? 'English' : '한국어'}`}
              className="rounded-md"
            >
              <Globe className="w-5 h-5" />
              <span className="sr-only">{`Switch to ${language === 'ko' ? 'English' : '한국어'}`}</span>
            </Button>

            <Button
              ref={mobileMenuButtonRef}
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div 
            ref={mobileMenuRef}
            id="mobile-menu"
            className="md:hidden py-4 border-t"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-4">
              {menuItems.map((item, index) => {
                const path = language === 'ko' ? item.pathKo : item.pathEn;
                const label = language === 'ko' ? item.labelKo : item.labelEn;
                const isFirst = index === 0;
                const isLast = index === menuItems.length - 1;
                
                const handleKeyDown = (e: any) => {
                  if (e.key === 'Tab' && !e.shiftKey && isLast) {
                    e.preventDefault();
                    const firstLink = mobileMenuRef.current?.querySelector('a') as HTMLElement;
                    firstLink?.focus();
                  } else if (e.key === 'Tab' && e.shiftKey && isFirst) {
                    e.preventDefault();
                    const allLinks = mobileMenuRef.current?.querySelectorAll('a');
                    const lastLink = allLinks?.[allLinks.length - 1] as HTMLElement;
                    lastLink?.focus();
                  }
                };

                const handleClick = (e: any) => {
                  if (!path.startsWith('#')) {
                    e.preventDefault();
                    navigate(path);
                  }
                  setIsMobileMenuOpen(false);
                };
                
                return (
                  <a
                    key={path}
                    href={path}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    data-testid={`link-mobile-${item.labelEn.toLowerCase()}`}
                    className="text-sm font-medium text-foreground hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-sm transition-colors py-2"
                  >
                    {label}
                  </a>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
