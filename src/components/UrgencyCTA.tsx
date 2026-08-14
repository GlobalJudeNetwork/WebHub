import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, PhoneCall, Globe, Trophy, ShieldCheck } from 'lucide-react';
import contactStrategyImg from '../assets/images/landing_page_contact_1786643241332.jpg';

interface UrgencyCTAProps {
  onScrollToForm: () => void;
  onOpenLeadModal: () => void;
}

export const UrgencyCTA: React.FC<UrgencyCTAProps> = ({ onScrollToForm, onOpenLeadModal }) => {
  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800 text-white relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Competitor Urgency Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border border-amber-500/30 text-center max-w-4xl mx-auto mb-16 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Market Leadership</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Your Competitors Are Investing Online.
          </h2>

          <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-300 via-white to-amber-300 bg-clip-text text-transparent mb-6">
            The question is... Will your business keep up—or lead the way?
          </p>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            Every day you delay is another day potential customers choose someone else. A professionally designed website isn't an expense. It's an investment that keeps working long after it's launched.
          </p>
        </div>

        {/* Let's Build Something Exceptional Box */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Take Action Today</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Let's Build Something Exceptional
          </h2>

          <div className="rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-950 shadow-2xl relative my-6 group">
            <img
              src={contactStrategyImg}
              alt="GLOBAL JUDE NETWORK Strategy Room Desk Setup"
              referrerPolicy="no-referrer"
              className="w-full h-64 sm:h-80 md:h-96 object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex items-end p-6 sm:p-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-amber-500/50 text-xs sm:text-sm font-bold text-amber-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>GLOBAL JUDE NETWORK Executive Strategy Session</span>
              </div>
            </div>
          </div>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            If you're serious about growing your business, attracting more customers, and building a powerful online presence, now is the perfect time to act.
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Book your free strategy call today and discover how <strong className="text-amber-400">GLOBAL JUDE NETWORK</strong> can create a website that helps your business stand out, build trust, and convert more visitors into loyal customers.
          </p>

          <div className="pt-4 space-y-4">
            <h3 className="text-2xl font-black text-amber-300">
              Ready to Grow?
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={onScrollToForm}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-xl shadow-amber-500/20 text-base flex items-center justify-center gap-3 cursor-pointer"
              >
                <PhoneCall className="w-5 h-5 text-slate-950" />
                <span>Book Your Free Strategy Call</span>
              </button>

              <button
                onClick={onOpenLeadModal}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white transition-all text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-800 mt-12 flex flex-col items-center gap-2">
            <span className="font-black text-2xl tracking-wider text-amber-400">
              GLOBAL JUDE NETWORK
            </span>
            <span className="text-sm uppercase tracking-widest text-emerald-400 font-bold">
              Design. Develop. Grow.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
