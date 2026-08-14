import React from 'react';
import { AlertTriangle, Clock, Smartphone, HelpCircle, SearchX, TrendingDown, ArrowRight, TrendingUp } from 'lucide-react';
import proofImg from '../assets/images/landing_page_proof_1786643228155.jpg';

interface WhyWebsitesFailProps {
  onScrollToForm: () => void;
}

export const WhyWebsitesFail: React.FC<WhyWebsitesFailProps> = ({ onScrollToForm }) => {
  const failurePoints = [
    {
      title: 'Load Too Slowly',
      desc: 'Visitors abandon slow sites in under 3 seconds.',
      icon: Clock,
    },
    {
      title: 'Look Outdated',
      desc: 'Old visual designs instantly destroy brand trust.',
      icon: AlertTriangle,
    },
    {
      title: "Aren't Mobile-Friendly",
      desc: 'Over 60% of users leave broken mobile views.',
      icon: Smartphone,
    },
    {
      title: 'Confuse Visitors',
      desc: 'Cluttered structure creates hesitation instead of action.',
      icon: HelpCircle,
    },
    {
      title: 'Fail to Rank on Google',
      desc: 'Invisible search presence lets competitors steal leads.',
      icon: SearchX,
    },
    {
      title: "Don't Convert Traffic into Leads or Sales",
      desc: 'Traffic without conversion is wasted marketing money.',
      icon: TrendingDown,
    },
  ];

  return (
    <section id="why-fail" className="py-20 bg-slate-900 border-y border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/50 text-red-400 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>The Hidden Revenue Killer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Why Most Business Websites Fail
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Many businesses lose potential customers every day because their websites fall short when it matters most.
          </p>
        </div>

        {/* Grid of Failure Reasons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {failurePoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-950/50 border border-red-800/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white mb-1 group-hover:text-red-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Growth Proof Image */}
        <div className="mt-12 max-w-4xl mx-auto rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl relative group">
          <img
            src={proofImg}
            alt="Business Executive Growth Analytics Review"
            referrerPolicy="no-referrer"
            className="w-full h-64 sm:h-80 md:h-96 object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6 sm:p-8">
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-xs sm:text-sm font-bold text-amber-300">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Proven Growth Strategy: Transforming Bounce Rates into High-Converting Customers</span>
            </div>
          </div>
        </div>

        {/* The Result Box */}
        <div className="mt-8 p-8 rounded-3xl bg-gradient-to-r from-red-950/40 via-slate-950 to-red-950/40 border border-red-900/40 text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xl sm:text-2xl font-black text-red-300 uppercase tracking-wide">
            The Result?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-200 font-extrabold text-lg">
            <span className="px-3 py-1 rounded-lg bg-red-900/30 text-red-300 border border-red-800/40">Lost Opportunities.</span>
            <span className="px-3 py-1 rounded-lg bg-red-900/30 text-red-300 border border-red-800/40">Lower Revenue.</span>
            <span className="px-3 py-1 rounded-lg bg-red-900/30 text-red-300 border border-red-800/40">A Weaker Brand.</span>
          </div>
          <p className="text-lg sm:text-xl font-bold text-amber-300 pt-2">
            Your website shouldn't cost you customers—it should help you win them.
          </p>
          <div className="pt-2">
            <button
              onClick={onScrollToForm}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors text-sm cursor-pointer"
            >
              <span>Fix Your Website Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
