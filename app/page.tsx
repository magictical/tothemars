"use client";

import { useState } from "react";
import { HeroSection } from "@/components/hero-section";
import { OverviewSection } from "@/components/overview-section";
import { ScenarioSection } from "@/components/scenario-section";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";
import { RegistrationModal } from "@/components/registration-modal";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Language } from "@/lib/translations";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");

  return (
    <main className="min-h-screen bg-space-blue text-white font-sans selection:bg-mars-red selection:text-white">
      <LanguageSwitcher language={language} onLanguageChange={setLanguage} />
      <HeroSection
        language={language}
        onOpenModal={() => setIsModalOpen(true)}
      />
      <OverviewSection language={language} />
      <ScenarioSection
        language={language}
        onOpenModal={() => setIsModalOpen(true)}
      />
      <PricingSection language={language} />
      <Footer language={language} />

      <RegistrationModal
        language={language}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
