"use client";

import { CheckCircle2, Users, Video, Rocket, Map } from "lucide-react";
import Image from "next/image";
import type { Language } from "@/lib/translations";
import { translations } from "@/lib/translations";

interface OverviewSectionProps {
  language: Language;
}

export function OverviewSection({ language }: OverviewSectionProps) {
  const t = translations[language].overview;
  const icons = [
    <Rocket className="w-8 h-8 text-mars-red" key="rocket" />,
    <CheckCircle2 className="w-8 h-8 text-mars-red" key="check" />,
    <Video className="w-8 h-8 text-mars-red" key="video" />,
    <Users className="w-8 h-8 text-mars-red" key="users" />,
    <Map className="w-8 h-8 text-mars-red" key="map" />,
  ];

  const images = [
    "/mars-surface-space-rocket-launch-cinematic-dark.jpg",
    "/mars-hydroponic-garden-futuristic.jpg",
    "/futuristic-space-lounge-mars-view.jpg",
    "/mars-sunrise-landscape.jpg",
    "/mars-colony-habitat-futuristic.jpg",
  ];

  const features = t.features.map((feature, index) => ({
    ...feature,
    icon: icons[index],
    image: images[index],
  }));

  return (
    <section className="py-24 bg-space-blue relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative h-full min-h-[300px] rounded-2xl overflow-hidden group"
            >
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8">
                <div className="mb-4 p-3 bg-mars-red/20 rounded-full w-fit group-hover:bg-mars-red/30 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}

          {/* Quote Card */}
          <div className="relative h-full min-h-[300px] rounded-2xl overflow-hidden lg:col-span-1">
            <Image
              src="/mars-colony-habitat-futuristic.jpg"
              alt="Mars Habitat"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
              <p className="text-white font-medium">"{t.quote}"</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
