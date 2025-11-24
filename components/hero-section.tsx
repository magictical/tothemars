"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Language } from "@/lib/translations"
import { translations } from "@/lib/translations"

interface HeroSectionProps {
  language: Language
  onOpenModal: () => void
}

export function HeroSection({ language, onOpenModal }: HeroSectionProps) {
  const t = translations[language].hero

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/mars-surface-space-rocket-launch-cinematic-dark.jpg"
          alt="Mars Surface"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-space-blue/30 via-space-blue/60 to-space-blue" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-mars-red font-bold tracking-widest uppercase text-sm md:text-base">{t.subtitle}</h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight">
            {t.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              {t.titleHighlight}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <Button
            onClick={onOpenModal}
            size="lg"
            className="bg-mars-red hover:bg-red-700 text-white text-lg px-8 py-6 rounded-full shadow-[0_0_30px_-5px_rgba(168,51,46,0.6)] transition-all hover:scale-105"
          >
            {t.cta}
          </Button>
          <p className="mt-4 text-sm text-gray-500">{t.premiumNote}</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-gray-500 rounded-full" />
        </div>
      </div>
    </section>
  )
}
