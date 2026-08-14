import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory + file storage for leads and settings
const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial settings default
let settings = {
  googleSheetUrl: 'https://script.google.com/macros/s/AKfycby3zq2cVPp8ONRNGTSGtVskCcK8Xau50A17AYWZnfp1DnyHV7r7m69jJgLbsmVaPBTh/exec',
  whatsappNumber: '09164311179',
  agencyName: 'GLOBAL JUDE NETWORK',
};

if (fs.existsSync(SETTINGS_FILE)) {
  try {
    const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
    settings = { ...settings, ...JSON.parse(data) };
  } catch (err) {
    console.error('Error loading settings file:', err);
  }
}

let leads: any[] = [];
if (fs.existsSync(LEADS_FILE)) {
  try {
    const data = fs.readFileSync(LEADS_FILE, 'utf-8');
    leads = JSON.parse(data);
  } catch (err) {
    console.error('Error loading leads file:', err);
  }
}

function saveLeadsToFile() {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving leads:', err);
  }
}

function saveSettingsToFile() {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving settings:', err);
  }
}

// API Routes FIRST
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', agency: settings.agencyName });
});

// Get Settings
app.get('/api/settings', (req, res) => {
  res.json(settings);
});

// Save Settings
app.post('/api/settings', (req, res) => {
  const { googleSheetUrl, whatsappNumber } = req.body;
  if (typeof googleSheetUrl === 'string') {
    settings.googleSheetUrl = googleSheetUrl.trim();
  }
  if (typeof whatsappNumber === 'string') {
    settings.whatsappNumber = whatsappNumber.trim();
  }
  saveSettingsToFile();
  res.json({ success: true, settings });
});

// Get All Leads
app.get('/api/leads', (req, res) => {
  res.json({ leads, count: leads.length });
});

// Submit a new lead
app.post('/api/submit-lead', async (req, res) => {
  try {
    const { fullName, email, phone, service, selectedPackage, budget, description } = req.body;

    if (!fullName || !email || !phone || !service || !budget || !description) {
      return res.status(400).json({ error: 'Please complete all required fields.' });
    }

    const newLead = {
      id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      service: service.trim(),
      selectedPackage: (selectedPackage || 'Starter').trim(),
      budget: budget.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
      status: 'new',
      sheetSynced: false,
    };

    let sheetSuccess = false;
    let sheetMessage = '';

    // If Google Sheet Web App URL is configured, send to Google Apps Script
    if (settings.googleSheetUrl) {
      try {
        const response = await fetch(settings.googleSheetUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newLead),
        });

        if (response.ok) {
          sheetSuccess = true;
          newLead.sheetSynced = true;
          sheetMessage = 'Successfully synced to Google Sheet.';
        } else {
          sheetMessage = `Google Sheet returned status ${response.status}`;
        }
      } catch (err: any) {
        console.error('Error forwarding lead to Google Sheet:', err);
        sheetMessage = `Google Sheet forwarding error: ${err.message || 'Network error'}`;
      }
    } else {
      sheetMessage = 'No Google Sheet URL configured. Lead saved locally.';
    }

    leads.unshift(newLead);
    saveLeadsToFile();

    // Format WhatsApp message
    const formattedPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    // Handle international code formatting (e.g., 09164311179 -> 2349164311179 for Nigeria if starts with 0)
    let waNumber = formattedPhone;
    if (waNumber.startsWith('0')) {
      waNumber = '234' + waNumber.substring(1);
    }

    const rawMessage = `Hello GLOBAL JUDE NETWORK! 👋\n\nI just submitted a project inquiry on your website.\n\n👤 *Name:* ${newLead.fullName}\n✉️ *Email:* ${newLead.email}\n📱 *WhatsApp:* ${newLead.phone}\n🛠️ *Service:* ${newLead.service}\n📦 *Package:* ${newLead.selectedPackage}\n💰 *Budget:* ${newLead.budget}\n\n📝 *Project Description:*\n${newLead.description}\n\nLooking forward to hearing from you!`;

    const encodedMessage = encodeURIComponent(rawMessage);
    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    res.json({
      success: true,
      lead: newLead,
      sheetSynced: sheetSuccess,
      sheetMessage,
      whatsappUrl,
      whatsappMessage: rawMessage,
    });
  } catch (error: any) {
    console.error('Error handling lead submission:', error);
    res.status(500).json({ error: 'Server error processing lead submission.' });
  }
});

// Update lead status
app.patch('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const leadIndex = leads.findIndex((l) => l.id === id);

  if (leadIndex === -1) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  if (status) {
    leads[leadIndex].status = status;
    saveLeadsToFile();
  }

  res.json({ success: true, lead: leads[leadIndex] });
});

// Delete lead
app.delete('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  leads = leads.filter((l) => l.id !== id);
  saveLeadsToFile();
  res.json({ success: true });
});

// Test Google Sheet endpoint
app.post('/api/test-google-sheet', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'Google Sheet Web App URL is required.' });
  }

  try {
    const testPayload = {
      id: 'test_' + Date.now(),
      fullName: 'Test Lead (GLOBAL JUDE NETWORK)',
      email: 'test@example.com',
      phone: '09164311179',
      service: 'Website Design',
      selectedPackage: 'Growth',
      budget: '$2,500 – $5,000',
      description: 'This is a connection test from Global Jude Network landing page.',
      createdAt: new Date().toISOString(),
      isTest: true,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    if (response.ok) {
      return res.json({ success: true, message: 'Successfully pinged Google Sheet Web App!' });
    } else {
      return res.status(400).json({ error: `Google Sheet responded with HTTP status ${response.status}` });
    }
  } catch (err: any) {
    return res.status(500).json({ error: `Connection failed: ${err.message || 'CORS or unreachable URL'}` });
  }
});

// Export leads as CSV
app.get('/api/leads/export', (req, res) => {
  const headers = ['ID', 'Date', 'Full Name', 'Email', 'Phone', 'Service', 'Package', 'Budget', 'Description', 'Status', 'Sheet Synced'];
  const rows = leads.map((l) => [
    `"${l.id}"`,
    `"${l.createdAt}"`,
    `"${(l.fullName || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.service || '').replace(/"/g, '""')}"`,
    `"${(l.selectedPackage || '').replace(/"/g, '""')}"`,
    `"${(l.budget || '').replace(/"/g, '""')}"`,
    `"${(l.description || '').replace(/\n/g, ' ').replace(/"/g, '""')}"`,
    `"${l.status}"`,
    `"${l.sheetSynced ? 'Yes' : 'No'}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="leads-global-jude-network.csv"');
  res.send(csvContent);
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GLOBAL JUDE NETWORK server listening at http://localhost:${PORT}`);
  });
}

startServer();
