"use client"

import { Button } from "@/components/ui/button"
import { Clock, Sun, Moon, Leaf } from "lucide-react"
import type { Language } from "@/lib/translations"
import { translations } from "@/lib/translations"

interface ScenarioSectionProps {
  language: Language
  onOpenModal: () => void
}

export function ScenarioSection({ language, onOpenModal }: ScenarioSectionProps) {
  const t = translations[language].scenario
  const times = ["07:00", "12:00", "20:00"]
  const icons = [
    <Sun className="w-6 h-6 text-yellow-500" key="sun" />,
    <Leaf className="w-6 h-6 text-green-500" key="leaf" />,
    <Moon className="w-6 h-6 text-blue-400" key="moon" />,
  ]
  const images = [
    "/mars-sunrise-landscape.jpg",
    "/mars-hydroponic-garden-futuristic.jpg",
    "/futuristic-space-lounge-mars-view.jpg",
  ]

  const scenarios = t.scenarios.map((scenario, index) => ({
    ...scenario,
    time: times[index],
    icon: icons[index],
    image: images[index],
  }))

  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-gray-400">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {scenarios.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-space-blue"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-2 text-sm text-white border border-white/10">
                  <Clock className="w-3 h-3" />
                  {item.time}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  {item.icon}
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center space-y-6">
          <p className="text-xl text-white font-light italic">
            "{t.quote}"
          </p>
          <Button
            onClick={onOpenModal}
            size="lg"
            className="bg-white text-space-blue hover:bg-gray-200 font-bold px-8 py-6 rounded-full text-lg"
          >
            {t.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}
