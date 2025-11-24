"use client"

import { Twitter, Youtube, Instagram } from "lucide-react"
import type { Language } from "@/lib/translations"
import { translations } from "@/lib/translations"

interface FooterProps {
  language: Language
}

export function Footer({ language }: FooterProps) {
  const t = translations[language].footer

  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">{t.title}</h3>
            <p className="text-gray-500 text-sm">{t.subtitle}</p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-mars-red transition-colors">
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-mars-red transition-colors">
              <Instagram className="w-6 h-6" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-mars-red transition-colors">
              <Youtube className="w-6 h-6" />
              <span className="sr-only">YouTube</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-600 text-sm">
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
