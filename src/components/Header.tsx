import React, { useState } from 'react';
import { Globe, FileSpreadsheet, ShieldCheck, PhoneCall, Sparkles, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenLeadModal: (pkg?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLeadModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-emerald-400 p-0.5 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/30 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Globe className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="font-black tracking-wider text-lg bg-gradient-to-r from-amber-300 via-white to-amber-200 bg-clip-text text-transparent block leading-tight">
              GLOBAL JUDE
            </span>
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold block">
              NETWORK
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => scrollToSection('why-fail')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Why Us
          </button>
          <button
            onClick={() => scrollToSection('what-you-get')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('our-process')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Process
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Pricing
          </button>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => onOpenLeadModal()}
            className="relative group px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>Start Your Project</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-6 space-y-4">
          <button
            onClick={() => scrollToSection('why-fail')}
            className="block w-full text-left py-2 text-slate-300 hover:text-amber-400 font-medium"
          >
            Why Us
          </button>
          <button
            onClick={() => scrollToSection('what-you-get')}
            className="block w-full text-left py-2 text-slate-300 hover:text-amber-400 font-medium"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('our-process')}
            className="block w-full text-left py-2 text-slate-300 hover:text-amber-400 font-medium"
          >
            Process
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="block w-full text-left py-2 text-slate-300 hover:text-amber-400 font-medium"
          >
            Pricing
          </button>
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal();
              }}
              className="w-full py-3 rounded-xl font-bold bg-amber-400 text-slate-950 text-center text-sm shadow-md"
            >
              Start Your Project Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
