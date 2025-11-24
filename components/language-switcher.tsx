"use client";

import { Button } from "@/components/ui/button";
import type { Language } from "@/lib/translations";

interface LanguageSwitcherProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function LanguageSwitcher({
  language,
  onLanguageChange,
}: LanguageSwitcherProps) {
  const toggleLanguage = () => {
    onLanguageChange(language === "en" ? "ko" : "en");
  };

  const nextLanguage = language === "en" ? "ko" : "en";
  const nextLanguageFlag = nextLanguage === "en" ? "🇺🇸" : "🇰🇷";
  const nextLanguageText = nextLanguage === "en" ? "English" : "한국어";

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        onClick={toggleLanguage}
        size="sm"
        className="bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-sm transition-all hover:scale-105"
        aria-label="Toggle language"
      >
        <span className="text-xl mr-2">{nextLanguageFlag}</span>
        <span className="font-medium">{nextLanguageText}</span>
      </Button>
    </div>
  );
}

