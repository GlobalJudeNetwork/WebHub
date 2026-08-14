import React from 'react';
import { CheckCircle2, TrendingUp, Sparkles, Target, Zap, ShieldCheck } from 'lucide-react';

export const ValueProposition: React.FC = () => {
  const highlights = [
    'Beautiful and professionally designed',
    'Lightning fast',
    'Mobile responsive',
    'SEO-ready',
    'Easy to manage',
    'Secure and scalable',
    'Built to convert visitors into customers',
  ];

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/50 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>The Global Jude Approach</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            We Build Websites That Grow Businesses
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            At <strong className="text-amber-400">GLOBAL JUDE NETWORK</strong>, every website is designed with one primary goal:
          </p>
        </div>

        {/* Big Impact Callout Banner */}
        <div className="mb-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border border-amber-500/30 text-center max-w-4xl mx-auto shadow-2xl relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-widest rounded-full shadow-md">
            Our Core Formula
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black bg-gradient-to-r from-amber-300 via-white to-emerald-300 bg-clip-text text-transparent leading-tight pt-2">
            "Generate More Leads. Increase More Sales. Build More Trust."
          </h3>
          <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Every project combines strategic design, modern technology, and conversion-focused user experience to help your business achieve real growth.
          </p>
        </div>

        {/* Checklist Grid */}
        <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
          <h4 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
            <Target className="w-5 h-5 text-amber-400" />
            <span>What Sets Our Websites Apart:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-950 flex items-center justify-center shrink-0 border border-emerald-500/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-slate-200">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
