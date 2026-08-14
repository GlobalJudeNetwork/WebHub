import React, { useState } from 'react';
import { GOOGLE_APPS_SCRIPT_CODE } from '../lib/googleAppsScriptCode';
import { FileSpreadsheet, Copy, Check, ExternalLink, Play, AlertCircle, CheckCircle2, X, Link as LinkIcon, RefreshCw } from 'lucide-react';

interface GoogleSheetScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSheetUrl: string;
  onSaveSheetUrl: (url: string) => Promise<void>;
}

export const GoogleSheetScriptModal: React.FC<GoogleSheetScriptModalProps> = ({
  isOpen,
  onClose,
  currentSheetUrl,
  onSaveSheetUrl,
}) => {
  const [copied, setCopied] = useState(false);
  const [sheetUrlInput, setSheetUrlInput] = useState(currentSheetUrl);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');

  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');
    setSaveSuccess('');
    setSaving(true);

    try {
      await onSaveSheetUrl(sheetUrlInput.trim());
      setSaveSuccess('Google Sheet Web App URL saved successfully!');
      setTimeout(() => setSaveSuccess(''), 3000);
    } catch (err: any) {
      setSaveError('Failed to save URL.');
    } finally {
      setSaving(false);
    }
  };

  const handleTestConnection = async () => {
    if (!sheetUrlInput.trim()) {
      setSaveError('Please enter a Web App URL first.');
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/test-google-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: sheetUrlInput.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setTestResult({
          success: true,
          message: 'Connection Successful! Google Sheet returned 200 OK. Test row added.',
        });
      } else {
        setTestResult({
          success: false,
          message: data.error || 'Connection failed. Verify Web App is set to "Anyone".',
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: `Network error: ${err.message}`,
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">
              Google Sheet Integration & Apps Script
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Automatically capture every project lead into your Google Sheet in real-time.
            </p>
          </div>
        </div>

        {/* Step 1: Web App URL Configuration */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-amber-300 text-sm sm:text-base flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-amber-400" />
              <span>Step 1: Save Your Deployed Google Sheet Web App URL</span>
            </h4>
            {currentSheetUrl && (
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded-full font-bold">
                Connected
              </span>
            )}
          </div>

          <form onSubmit={handleSaveUrl} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="url"
                required
                placeholder="https://script.google.com/macros/s/.../exec"
                value={sheetUrlInput}
                onChange={(e) => setSheetUrlInput(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400 font-mono"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-3 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save URL'}
                </button>
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={testing}
                  className="px-4 py-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {testing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                  <span>Test URL</span>
                </button>
              </div>
            </div>

            {saveSuccess && (
              <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{saveSuccess}</span>
              </p>
            )}
            {saveError && (
              <p className="text-xs text-red-400 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{saveError}</span>
              </p>
            )}

            {testResult && (
              <div className={`p-3 rounded-xl text-xs font-semibold ${testResult.success ? 'bg-emerald-950/80 border border-emerald-700 text-emerald-300' : 'bg-red-950/80 border border-red-700 text-red-300'}`}>
                {testResult.message}
              </div>
            )}
          </form>
        </div>

        {/* Step 2: Code Snippet & Copy */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-slate-200 text-sm sm:text-base">
              Step 2: Copy Apps Script Code
            </h4>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition-colors cursor-pointer shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy 1-Click Code</span>
                </>
              )}
            </button>
          </div>

          <div className="relative">
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto max-h-60 leading-relaxed">
              {GOOGLE_APPS_SCRIPT_CODE}
            </pre>
          </div>
        </div>

        {/* Step 3: Setup Instructions Tutorial */}
        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-slate-200 text-sm sm:text-base">
            Step 3: Setup Tutorial (Takes 2 Minutes)
          </h4>

          <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
            <li>
              Open <a href="https://sheets.google.com" target="_blank" rel="noreferrer" className="text-amber-400 underline font-bold">Google Sheets</a> and create a new blank spreadsheet.
            </li>
            <li>
              In the top menu, go to <strong className="text-white">Extensions &gt; Apps Script</strong>.
            </li>
            <li>
              Delete all existing placeholder code, and paste the code copied above.
            </li>
            <li>
              Click <strong className="text-white">Save</strong> (floppy disk icon), then click <strong className="text-white">Deploy &gt; New deployment</strong> (top right).
            </li>
            <li>
              Click the gear icon ⚙️ next to 'Select type', select <strong className="text-white">Web app</strong>.
            </li>
            <li>
              Set <strong className="text-amber-400">Execute as: "Me"</strong> and <strong className="text-emerald-400">Who has access: "Anyone"</strong>.
            </li>
            <li>
              Click <strong className="text-white">Deploy</strong>, grant permissions, copy the Web App URL, and paste it into <strong className="text-amber-300">Step 1 above</strong>!
            </li>
          </ol>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
