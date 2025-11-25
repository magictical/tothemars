"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitToNotion } from "@/app/actions";
import { Loader2, Rocket } from "lucide-react";
import type { Language } from "@/lib/translations";
import { translations } from "@/lib/translations";

interface RegistrationModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

export function RegistrationModal({
  language,
  isOpen,
  onClose,
}: RegistrationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const t = translations[language].modal;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("🔄 Form submission started");
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    // Log form data before submission
    const formDataObj: Record<string, string> = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value.toString();
    });
    console.log("📋 Form data being submitted:", formDataObj);
    console.log("Form data entries:", Array.from(formData.entries()));

    const result = await submitToNotion(formData);

    console.log("📬 Server response:", result);

    setIsLoading(false);
    if (result.success) {
      console.log("✅ Form submission successful!");
      setIsSuccess(true);
    } else {
      console.error("❌ Form submission failed:", result.message);
    }
  }

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-space-blue text-white border-white/10 sm:max-w-md">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                {t.title}
              </DialogTitle>
              <DialogDescription className="text-center text-gray-400">
                {t.description}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  {t.nameLabel}
                </Label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder={t.namePlaceholder}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-mars-red focus:ring-mars-red"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  {t.emailLabel}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t.emailPlaceholder}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-mars-red focus:ring-mars-red"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc" className="text-gray-300">
                  {t.commentLabel}
                </Label>
                <Textarea
                  id="desc"
                  name="desc"
                  placeholder={t.commentPlaceholder}
                  rows={4}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-mars-red focus:ring-mars-red resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-mars-red hover:bg-red-700 text-white font-bold py-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.processing}
                  </>
                ) : (
                  <>
                    <Rocket className="mr-2 h-4 w-4" />
                    {t.submit}
                  </>
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <Rocket className="h-8 w-8 text-green-500" />
            </div>
            <DialogTitle className="text-2xl font-bold">
              {t.success.title}
            </DialogTitle>
            <p className="text-gray-400">{t.success.message}</p>
            <Button
              onClick={handleClose}
              className="w-full mt-6 bg-white/10 hover:bg-white/20"
            >
              {t.success.close}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
