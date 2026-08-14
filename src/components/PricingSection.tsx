import React from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap, Flame } from 'lucide-react';

interface PricingSectionProps {
  onSelectPackage: (packageName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPackage }) => {
  const plans = [
    {
      name: 'Starter',
      tagline: 'Perfect for startups and personal brands.',
      price: '₦150,000',
      features: [
        'One-page landing page',
        'Responsive design',
        'Basic SEO',
        'Contact form',
        'One-week delivery',
      ],
      popular: false,
      cta: 'Choose Starter Plan',
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
    },
    {
      name: 'Growth',
      tagline: 'Ideal for businesses ready to scale.',
      price: '₦350,000',
      features: [
        'Up to 10 pages',
        'Custom animations',
        'CRM integration',
        'Advanced SEO setup',
        'Premium UI/UX',
        'Mobile optimization',
      ],
      popular: true,
      cta: 'Choose Growth Plan',
      badgeColor: 'bg-amber-400 text-slate-950 font-black',
    },
    {
      name: 'Enterprise',
      tagline: 'Built for companies with complex digital needs.',
      price: '₦750,000+',
      features: [
        'Fully custom website or web application',
        'E-commerce functionality',
        'Advanced integrations',
        'Scalable architecture',
        'Priority support',
        'Ongoing maintenance',
      ],
      popular: false,
      cta: 'Choose Enterprise Plan',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-700',
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Transparent Investment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Pricing & Packages
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Choose the package that aligns with your business goals and growth timeline.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-slate-900 border-2 border-amber-400 shadow-2xl shadow-amber-500/10 md:-translate-y-2'
                  : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Popular Tag */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-black uppercase tracking-widest flex items-center gap-1 shadow-md">
                  <Flame className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Most Popular Choice</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-black text-white">{plan.name}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-md border ${plan.badgeColor}`}>
                    {plan.name}
                  </span>
                </div>

                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  {plan.tagline}
                </p>

                <div className="mb-6 pb-6 border-b border-slate-800">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-slate-400 text-xs font-medium ml-2">NGN starting price</span>
                </div>

                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Includes:
                </p>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  onClick={() => onSelectPackage(plan.name)}
                  className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 hover:opacity-90 shadow-lg shadow-amber-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-slate-400 text-xs sm:text-sm">
          * Need a custom scope or specific integrations? Select <span className="text-amber-400 font-semibold cursor-pointer underline" onClick={() => onSelectPackage('Custom / Let\'s Discuss')}>"Let's Discuss"</span> in our form below.
        </div>

      </div>
    </section>
  );
};
