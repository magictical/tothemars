"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatWithGemini } from "@/app/actions";
import type { Language } from "@/lib/translations";
import { translations } from "@/lib/translations";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatWidgetProps {
  language: Language;
}

export function ChatWidget({ language }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const t = translations[language].chat;

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: t.welcome,
        },
      ]);
    }
  }, [isOpen, t.welcome]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setIsLoading(true);

    // Add user message
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];
    setMessages(newMessages);

    try {
      // Convert messages to Gemini format
      // Exclude welcome message and current user message, ensure first message is from user
      const historyMessages = newMessages.slice(0, -1); // Exclude current user message
      
      // Filter out welcome message if it's the first assistant message
      const filteredMessages = historyMessages.filter((msg, index) => {
        // Skip first message if it's assistant (welcome message)
        if (index === 0 && msg.role === "assistant") {
          return false;
        }
        return true;
      });

      const history = filteredMessages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      }));

      const result = await chatWithGemini(userMessage, history, language);

      if (result.success && result.message) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: result.message },
        ]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: result.error || t.error,
          },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: t.error,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button - Always visible */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[60] w-14 h-14 bg-mars-red hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[60] w-96 h-[600px] max-h-[calc(100vh-120px)] bg-space-blue border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300 md:w-96 md:h-[600px] sm:w-[calc(100vw-48px)] sm:h-[calc(100vh-120px)]">
          {/* Header */}
          <div className="bg-mars-red/20 border-b border-white/10 p-4 flex items-center justify-between">
            <h3 className="text-white font-bold text-lg">{t.title}</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-mars-red text-white"
                      : "bg-white/10 text-gray-200"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 text-gray-200 rounded-lg px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-4">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.placeholder}
                disabled={isLoading}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-mars-red focus:ring-mars-red flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="bg-mars-red hover:bg-red-700 text-white px-4"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

