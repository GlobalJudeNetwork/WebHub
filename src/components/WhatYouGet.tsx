import React from 'react';
import { Layout, Zap, Smartphone, Search, Sparkles, Check } from 'lucide-react';
import uiuxStudioImg from '../assets/images/landing_page_uiux_1786642877897.jpg';
import mobileMockupImg from '../assets/images/landing_page_mobile_1786642864634.jpg';

export const WhatYouGet: React.FC = () => {
  const deliverables = [
    {
      title: 'Premium UI/UX Design',
      icon: Layout,
      color: 'from-amber-500 to-amber-700',
      iconColor: 'text-amber-400',
      bgColor: 'bg-amber-950/30 border-amber-800/40',
      image: uiuxStudioImg,
      imageAlt: 'Custom Figma UI/UX Studio Wireframe & Typography Setup',
      points: [
        'Custom-designed to match your unique brand identity',
        'Creates an unforgettable, high-trust first impression',
        'No generic templates. No cookie-cutter layouts.',
        'Every detail is designed specifically for your business growth',
      ],
    },
    {
      title: 'Fast Performance',
      icon: Zap,
      color: 'from-emerald-500 to-emerald-700',
      iconColor: 'text-emerald-400',
      bgColor: 'bg-emerald-950/30 border-emerald-800/40',
      points: [
        'People leave slow websites in seconds',
        'Google actively ranks fast websites higher',
        'Every page & asset optimized for sub-second load speeds',
        'Keeps visitors engaged and lowers bounce rate',
      ],
    },
    {
      title: 'Mobile-First Experience',
      icon: Smartphone,
      color: 'from-blue-500 to-blue-700',
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-950/30 border-blue-800/40',
      image: mobileMockupImg,
      imageAlt: 'Responsive Multi-Device Mobile, Tablet & Desktop Mockup',
      points: [
        'More than half of all internet users browse on mobile',
        'Flawless responsive layouts for smartphones & tablets',
        'Touch-optimized navigation & lightning button response',
        'Consistent high conversion experience across all screen sizes',
      ],
    },
    {
      title: 'SEO-Ready Development',
      icon: Search,
      color: 'from-purple-500 to-purple-700',
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-950/30 border-purple-800/40',
      points: [
        'A beautiful website means little if no one can find it',
        'Built with clean, modern semantic code & metadata',
        'Schema markup & proper heading structure built-in',
        'Provides a rock-solid foundation for top Google search rankings',
      ],
    },
  ];

  return (
    <section id="what-you-get" className="py-20 bg-slate-900 border-y border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Uncompromising Quality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            What You Get
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            We deliver complete, high-converting digital assets built to outperform standard web design agencies.
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deliverables.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`p-6 sm:p-8 rounded-3xl bg-slate-950 border ${item.bgColor} shadow-xl hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center ${item.iconColor} shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>

                  {item.image && (
                    <div className="mb-6 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-lg">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        referrerPolicy="no-referrer"
                        className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <ul className="space-y-3">
                    {item.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                        <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/30">
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
