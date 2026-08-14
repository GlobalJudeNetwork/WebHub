import React, { useState } from 'react';
import { CheckCircle2, MessageSquare, ExternalLink, Copy, Check, FileSpreadsheet, Sparkles, X } from 'lucide-react';

interface LeadSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappUrl: string;
  whatsappMessage: string;
  sheetSynced: boolean;
  sheetMessage: string;
  leadData: any;
}

export const LeadSuccessModal: React.FC<LeadSuccessModalProps> = ({
  isOpen,
  onClose,
  whatsappUrl,
  whatsappMessage,
  sheetSynced,
  sheetMessage,
  leadData,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/20 animate-bounce">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Project Request Submitted!
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto">
            Thank you, <strong className="text-amber-300">{leadData?.fullName}</strong>. We've received your request and will get back to you within <strong className="text-emerald-400">24 hours</strong>.
          </p>
        </div>

        {/* WhatsApp Immediate Action Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-950/80 border border-emerald-500/40 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">
                Step 2: Send WhatsApp Message (09164311179)
              </h4>
              <p className="text-xs text-slate-300">
                Send your pre-formatted project message directly to GLOBAL JUDE NETWORK on WhatsApp for instant priority handling.
              </p>
            </div>
          </div>

          <div className="pt-1 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleOpenWhatsApp}
              className="flex-1 py-3.5 px-5 rounded-xl font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-emerald-300 hover:from-emerald-300 hover:to-emerald-200 shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>Open WhatsApp & Send Now</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={handleCopyMessage}
              className="py-3.5 px-4 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer border border-slate-700"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Message Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Message</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Message Preview Box */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Generated WhatsApp Message Preview:
          </span>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap max-h-40 overflow-y-auto leading-relaxed">
            {whatsappMessage}
          </div>
        </div>

        {/* Google Sheet Sync Status Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3">
          <FileSpreadsheet className={`w-5 h-5 shrink-0 mt-0.5 ${sheetSynced ? 'text-emerald-400' : 'text-amber-400'}`} />
          <div className="text-xs space-y-1">
            <div className="font-bold text-slate-200">
              Google Sheet Status: {sheetSynced ? 'Synced Successfully ✓' : 'Saved Locally'}
            </div>
            <p className="text-slate-400 leading-normal">
              {sheetMessage}
            </p>
          </div>
        </div>

        {/* Footer Close */}
        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
          >
            Done & Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
