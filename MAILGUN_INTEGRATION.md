# Mailgun Integration Guide

## 📧 Contact Form Setup

The contact form in `src/pages/Home/sections/ContactSection.vue` is ready for Mailgun integration.

### Current Implementation

The form collects:
- Name (required)
- Email (required)
- Phone (optional)
- Message (required)

### Integration Steps

1. **Create Backend Endpoint**
   - Create a server endpoint (e.g., `/api/contact`)
   - This endpoint will forward form data to Mailgun API
   - Keep Mailgun API key on server-side (never expose in frontend)

2. **Update Form Handler**

   In `src/pages/Home/sections/ContactSection.vue`, update the `handleSubmit` function:

   ```javascript
   const handleSubmit = async () => {
     try {
       const response = await fetch('/api/contact', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData.value),
       });

       if (response.ok) {
         // Show success message
         // Reset form
         formData.value = { name: '', email: '', phone: '', message: '' };
       } else {
         // Show error message
       }
     } catch (error) {
       // Handle error
     }
   };
   ```

3. **Backend Example (Node.js/Express)**

   ```javascript
   const formData = require('form-data');
   const Mailgun = require('mailgun.js');
   const mailgun = new Mailgun(formData);
   const mg = mailgun.client({
     username: 'api',
     key: process.env.MAILGUN_API_KEY,
   });

   app.post('/api/contact', async (req, res) => {
     const { name, email, phone, message, token } = req.body;

     // Verify Turnstile Token
     const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         secret: process.env.TURNSTILE_SECRET_KEY,
         response: token,
       }),
     });
     const verifyResult = await verifyResponse.json();
     if (!verifyResult.success) {
       return res.status(400).json({ success: false, error: 'Invalid captcha' });
     }

     const messageData = {
       from: `Contact Form <noreply@labas.ly>`,
       to: 'support@labas.ly',
       subject: `New Contact Form Submission from ${name}`,
       text: `
         Name: ${name}
         Email: ${email}
         Phone: ${phone || 'Not provided'}
         
         Message:
         ${message}
       `,
       html: `
         <h2>New Contact Form Submission</h2>
         <p><strong>Name:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
         <p><strong>Message:</strong></p>
         <p>${message.replace(/\n/g, '<br>')}</p>
       `,
     };

     try {
       await mg.messages.create(process.env.MAILGUN_DOMAIN, messageData);
       res.json({ success: true });
     } catch (error) {
       console.error('Mailgun error:', error);
       res.status(500).json({ success: false, error: 'Failed to send email' });
     }
   });
   ```

4. **Environment Variables**

   Set these in your backend:
   - `MAILGUN_API_KEY` - Your Mailgun API key
   - `MAILGUN_DOMAIN` - Your verified Mailgun domain (e.g., `mg.labas.ly`)
   - `TURNSTILE_SECRET_KEY` - Cloudflare Turnstile Secret Key

5. **Form Validation**

   Add client-side validation:
   - Email format validation
   - Required field checks
   - Message length limits
   - Spam protection (reCAPTCHA or similar)

6. **User Feedback**

   Add success/error messages:
   ```vue
   <div v-if="submitStatus === 'success'" class="success-message">
     {{ t('contact.form.success') }}
   </div>
   <div v-if="submitStatus === 'error'" class="error-message">
     {{ t('contact.form.error') }}
   </div>
   ```

### Security Considerations

- ✅ Never expose Mailgun API key in frontend code
- ✅ Use backend endpoint as proxy
- ✅ Validate and sanitize all form inputs
- ✅ Implement rate limiting
- ✅ Add CSRF protection
- ✅ Consider adding reCAPTCHA

### Testing

1. Test form submission with valid data
2. Test form validation with invalid data
3. Test error handling (network errors, server errors)
4. Verify emails are received correctly
5. Test in both Arabic and English

