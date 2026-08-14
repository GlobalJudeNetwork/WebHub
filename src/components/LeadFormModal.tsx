import React, { useState, useEffect } from 'react';
import { SERVICES_OPTIONS, BUDGET_OPTIONS, PACKAGE_OPTIONS, LeadFormData } from '../types';
import { Send, Sparkles, Clock, ShieldCheck, CheckCircle2, Phone, AlertCircle, Loader2, X } from 'lucide-react';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage?: string;
  onSuccess: (resultData: {
    leadData: any;
    whatsappUrl: string;
    whatsappMessage: string;
    sheetSynced: boolean;
    sheetMessage: string;
  }) => void;
}

export const LeadFormModal: React.FC<LeadFormModalProps> = ({
  isOpen,
  onClose,
  initialPackage,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    fullName: '',
    email: '',
    phone: '',
    service: SERVICES_OPTIONS[0],
    selectedPackage: initialPackage || 'Starter',
    budget: BUDGET_OPTIONS[1],
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialPackage) {
      setFormData((prev) => ({ ...prev, selectedPackage: initialPackage }));
    }
  }, [initialPackage]);

  if (!isOpen) return null;

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
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        onClose(); // Close the modal on success
        onSuccess({
          leadData: result.lead,
          whatsappUrl: result.whatsappUrl,
          whatsappMessage: result.whatsappMessage,
          sheetSynced: result.sheetSynced,
          sheetMessage: result.sheetMessage,
        });

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
      const fallbackPhone = '2349164311179';
      const rawMsg = `Hello GLOBAL JUDE NETWORK! 👋\n\nI just submitted a project inquiry on your website.\n\n👤 *Name:* ${formData.fullName}\n✉️ *Email:* ${formData.email}\n📱 *WhatsApp:* ${formData.phone}\n🛠️ *Service:* ${formData.service}\n📦 *Package:* ${formData.selectedPackage}\n💰 *Budget:* ${formData.budget}\n\n📝 *Project Details:*\n${formData.description}`;
      const waUrl = `https://wa.me/${fallbackPhone}?text=${encodeURIComponent(rawMsg)}`;

      onClose();
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-2xl my-auto max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-800 transition-colors cursor-pointer z-10"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6 pt-2 pr-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Free Consultation & Quote</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Start Your Project
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto font-medium">
            Fill in your details below and we'll get back to you within <span className="text-amber-400 font-bold">24 hours</span>.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-200">
                Full Name <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="e.g. John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs sm:text-sm font-medium transition-all"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-200">
                Email Address <span className="text-amber-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="e.g. john@yourcompany.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs sm:text-sm font-medium transition-all"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Phone Number (WhatsApp) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>WhatsApp Number <span className="text-amber-400">*</span></span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <Phone className="w-3 h-3" /> Direct
                </span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="e.g. 09164311179"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs sm:text-sm font-medium transition-all"
              />
            </div>

            {/* What service do you need? */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-200">
                Service Required <span className="text-amber-400">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs sm:text-sm font-medium transition-all"
              >
                {SERVICES_OPTIONS.map((svc) => (
                  <option key={svc} value={svc} className="bg-slate-900 text-white">
                    {svc}
                  </option>
                ))}
              </select>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Package Plan Selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-200">
                Package Plan
              </label>
              <select
                name="selectedPackage"
                value={formData.selectedPackage}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs sm:text-sm font-medium transition-all"
              >
                {PACKAGE_OPTIONS.map((pkg) => (
                  <option key={pkg} value={pkg} className="bg-slate-900 text-white">
                    {pkg}
                  </option>
                ))}
              </select>
            </div>

            {/* Project Budget */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-200">
                Project Budget <span className="text-amber-400">*</span>
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs sm:text-sm font-medium transition-all"
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
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200">
              Project Brief <span className="text-amber-400">*</span>
            </label>
            <textarea
              name="description"
              rows={3}
              required
              placeholder="Tell us what you're looking to build, your goals, or any specific features you'd like."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-xs sm:text-sm font-medium transition-all leading-relaxed resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-6 rounded-2xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/35 transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                  <span>Processing Submission...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 fill-slate-950" />
                  <span>SECURE YOUR SPOT NOW</span>
                </>
              )}
            </button>
          </div>

          {/* Trust Footer */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-400 pt-1 font-medium">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              24-Hour Response
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              100% Confidential
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-blue-400" />
              Auto Sheet Sync
            </span>
          </div>

        </form>

      </div>
    </div>
  );
};
