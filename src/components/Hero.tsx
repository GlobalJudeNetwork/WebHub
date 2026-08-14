import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap, TrendingUp, Star, Laptop, Smartphone } from 'lucide-react';
import heroMockupImg from '../assets/images/landing_page_hero_1786642853641.jpg';

interface HeroProps {
  onOpenLeadModal: (pkg?: string) => void;
  onScrollToForm: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLeadModal, onScrollToForm }) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Gradients & Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold shadow-inner shadow-amber-500/10">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>GLOBAL JUDE NETWORK — High Converting Web Development</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
            Stop Losing Customers to an <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-emerald-400 bg-clip-text text-transparent">
              Outdated Website
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-300/90 tracking-wide max-w-3xl mx-auto">
            Your Website Should Be Your Best Salesperson And Not Your Biggest Weakness.
          </p>

          {/* Body Narrative */}
          <div className="text-slate-300 text-base sm:text-lg leading-relaxed space-y-4 max-w-3xl mx-auto font-normal">
            <p>
              Imagine a website that works for your business <span className="text-amber-200 font-semibold">24/7</span>. A website that captures attention instantly, builds trust in seconds, and turns visitors into paying customers.
            </p>
            <p className="text-lg sm:text-xl font-bold text-white">
              That's exactly what we build at <span className="text-amber-400 underline decoration-amber-500/50 decoration-2 underline-offset-4">GLOBAL JUDE NETWORK</span>.
            </p>
          </div>

          {/* Hero Showcase Image */}
          <div className="relative max-w-4xl mx-auto pt-4 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 via-emerald-500/30 to-blue-500/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition duration-500" />
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-800/90 bg-slate-900 shadow-2xl">
              <img
                src={heroMockupImg}
                alt="GLOBAL JUDE NETWORK Web Design Agency Showcase"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover rounded-2xl transform group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-2 p-3 sm:p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold text-white">Live High-Performance Agency Architecture</span>
                </div>
                <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400">
                  <span className="flex items-center gap-1 text-amber-300"><Zap className="w-3.5 h-3.5 text-amber-400" /> 99/100 PageSpeed</span>
                  <span className="hidden sm:flex items-center gap-1 text-emerald-300"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> SSL Secured</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dual Action CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onScrollToForm}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-base cursor-pointer"
            >
              <span>Book Your Free Strategy Call</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>

            <button
              onClick={() => onOpenLeadModal()}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl font-bold text-slate-200 bg-slate-900 border border-slate-700/80 hover:bg-slate-800 hover:text-white transition-all flex items-center justify-center gap-2 text-base cursor-pointer"
            >
              <span>Explore Packages</span>
            </button>
          </div>

          {/* Key Value Guarantee Micro-Badges */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-xs sm:text-sm font-semibold text-slate-300">
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Conversion Focused</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Lightning Fast Speed</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900/60 border border-slate-800 col-span-2 sm:col-span-1">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>100% Mobile Ready</span>
            </div>
          </div>

          {/* Social Proof Bar */}
          <div className="pt-6 border-t border-slate-800/80 max-w-xl mx-auto flex items-center justify-center gap-6 text-slate-400 text-xs sm:text-sm">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <span className="text-slate-300 font-medium">Trusted by growing brands worldwide</span>
          </div>

        </div>
      </div>
    </section>
  );
};
