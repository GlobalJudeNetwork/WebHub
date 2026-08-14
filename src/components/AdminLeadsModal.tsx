import React, { useState, useEffect } from 'react';
import { Lead, AppSettings } from '../types';
import { ShieldCheck, Download, Trash2, Search, Filter, Phone, Mail, FileSpreadsheet, RefreshCw, X, CheckCircle2, UserCheck, MessageSquare } from 'lucide-react';

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => Promise<void>;
  onOpenScriptModal: () => void;
}

export const AdminLeadsModal: React.FC<AdminLeadsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onOpenScriptModal,
}) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');
  const [whatsappInput, setWhatsappInput] = useState(settings.whatsappNumber || '09164311179');
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
      setWhatsappInput(settings.whatsappNumber || '09164311179');
    }
  }, [isOpen, settings]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (res.ok && data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleUpdateStatus = async (leadId: string, newStatus: 'new' | 'contacted' | 'closed') => {
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/leads/${leadId}`, { method: 'DELETE' });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== leadId));
      }
    } catch (err) {
      console.error('Failed to delete lead:', err);
    }
  };

  const handleSaveWhatsapp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await onUpdateSettings({ whatsappNumber: whatsappInput.trim() });
      alert('WhatsApp number updated successfully!');
    } catch (err) {
      alert('Failed to update WhatsApp number.');
    } finally {
      setSavingSettings(false);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' ? true : lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const exportCSV = () => {
    window.open('/api/leads/export', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-950 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">
                Admin Leads Dashboard
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">
                GLOBAL JUDE NETWORK — Project Inquiries & Settings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer border border-slate-700"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={fetchLeads}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Refresh Leads"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Settings & Config Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* WhatsApp Number Settings */}
          <form onSubmit={handleSaveWhatsapp} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <label className="block text-xs font-bold text-amber-300">
              Target WhatsApp Support Number:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={whatsappInput}
                onChange={(e) => setWhatsappInput(e.target.value)}
                placeholder="09164311179"
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                disabled={savingSettings}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>

          {/* Google Sheet Link Status */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 block">
                Google Sheet Webhook:
              </span>
              <p className="text-[11px] text-slate-400 truncate max-w-xs font-mono">
                {settings.googleSheetUrl ? settings.googleSheetUrl : 'Not connected yet'}
              </p>
            </div>
            <button
              onClick={onOpenScriptModal}
              className="px-3 py-2 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700/60 font-bold text-xs hover:bg-emerald-900/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Configure Script</span>
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads by name, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
            <span className="text-xs text-slate-400 font-medium">Status:</span>
            {(['all', 'new', 'contacted', 'closed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer ${
                  statusFilter === st
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Lead Details</th>
                  <th className="p-3.5">Service & Package</th>
                  <th className="p-3.5">Budget</th>
                  <th className="p-3.5">Description</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 italic">
                      No leads found matching criteria. Submit a test lead on the landing page!
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="p-3.5 text-slate-400 whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString()}<br />
                        <span className="text-[10px] text-slate-500">
                          {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <div className="font-bold text-white text-sm">{lead.fullName}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3" /> {lead.email}
                        </div>
                        <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5 font-mono">
                          <Phone className="w-3 h-3" /> {lead.phone}
                        </div>
                      </td>

                      <td className="p-3.5">
                        <span className="font-semibold text-amber-300 block">{lead.service}</span>
                        <span className="text-[11px] text-slate-400 block">{lead.selectedPackage || 'Starter'}</span>
                      </td>

                      <td className="p-3.5">
                        <span className="font-bold text-emerald-400 px-2 py-0.5 bg-emerald-950 rounded border border-emerald-800/40">
                          {lead.budget}
                        </span>
                      </td>

                      <td className="p-3.5 max-w-xs">
                        <p className="line-clamp-2 text-slate-300 leading-relaxed text-[11px]">
                          {lead.description}
                        </p>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none ${
                            lead.status === 'new'
                              ? 'bg-amber-950 text-amber-300 border-amber-700'
                              : lead.status === 'contacted'
                              ? 'bg-blue-950 text-blue-300 border-blue-700'
                              : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>

                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded bg-emerald-950 text-emerald-400 hover:bg-emerald-900 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 rounded bg-red-950 text-red-400 hover:bg-red-900 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Total Captured Leads: <strong>{leads.length}</strong></span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors cursor-pointer"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
