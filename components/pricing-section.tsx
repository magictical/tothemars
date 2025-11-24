"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Language } from "@/lib/translations"
import { translations } from "@/lib/translations"

interface PricingSectionProps {
  language: Language
}

export function PricingSection({ language }: PricingSectionProps) {
  const t = translations[language].pricing
  const tiers = t.tiers

  return (
    <section className="py-24 bg-space-blue border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-gray-400">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">{tiers.explorer.name}</h3>
              <div className="text-3xl font-bold text-white">{tiers.explorer.price}</div>
              <p className="text-gray-400 text-sm mt-2">{tiers.explorer.description}</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {tiers.explorer.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300 text-sm">
                  <Check className="w-5 h-5 text-mars-red shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full bg-white/10 hover:bg-white/20 text-white">{tiers.explorer.cta}</Button>
          </div>

          {/* Premium Tier */}
          <div className="bg-gradient-to-b from-mars-red/20 to-space-blue border border-mars-red/50 rounded-2xl p-8 flex flex-col relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-mars-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {tiers.pioneer.badge}
            </div>
            <div className="mb-8 mt-4">
              <h3 className="text-xl font-bold text-white mb-2">{tiers.pioneer.name}</h3>
              <div className="text-3xl font-bold text-white">
                {tiers.pioneer.price}
                {tiers.pioneer.priceUnit && <span className="text-sm font-normal text-gray-400">{tiers.pioneer.priceUnit}</span>}
              </div>
              <p className="text-gray-400 text-sm mt-2">{tiers.pioneer.description}</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {tiers.pioneer.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-white text-sm">
                  <Check className="w-5 h-5 text-mars-red shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full bg-mars-red hover:bg-red-700 text-white">{tiers.pioneer.cta}</Button>
          </div>

          {/* Participation Tier */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">{tiers.colonist.name}</h3>
              <div className="text-3xl font-bold text-white">{tiers.colonist.price}</div>
              <p className="text-gray-400 text-sm mt-2">{tiers.colonist.description}</p>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              {tiers.colonist.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-300 text-sm">
                  <Check className="w-5 h-5 text-mars-red shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent"
            >
              {tiers.colonist.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
