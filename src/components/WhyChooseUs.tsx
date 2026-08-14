import React from 'react';
import { ShieldCheck, CheckCircle2, Award, HeartHandshake, ArrowRight, Sparkles } from 'lucide-react';
import portfolioImg from '../assets/images/landing_page_portfolio_1786643214829.jpg';

interface WhyChooseUsProps {
  onScrollToForm: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onScrollToForm }) => {
  const benefits = [
    'Custom strategy tailored to your specific audience',
    'Premium design that elevates your brand perception',
    'Modern development with clean, high-performance code',
    'Transparent communication throughout the entire project',
    'On-time delivery backed by strict project milestones',
    'Long-term support and maintenance options',
    'Results-focused execution designed to maximize conversions',
  ];

  return (
    <section className="py-20 bg-slate-900 border-y border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Partner With Winners</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              Why Businesses Choose <br />
              <span className="bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
                GLOBAL JUDE NETWORK
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              We believe your website should do more than just look beautiful.
              It should become <strong className="text-amber-300">one of your most valuable business assets</strong>.
            </p>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>Our Core Promise</span>
              </div>
              <p className="text-slate-200 text-sm sm:text-base font-semibold leading-relaxed">
                "We treat every project as an investment in your business success—delivering top-tier craftsmanship with measurable return on investment."
              </p>
            </div>

            <div>
              <button
                onClick={onScrollToForm}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/20 text-base cursor-pointer"
              >
                <span>Partner With Us Today</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column Benefits List */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4 flex items-center justify-between">
                <span>When you work with us, you receive:</span>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </h3>

              <div className="space-y-3">
                {benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <span className="text-slate-200 text-sm sm:text-base font-medium">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Portfolio Agency Showcase Wall Image */}
        <div className="mt-16 rounded-3xl overflow-hidden border-2 border-slate-800/90 bg-slate-950 shadow-2xl relative group">
          <img
            src={portfolioImg}
            alt="GLOBAL JUDE NETWORK Portfolio Wall Showcase"
            referrerPolicy="no-referrer"
            className="w-full h-72 sm:h-96 lg:h-[480px] object-cover transform group-hover:scale-[1.01] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-6 sm:p-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/90 border border-amber-500/50 text-amber-300 text-xs font-bold uppercase tracking-wider w-fit mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Multi-Industry Web Architecture Showcase</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white">
              Tailored Websites for E-Commerce, Tech, Luxury Brands & Corporate Enterprises
            </h4>
          </div>
        </div>

      </div>
    </section>
  );
};
