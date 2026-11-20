import React from 'react';
import { Phone, MessageCircle, Send } from 'lucide-react';

interface FloatingContactBarProps {
  onOpenEnquiry: () => void;
}

export const FloatingContactBar: React.FC<FloatingContactBarProps> = ({ onOpenEnquiry }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl flex items-center justify-between gap-2">
      {/* Call Button */}
      <a
        href="tel:+917011667297"
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
      >
        <Phone className="w-4 h-4 text-slate-700" />
        <span className="text-[10px] font-bold mt-0.5">Call Now</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917011667297?text=Hello%20Ideal%20Career%20Institute%2C%20I%20would%20like%20to%20enquire%20about%20admission."
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
      >
        <MessageCircle className="w-4 h-4 text-emerald-600" />
        <span className="text-[10px] font-bold mt-0.5">WhatsApp</span>
      </a>

      {/* Enquire Modal Trigger */}
      <button
        onClick={onOpenEnquiry}
        className="flex-2 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Enquire Now</span>
      </button>
    </div>
  );
};
