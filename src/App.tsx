/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppSettings } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyWebsitesFail } from './components/WhyWebsitesFail';
import { ValueProposition } from './components/ValueProposition';
import { WhatYouGet } from './components/WhatYouGet';
import { OurProcess } from './components/OurProcess';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PricingSection } from './components/PricingSection';
import { UrgencyCTA } from './components/UrgencyCTA';
import { LeadFormModal } from './components/LeadFormModal';
import { Footer } from './components/Footer';
import { FloatingWhatsAppCTA } from './components/FloatingWhatsAppCTA';
import { GoogleSheetScriptModal } from './components/GoogleSheetScriptModal';
import { AdminLeadsModal } from './components/AdminLeadsModal';
import { LeadSuccessModal } from './components/LeadSuccessModal';

export default function App() {
  const [settings, setSettings] = useState<AppSettings>({
    googleSheetUrl: '',
    whatsappNumber: '09164311179',
    agencyName: 'GLOBAL JUDE NETWORK',
  });

  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [scriptModalOpen, setScriptModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>('Starter');

  const [lastSubmissionResult, setLastSubmissionResult] = useState<{
    leadData: any;
    whatsappUrl: string;
    whatsappMessage: string;
    sheetSynced: boolean;
    sheetMessage: string;
  } | null>(null);

  useEffect(() => {
    fetchSettings();

    // Support opening admin modal via URL parameter (?admin=true or ?script=true) or secret shortcut (Ctrl+Shift+A)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setAdminModalOpen(true);
    } else if (urlParams.get('script') === 'true') {
      setScriptModalOpen(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminModalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const handleUpdateSettings = async (newSettings: Partial<AppSettings>) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setSettings(data.settings);
        }
      }
    } catch (err) {
      console.error('Failed to update settings:', err);
      throw err;
    }
  };

  const openLeadForm = (pkg?: string) => {
    if (pkg) setSelectedPackage(pkg);
    setLeadModalOpen(true);
  };

  const handleSelectPackageFromPricing = (pkgName: string) => {
    openLeadForm(pkgName);
  };

  const handleLeadFormSuccess = (result: {
    leadData: any;
    whatsappUrl: string;
    whatsappMessage: string;
    sheetSynced: boolean;
    sheetMessage: string;
  }) => {
    setLastSubmissionResult(result);
    setSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      
      {/* Sticky Header */}
      <Header
        onOpenLeadModal={(pkg) => openLeadForm(pkg)}
      />

      {/* Main Landing Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenLeadModal={(pkg) => openLeadForm(pkg)}
          onScrollToForm={() => openLeadForm()}
        />

        {/* Why Most Business Websites Fail */}
        <WhyWebsitesFail onScrollToForm={() => openLeadForm()} />

        {/* We Build Websites That Grow Businesses */}
        <ValueProposition />

        {/* What You Get */}
        <WhatYouGet />

        {/* Our Process */}
        <OurProcess />

        {/* Why Businesses Choose GLOBAL JUDE NETWORK */}
        <WhyChooseUs onScrollToForm={() => openLeadForm()} />

        {/* Pricing Packages */}
        <PricingSection onSelectPackage={handleSelectPackageFromPricing} />

        {/* Urgency & Call to Action */}
        <UrgencyCTA
          onScrollToForm={() => openLeadForm()}
          onOpenLeadModal={() => openLeadForm()}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdminModal={() => setAdminModalOpen(true)}
        onScrollToForm={() => openLeadForm()}
      />

      {/* Floating WhatsApp Quick Chat CTA */}
      <FloatingWhatsAppCTA whatsappNumber={settings.whatsappNumber} />

      {/* Project Lead Form Modal */}
      <LeadFormModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        initialPackage={selectedPackage}
        onSuccess={handleLeadFormSuccess}
      />

      {/* Google Apps Script Modal */}
      <GoogleSheetScriptModal
        isOpen={scriptModalOpen}
        onClose={() => setScriptModalOpen(false)}
        currentSheetUrl={settings.googleSheetUrl}
        onSaveSheetUrl={async (url) => {
          await handleUpdateSettings({ googleSheetUrl: url });
        }}
      />

      {/* Admin Leads Dashboard Modal */}
      <AdminLeadsModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onOpenScriptModal={() => {
          setAdminModalOpen(false);
          setScriptModalOpen(true);
        }}
      />

      {/* Lead Submission Success & WhatsApp Modal */}
      {lastSubmissionResult && (
        <LeadSuccessModal
          isOpen={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          whatsappUrl={lastSubmissionResult.whatsappUrl}
          whatsappMessage={lastSubmissionResult.whatsappMessage}
          sheetSynced={lastSubmissionResult.sheetSynced}
          sheetMessage={lastSubmissionResult.sheetMessage}
          leadData={lastSubmissionResult.leadData}
        />
      )}

    </div>
  );
}
