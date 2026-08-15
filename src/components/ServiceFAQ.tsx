"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  title?: string;
  items: FAQItem[];
}

export function ServiceFAQ({ title = "Frequently Asked Questions", items }: ServiceFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl lg:text-4xl font-light text-white leading-tight">
          {title.split("—").map((part, i, arr) => (
            <span key={i}>
              {i === 0 ? part : <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#66B2E8] to-[#a3d8fc]"> — {part.trim()}</span>}
            </span>
          ))}
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? "bg-white/10 border-[#66B2E8]/50 shadow-[0_0_20px_rgba(102,178,232,0.15)]" 
                  : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
              }`}
            >
              <button
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="text-white/90 text-lg font-medium pr-8">{item.question}</span>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen ? "bg-[#66B2E8] text-[#0A1F3C]" : "bg-white/10 text-white/70 group-hover:bg-white/20 group-hover:text-white"
                }`}>
                  {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>

              <div 
                className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100 pb-6 px-6" : "max-h-0 opacity-0 overflow-hidden px-6"}`}
              >
                <p className="text-white/70 text-base leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
