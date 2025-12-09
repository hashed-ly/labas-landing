// KYC form submission handler with Mailgun integration
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const {
    organizationNameArabic,
    organizationNameEnglish,
    organizationType,
    organizationTypeOther,
    commercialRegistrationNumber,
    taxId,
    address,
    officialEmail,
    officialPhone,
    website,
    authorizedPersonName,
    authorizedPersonPosition,
    authorizedPersonNationalId,
    authorizedPersonPhone,
    authorizedPersonEmail,
    bankName,
    accountHolderName,
    iban,
    termsAccepted,
    token,
  } = req.body;

  // Validate required fields (only Organization Information section is required for now)
  // Authorized Person and Banking sections are hidden and will be re-added later
  if (
    !organizationNameArabic ||
    !organizationNameEnglish ||
    !organizationType ||
    !commercialRegistrationNumber ||
    !address ||
    !officialEmail ||
    !officialPhone ||
    !termsAccepted ||
    !token
  ) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields',
    });
  }

  try {
    // Step 1: Verify Cloudflare Turnstile Token
    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: token,
        }),
      }
    );

    const verifyResult = await verifyResponse.json();

    if (!verifyResult.success) {
      console.error('Turnstile verification failed:', verifyResult);
      return res.status(400).json({
        success: false,
        error: 'Invalid captcha verification',
      });
    }

    // Step 2: Prepare email content
    const emailSubject = `[KYC Registration] New organization registration: ${organizationNameEnglish}`;

    const organizationTypeDisplay = organizationType === 'other' 
      ? organizationTypeOther 
      : organizationType.charAt(0).toUpperCase() + organizationType.slice(1);

    const messageData = {
      from: `Labas KYC Form <noreply@labas.ly>`,
      to: 'info@labas.ly',
      subject: emailSubject,
      text: `
New KYC Registration Submission

ORGANIZATION INFORMATION
========================
Organization Name (Arabic): ${organizationNameArabic}
Organization Name (English): ${organizationNameEnglish}
Type: ${organizationTypeDisplay}
Commercial Registration Number: ${commercialRegistrationNumber}
Tax ID: ${taxId || 'Not provided'}
Address: ${address}
Official Email: ${officialEmail}
Official Phone: ${officialPhone}
Website: ${website || 'Not provided'}

AUTHORIZED PERSON DETAILS
=========================
Full Name: ${authorizedPersonName || 'Not provided (section hidden)'}
Position: ${authorizedPersonPosition || 'Not provided (section hidden)'}
National ID/Passport: ${authorizedPersonNationalId || 'Not provided (section hidden)'}
Phone: ${authorizedPersonPhone || 'Not provided (section hidden)'}
Email: ${authorizedPersonEmail || 'Not provided (section hidden)'}

BANKING INFORMATION
==================
Bank Name: ${bankName || 'Not provided (section hidden)'}
Account Holder: ${accountHolderName || 'Not provided (section hidden)'}
IBAN: ${iban || 'Not provided (section hidden)'}

TERMS & CONDITIONS
==================
Accepted: ${termsAccepted ? 'Yes' : 'No'}

---
Submitted at: ${new Date().toISOString()}
      `.trim(),
      html: generateKYCEmailHTML({
        organizationNameArabic,
        organizationNameEnglish,
        organizationType: organizationTypeDisplay,
        commercialRegistrationNumber,
        taxId,
        address,
        officialEmail,
        officialPhone,
        website,
        authorizedPersonName,
        authorizedPersonPosition,
        authorizedPersonNationalId,
        authorizedPersonPhone,
        authorizedPersonEmail,
        bankName,
        accountHolderName,
        iban,
        termsAccepted,
      }),
    };

    // Step 3: Send email via Mailgun
    await mg.messages.create(process.env.MAILGUN_DOMAIN, messageData);

    console.log('KYC registration email sent successfully:', {
      organizationNameEnglish,
      officialEmail,
    });

    // Step 4: Return success response
    return res.status(200).json({
      success: true,
      message: 'Your registration has been submitted successfully!',
    });
  } catch (error) {
    console.error('KYC form submission error:', error);

    // Return appropriate error message
    if (error.message && error.message.includes('Mailgun')) {
      return res.status(500).json({
        success: false,
        error: 'Failed to send email. Please try again later.',
      });
    }

    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    });
  }
}

