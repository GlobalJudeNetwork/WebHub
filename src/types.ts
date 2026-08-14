export interface LeadFormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  selectedPackage: string;
  budget: string;
  description: string;
}

export interface Lead extends LeadFormData {
  id: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'closed';
  sheetSynced?: boolean;
}

export interface AppSettings {
  googleSheetUrl: string;
  whatsappNumber: string;
  agencyName: string;
}

export const SERVICES_OPTIONS = [
  'Website Design',
  'Website Redesign',
  'E-commerce Website',
  'Mobile App Development',
  'UI/UX Design',
  'Graphic Design',
  'Branding',
  'Other',
];

export const BUDGET_OPTIONS = [
  'Under ₦150,000',
  '₦150,000 – ₦350,000',
  '₦350,000 – ₦750,000',
  '₦750,000+',
  "Let's Discuss",
];

export const PACKAGE_OPTIONS = [
  'Starter (₦150,000 - Single Page)',
  'Growth (₦350,000 - Up to 10 Pages)',
  'Enterprise (₦750,000+ - Fully Custom)',
  'Not Sure / Need Consultation',
];
