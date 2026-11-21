import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const defaultMsg = 'Hello Ideal Career Institute, I would like to enquire about admission and course details.';

  const handleSend = () => {
    const textToSend = userMsg.trim() || defaultMsg;
    const url = `https://wa.me/917011667297?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setUserMsg('');
  };

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-40">
      {/* Expanded Quick Message Bubble */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden mb-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <div>
                <h4 className="text-sm font-bold">Ideal Career Institute</h4>
                <p className="text-[10px] text-emerald-100">Usually replies in minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-slate-50 space-y-3">
            <div className="p-3 bg-white rounded-xl text-xs text-slate-700 shadow-2xs border border-slate-100 leading-relaxed">
              Hello! 👋 How can we help you today with course admissions or batch information?
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase text-slate-400">
                Your message:
              </label>
              <textarea
                rows={2}
                placeholder={defaultMsg}
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              onClick={handleSend}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Start WhatsApp Chat</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button with Ambient Pulse Ring */}
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 animate-ping pointer-events-none" />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 cursor-pointer group"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      </div>
    </div>
  );
};
