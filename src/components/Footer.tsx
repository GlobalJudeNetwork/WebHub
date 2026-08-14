import React from 'react';
import { Globe, ShieldCheck, FileSpreadsheet, Phone, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdminModal?: () => void;
  onScrollToForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAdminModal,
  onScrollToForm,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-400 p-0.5 shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Globe className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <span className="font-black tracking-wider text-lg bg-gradient-to-r from-amber-300 via-white to-amber-200 bg-clip-text text-transparent block">
                  GLOBAL JUDE
                </span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-semibold block">
                  NETWORK
                </span>
              </div>
            </a>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              We create digital experiences that help businesses grow, increase revenue, and stand out in competitive markets.
            </p>

            <div className="pt-2 text-xs text-slate-300 font-semibold space-y-1">
              <div className="flex items-center gap-2 text-emerald-400 font-mono">
                <Phone className="w-3.5 h-3.5" /> WhatsApp Direct: 09164311179
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Quick Navigation
            </span>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <button onClick={onScrollToForm} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Start Your Project
                </button>
              </li>
              <li>
                <a href="#why-fail" className="hover:text-amber-400 transition-colors">
                  Why Us
                </a>
              </li>
              <li>
                <a href="#what-you-get" className="hover:text-amber-400 transition-colors">
                  Services & Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Tagline / Action */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Design. Develop. Grow.
            </span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ready to turn your website into your best salesperson? Let's build something exceptional today.
            </p>
            <button
              onClick={onScrollToForm}
              className="px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors cursor-pointer w-full text-center"
            >
              Book Strategy Call
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div
            onDoubleClick={onOpenAdminModal}
            className="cursor-default select-none"
            title="GLOBAL JUDE NETWORK"
          >
            © {new Date().getFullYear()} GLOBAL JUDE NETWORK. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
