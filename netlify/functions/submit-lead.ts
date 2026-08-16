import type { Handler } from '@netlify/functions';

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycby3zq2cVPp8ONRNGTSGtVskCcK8Xau50A17AYWZnfp1DnyHV7r7m69jJgLbsmVaPBTh/exec';
const WHATSAPP_NUMBER = '09164311179';

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { fullName, email, phone, service, selectedPackage, budget, description } = body;

    if (!fullName || !email || !phone || !service || !budget || !description) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Please complete all required fields.' }) };
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
    };

    let sheetSuccess = false;
    let sheetMessage = '';

    try {
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead),
      });
      if (response.ok) {
        sheetSuccess = true;
        sheetMessage = 'Successfully synced to Google Sheet.';
      } else {
        sheetMessage = `Google Sheet returned status ${response.status}`;
      }
    } catch (err: any) {
      sheetMessage = `Google Sheet forwarding error: ${err.message}`;
    }

    let waNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
    if (waNumber.startsWith('0')) waNumber = '234' + waNumber.substring(1);

    const rawMessage = `Hello GLOBAL JUDE NETWORK! 👋\n\nI just submitted a project inquiry on your website.\n\n👤 *Name:* ${newLead.fullName}\n✉️ *Email:* ${newLead.email}\n📱 *WhatsApp:* ${newLead.phone}\n🛠️ *Service:* ${newLead.service}\n📦 *Package:* ${newLead.selectedPackage}\n💰 *Budget:* ${newLead.budget}\n\n📝 *Project Description:*\n${newLead.description}\n\nLooking forward to hearing from you!`;
    const whatsappUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(rawMessage)}`;

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        lead: newLead,
        sheetSynced: sheetSuccess,
        sheetMessage,
        whatsappUrl,
        whatsappMessage: rawMessage,
      }),
    };
  } catch (error: any) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server error processing lead submission.' }) };
  }
};"Add submit-lead function"
