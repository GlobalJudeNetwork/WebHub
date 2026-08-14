import React from 'react';
import { Compass, Lightbulb, Palette, Code2, CheckCircle2, Rocket } from 'lucide-react';

export const OurProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Discovery',
      icon: Compass,
      desc: 'We learn about your business, goals, target audience, and competitors to build a solid project foundation.',
    },
    {
      num: '02',
      title: 'Strategy',
      icon: Lightbulb,
      desc: 'We create a tailored roadmap focused on user experience, conversion funnels, and brand positioning.',
    },
    {
      num: '03',
      title: 'Design',
      icon: Palette,
      desc: 'We craft a bespoke, premium UI that captures instant attention, reflects luxury, and builds trust.',
    },
    {
      num: '04',
      title: 'Development',
      icon: Code2,
      desc: 'Your website is engineered using clean, modern, high-performance code optimized for lightning speed.',
    },
    {
      num: '05',
      title: 'Testing',
      icon: CheckCircle2,
      desc: 'Every page is rigorously tested across smartphones, tablets, laptops, and web browsers for flawless performance.',
    },
    {
      num: '06',
      title: 'Launch',
      icon: Rocket,
      desc: 'Your new website goes live—fully configured, SEO-ready, and equipped to turn traffic into paying clients.',
    },
  ];

  return (
    <section id="our-process" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Rocket className="w-3.5 h-3.5 text-amber-400" />
            <span>Proven Execution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
            Our Process
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A seamless 6-step journey from initial strategic concept to high-converting website launch.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500/10 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-4xl font-black text-slate-800 group-hover:text-amber-500/30 transition-colors">
                    {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
