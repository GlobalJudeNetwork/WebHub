import React, { useState, useEffect } from 'react';
import { SERVICES_OPTIONS, BUDGET_OPTIONS, PACKAGE_OPTIONS, LeadFormData } from '../types';
import { Send, Sparkles, Clock, ShieldCheck, CheckCircle2, Phone, AlertCircle, Loader2 } from 'lucide-react';

interface LeadFormSectionProps {
  initialPackage?: string;
  onSuccess: (resultData: {
    leadData: any;
    whatsappUrl: string;
    whatsappMessage: string;
    sheetSynced: boolean;
    sheetMessage: string;
  }) => void;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({ initialPackage, onSuccess }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    phone: '',
    service: SERVICES_OPTIONS[0],
    selectedPackage: initialPackage || 'Starter',
    budget: BUDGET_OPTIONS[1], // $1,000 – $2,500
    description: '',
  });

  useEffect(() => {
    if (initialPackage) {
      setFormData((prev) => ({ ...prev, selectedPackage: initialPackage }));
    }
  }, [initialPackage]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.description.trim()
    ) {
      setErrorMsg('Please fill in all required fields (*)');
      return;
    }

    setLoading(true);

    try {
      // POST to /api/submit-lead
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Trigger parent success modal
        onSuccess({
          leadData: result.lead,
          whatsappUrl: result.whatsappUrl,
          whatsappMessage: result.whatsappMessage,
          sheetSynced: result.sheetSynced,
          sheetMessage: result.sheetMessage,
        });

        // Automatically open WhatsApp in new tab for seamless flow
        if (result.whatsappUrl) {
          window.open(result.whatsappUrl, '_blank', 'noopener,noreferrer');
        }

        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          service: SERVICES_OPTIONS[0],
          selectedPackage: 'Starter',
          budget: BUDGET_OPTIONS[1],
          description: '',
        });
      } else {
        setErrorMsg(result.error || 'Failed to submit form. Please try again.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      // Fallback local submission if server fails
      const fallbackPhone = '2349164311179';
      const rawMsg = `Hello GLOBAL JUDE NETWORK! 👋\n\nI just submitted a project inquiry on your website.\n\n👤 *Name:* ${formData.fullName}\n✉️ *Email:* ${formData.email}\n📱 *WhatsApp:* ${formData.phone}\n🛠️ *Service:* ${formData.service}\n📦 *Package:* ${formData.selectedPackage}\n💰 *Budget:* ${formData.budget}\n\n📝 *Project Details:*\n${formData.description}`;
      const waUrl = `https://wa.me/${fallbackPhone}?text=${encodeURIComponent(rawMsg)}`;

      onSuccess({
        leadData: { ...formData, id: 'local_' + Date.now() },
        whatsappUrl: waUrl,
        whatsappMessage: rawMsg,
        sheetSynced: false,
        sheetMessage: 'Saved locally in browser state.',
      });

      window.open(waUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="start-project-form" className="py-20 bg-slate-950 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Form Outer Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border-2 border-amber-500/40 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Title Header */}
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Free Consultation & Quote</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Start Your Project
            </h2>

            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto font-medium">
              Tell us about your project, and we'll get back to you within <span className="text-amber-400 font-bold">24 hours</span>.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-200">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm font-medium transition-all"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-200">
                  Email Address <span className="text-amber-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. john@yourcompany.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm font-medium transition-all"
                />
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Phone Number (WhatsApp) */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-200 flex items-center justify-between">
                  <span>Phone Number (WhatsApp) <span className="text-amber-400">*</span></span>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Direct WhatsApp
                  </span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="e.g. +234 916 431 1179"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm font-medium transition-all"
                />
              </div>

              {/* What service do you need? */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-200">
                  What service do you need? <span className="text-amber-400">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm font-medium transition-all"
                >
                  {SERVICES_OPTIONS.map((svc) => (
                    <option key={svc} value={svc} className="bg-slate-900 text-white">
                      {svc}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Package Plan Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-200">
                  Package Plan
                </label>
                <select
                  name="selectedPackage"
                  value={formData.selectedPackage}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm font-medium transition-all"
                >
                  {PACKAGE_OPTIONS.map((pkg) => (
                    <option key={pkg} value={pkg} className="bg-slate-900 text-white">
                      {pkg}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Budget */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-200">
                  Project Budget <span className="text-amber-400">*</span>
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm font-medium transition-all"
                >
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b} className="bg-slate-900 text-white">
                      {b}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Briefly describe your project */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-200">
                Briefly describe your project <span className="text-amber-400">*</span>
              </label>
              <textarea
                name="description"
                rows={4}
                required
                placeholder="Tell us what you're looking to build, your goals, or any specific features you'd like."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm font-medium transition-all leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-8 rounded-2xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-3 text-base sm:text-lg cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                    <span>Processing Submission...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 fill-slate-950" />
                    <span>Secure Your Spot Now</span>
                  </>
                )}
              </button>
            </div>

            {/* Trust Footer */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-2 font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                24-Hour Response Guarantee
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                No Spam, 100% Confidential
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                Auto Sync to Google Sheets & WhatsApp
              </span>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};
