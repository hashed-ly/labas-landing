// Example Express.js endpoint for contact form submission
// This file shows how to integrate Mailgun and Cloudflare Turnstile verification

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

  const { name, email, phone, subject, message, token } = req.body;

  // Validate required fields
  if (!name || !email || !message || !token) {
    return res.status(400).json({ 
      success: false, 
      error: 'Missing required fields' 
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
        error: 'Invalid captcha verification' 
      });
    }

    // Step 2: Prepare email content
    const subjectMap = {
      general: 'General Inquiry',
      support: 'Technical Support',
      sales: 'Sales & Business',
      partnership: 'Partnership',
      other: 'Other',
    };

    const emailSubject = `[${subjectMap[subject] || 'Contact Form'}] New message from ${name}`;

    const messageData = {
      from: `Labas Contact Form <noreply@labas.ly>`,
      to: 'support@labas.ly',
      subject: emailSubject,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subjectMap[subject] || subject}

Message:
${message}

---
Submitted at: ${new Date().toISOString()}
      `.trim(),
      html: `
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission - Labas</title>
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
      max-width: 600px; 
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
    .field-group {
      background-color: #F6F8FA;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .field { 
      margin-bottom: 18px;
      padding-bottom: 18px;
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
    .message-box { 
      background-color: #ffffff;
      padding: 20px;
      border-left: 4px solid #087E8B;
      border-radius: 6px;
      margin-top: 10px;
      color: #374151;
      font-size: 15px;
      line-height: 1.7;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    }
    .subject-badge {
      display: inline-block;
      background-color: #087E8B;
      color: white;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 500;
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
    .action-buttons {
      margin-top: 25px;
      text-align: center;
    }
    .btn {
      display: inline-block;
      padding: 12px 28px;
      background-color: #087E8B;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      font-size: 14px;
      transition: background-color 0.2s;
    }
    .btn:hover {
      background-color: #06656F;
    }
    .divider {
      height: 1px;
      background: linear-gradient(to right, transparent, #E5E7EB, transparent);
      margin: 25px 0;
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
      <div class="badge">New Contact Message</div>
    </div>

    <!-- Content -->
    <div class="content">
      <p class="intro-text">
        You have received a new message from the Labas landing page contact form. 
        Please review the details below and respond promptly.
      </p>

      <div class="field-group">
        <div class="field">
          <div class="label">👤 Full Name</div>
          <div class="value">${name}</div>
        </div>

        <div class="field">
          <div class="label">📧 Email Address</div>
          <div class="value"><a href="mailto:${email}">${email}</a></div>
        </div>

        <div class="field">
          <div class="label">📱 Phone Number</div>
          <div class="value">${phone || '<em style="color: #9CA3AF;">Not provided</em>'}</div>
        </div>

        <div class="field">
          <div class="label">📋 Subject Category</div>
          <div class="value">
            <span class="subject-badge">${subjectMap[subject] || subject}</span>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="field">
        <div class="label">💬 Message</div>
        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
      </div>

      <div class="action-buttons">
        <a href="mailto:${email}?subject=Re: ${subjectMap[subject] || subject}" class="btn">
          Reply to ${name}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">This message was sent via the Labas contact form</p>
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
      `.trim(),
    };

    // Step 3: Send email via Mailgun
    await mg.messages.create(process.env.MAILGUN_DOMAIN, messageData);

    console.log('Contact form email sent successfully:', { name, email, subject });

    // Step 4: Return success response
    return res.status(200).json({ 
      success: true,
      message: 'Your message has been sent successfully!' 
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Return appropriate error message
    if (error.message && error.message.includes('Mailgun')) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send email. Please try again later.' 
      });
    }

    return res.status(500).json({ 
      success: false, 
      error: 'An unexpected error occurred. Please try again.' 
    });
  }
}

