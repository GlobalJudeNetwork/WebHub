import React from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';

interface FloatingWhatsAppCTAProps {
  whatsappNumber?: string;
}

export const FloatingWhatsAppCTA: React.FC<FloatingWhatsAppCTAProps> = ({ whatsappNumber = '09164311179' }) => {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  let waNumber = cleanNumber;
  if (waNumber.startsWith('0')) {
    waNumber = '234' + waNumber.substring(1);
  }

  const handleOpenWhatsApp = () => {
    const defaultMsg = encodeURIComponent("Hello GLOBAL JUDE NETWORK! 👋\nI would like to inquire about building a high-converting website for my business.");
    window.open(`https://wa.me/${waNumber}?text=${defaultMsg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      <button
        onClick={handleOpenWhatsApp}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-emerald-300/40"
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 fill-slate-950" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-300 rounded-full animate-ping" />
        </div>
        <span className="hidden sm:inline">WhatsApp Us: <strong className="font-mono">{whatsappNumber}</strong></span>
        <span className="sm:hidden">WhatsApp</span>
      </button>
    </div>
  );
};
