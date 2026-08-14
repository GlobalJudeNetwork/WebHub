export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT - GLOBAL JUDE NETWORK LEAD CAPTURE
 * ==============================================================================
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.google.com) and create a new Blank Spreadsheet.
 * 2. In the top menu, click 'Extensions' > 'Apps Script'.
 * 3. Delete any code in the editor, and paste THIS ENTIRE SCRIPT below.
 * 4. Click 'Save' (the floppy disk icon 💾).
 * 5. Click the blue 'Deploy' button at top right > 'New deployment'.
 * 6. Click the gear icon ⚙️ next to "Select type" and select 'Web app'.
 * 7. Fill in deployment settings:
 *    - Description: "Global Jude Network Lead Capture API"
 *    - Execute as: "Me" (your email)
 *    - Who has access: "Anyone"  <-- CRITICAL! Must be "Anyone" so the landing page can post leads.
 * 8. Click 'Deploy', then authorize access if prompted.
 * 9. Copy the generated 'Web App URL' (starts with https://script.google.com/macros/s/...).
 * 10. Paste that Web App URL in the 'Google Sheet Config' modal on your landing page!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create header row if sheet is fresh/empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Lead ID",
        "Full Name",
        "Email Address",
        "Phone / WhatsApp",
        "Service Needed",
        "Selected Package",
        "Project Budget",
        "Project Description",
        "Status"
      ]);
      
      // Style header row
      var headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0f172a"); // Dark slate
      headerRange.setFontColor("#f8fafc"); // Light text
    }
    
    // Parse incoming JSON payload
    var contents = e.postData.contents;
    var data = JSON.parse(contents);
    
    var timestamp = new Date();
    var leadId = data.id || "LEAD_" + Date.now();
    var fullName = data.fullName || "";
    var email = data.email || "";
    var phone = data.phone || "";
    var service = data.service || "";
    var selectedPackage = data.selectedPackage || "Starter";
    var budget = data.budget || "";
    var description = data.description || "";
    var status = data.isTest ? "TEST CONNECTION" : "NEW LEAD";
    
    // Append row
    sheet.appendRow([
      timestamp,
      leadId,
      fullName,
      email,
      phone,
      service,
      selectedPackage,
      budget,
      description,
      status
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "success", "message": "Lead saved successfully", "leadId": leadId }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "ok", "service": "Global Jude Network Lead Receiver Active" }))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