function generateKYCEmailHTML(data) {
  return `
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New KYC Registration - Labas</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6; 
      color: #1E1E1E;
      background-color: #F6F8FA;
      padding: 20px;
    }
    .email-wrapper { 
      max-width: 700px; 
      margin: 0 auto; 
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    .header { 
      background: linear-gradient(135deg, #0B3954 0%, #087E8B 100%);
      color: white; 
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 10px;
      letter-spacing: 1px;
    }
    .header-subtitle {
      font-size: 14px;
      opacity: 0.9;
      margin-top: 8px;
    }
    .badge {
      display: inline-block;
      background-color: #EBC042;
      color: #0B3954;
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-top: 15px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .content { 
      padding: 35px 30px;
      background-color: #ffffff;
    }
    .intro-text {
      color: #6B7280;
      margin-bottom: 30px;
      font-size: 14px;
      line-height: 1.6;
    }
    .section {
      margin-bottom: 35px;
      padding-bottom: 30px;
      border-bottom: 2px solid #E5E7EB;
    }
    .section:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #087E8B;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #087E8B;
    }
    .field-group {
      background-color: #F6F8FA;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;
    }
    .field { 
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #E5E7EB;
    }
    .field:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
    .label { 
      font-weight: 600;
      color: #0B3954;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }
    .value { 
      color: #1E1E1E;
      font-size: 15px;
      line-height: 1.5;
    }
    .value a {
      color: #087E8B;
      text-decoration: none;
      font-weight: 500;
    }
    .value a:hover {
      text-decoration: underline;
    }
    .value-empty {
      color: #9CA3AF;
      font-style: italic;
    }
    .footer { 
      background-color: #F6F8FA;
      padding: 25px 30px;
      text-align: center;
      border-top: 1px solid #E5E7EB;
    }
    .footer-text {
      font-size: 12px;
      color: #6B7280;
      margin-bottom: 8px;
    }
    .timestamp {
      font-size: 13px;
      color: #9CA3AF;
      font-weight: 500;
    }
    @media only screen and (max-width: 600px) {
      body { padding: 10px; }
      .header { padding: 30px 20px; }
      .content { padding: 25px 20px; }
      .footer { padding: 20px 15px; }
      .logo { font-size: 28px; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <!-- Header -->
    <div class="header">
      <div class="logo">لا باس · LABAS</div>
      <div class="header-subtitle">Your health, organized.</div>
      <div class="badge">New KYC Registration</div>
    </div>

    <!-- Content -->
    <div class="content">
      <p class="intro-text">
        You have received a new KYC registration submission from the Labas landing page. 
        Please review the details below and process accordingly.
      </p>

      <!-- Organization Information -->
      <div class="section">
        <h2 class="section-title">1. Organization Information</h2>
        
        <div class="field-group">
          <div class="field">
            <div class="label">🏢 Organization Name (Arabic)</div>
            <div class="value">${data.organizationNameArabic}</div>
          </div>

          <div class="field">
            <div class="label">🏢 Organization Name (English)</div>
            <div class="value">${data.organizationNameEnglish}</div>
          </div>

          <div class="field">
            <div class="label">📋 Type of Organization</div>
            <div class="value">${data.organizationType}</div>
          </div>

          <div class="field">
            <div class="label">📄 Commercial Registration Number</div>
            <div class="value">${data.commercialRegistrationNumber}</div>
          </div>

          <div class="field">
            <div class="label">🔢 Tax Identification Number</div>
            <div class="value">${data.taxId || '<span class="value-empty">Not provided</span>'}</div>
          </div>

          <div class="field">
            <div class="label">📍 Address</div>
            <div class="value">${data.address}</div>
          </div>

          <div class="field">
            <div class="label">📧 Official Email</div>
            <div class="value"><a href="mailto:${data.officialEmail}">${data.officialEmail}</a></div>
          </div>

          <div class="field">
            <div class="label">📱 Official Phone Number</div>
            <div class="value"><a href="tel:${data.officialPhone.replace(/[\s-]/g, '')}">${data.officialPhone}</a></div>
          </div>

          <div class="field">
            <div class="label">🌐 Website</div>
            <div class="value">${data.website ? `<a href="${data.website}" target="_blank">${data.website}</a>` : '<span class="value-empty">Not provided</span>'}</div>
          </div>
        </div>
      </div>

      <!-- Authorized Person Details (Hidden - will be re-added later) -->
      <div class="section">
        <h2 class="section-title">2. Authorized Person Details</h2>
        
        <div class="field-group">
          <div class="field">
            <div class="label">👤 Full Name</div>
            <div class="value">${data.authorizedPersonName || '<span class="value-empty">Not provided (section hidden)</span>'}</div>
          </div>

          <div class="field">
            <div class="label">💼 Position / Job Title</div>
            <div class="value">${data.authorizedPersonPosition || '<span class="value-empty">Not provided (section hidden)</span>'}</div>
          </div>

          <div class="field">
            <div class="label">🆔 National ID / Passport Number</div>
            <div class="value">${data.authorizedPersonNationalId || '<span class="value-empty">Not provided (section hidden)</span>'}</div>
          </div>

          <div class="field">
            <div class="label">📱 Phone Number</div>
            <div class="value">${data.authorizedPersonPhone ? `<a href="tel:${data.authorizedPersonPhone.replace(/[\s-]/g, '')}">${data.authorizedPersonPhone}</a>` : '<span class="value-empty">Not provided (section hidden)</span>'}</div>
          </div>

          <div class="field">
            <div class="label">📧 Email Address</div>
            <div class="value">${data.authorizedPersonEmail ? `<a href="mailto:${data.authorizedPersonEmail}">${data.authorizedPersonEmail}</a>` : '<span class="value-empty">Not provided (section hidden)</span>'}</div>
          </div>
        </div>
      </div>

      <!-- Banking Information (Hidden - will be re-added later) -->
      <div class="section">
        <h2 class="section-title">3. Banking & Payment Information</h2>
        
        <div class="field-group">
          <div class="field">
            <div class="label">🏦 Bank Name</div>
            <div class="value">${data.bankName || '<span class="value-empty">Not provided (section hidden)</span>'}</div>
          </div>

          <div class="field">
            <div class="label">👤 Account Holder Name</div>
            <div class="value">${data.accountHolderName || '<span class="value-empty">Not provided (section hidden)</span>'}</div>
          </div>

          <div class="field">
            <div class="label">💳 IBAN</div>
            <div class="value">${data.iban || '<span class="value-empty">Not provided (section hidden)</span>'}</div>
          </div>
        </div>
      </div>

      <!-- Terms & Conditions -->
      <div class="section">
        <h2 class="section-title">4. Terms & Conditions</h2>
        <div class="field-group">
          <div class="field">
            <div class="label">✅ Confirmation</div>
            <div class="value">
              <strong style="color: ${data.termsAccepted ? '#10B981' : '#D1444E'}">
                ${data.termsAccepted ? '✓ Accepted' : '✗ Not Accepted'}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">This message was sent via the Labas KYC registration form</p>
      <p class="timestamp">
        📅 ${new Date().toLocaleString('en-US', { 
          timeZone: 'Africa/Tripoli',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        })}
      </p>
      <p class="footer-text" style="margin-top: 15px;">
        © ${new Date().getFullYear()} Egate Company For Information Technology · All rights reserved
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

