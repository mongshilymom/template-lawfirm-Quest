import React from "react";
import { Globe, Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Header() {
  const { language, toggleLanguage } = useLanguage();
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="font-serif text-xl font-bold text-foreground">QUEST Legal</a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="/about" className="hover:text-foreground">{language === "ko" ? "회사 소개" : "About"}</a>
          <a href="/contact" className="hover:text-foreground">{language === "ko" ? "문의" : "Contact"}</a>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            aria-label={`Switch to ${language === "ko" ? "English" : "한국어"}`}
            className="rounded-md p-2 hover:bg-gray-100"
          >
            <Globe className="w-5 h-5" />
          </button>

          <button
            className="md:hidden rounded-md p-2 hover:bg-gray-100"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="px-6 py-3 flex flex-col gap-3 text-sm">
            <a href="/about" onClick={() => setOpen(false)}>{language === "ko" ? "회사 소개" : "About"}</a>
            <a href="/contact" onClick={() => setOpen(false)}>{language === "ko" ? "문의" : "Contact"}</a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
