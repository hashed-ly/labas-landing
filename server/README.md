# Labas Landing Page - Backend Server

This is a simple Express.js server that handles contact form submissions from the Labas landing page.

## Features

- ✅ Contact form submission handling
- ✅ Cloudflare Turnstile verification
- ✅ Mailgun email integration
- ✅ CORS configuration
- ✅ Error handling
- ✅ Input validation

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:5173

# Mailgun Configuration
MAILGUN_API_KEY=your_mailgun_api_key_here
MAILGUN_DOMAIN=mg.labas.ly

# Cloudflare Turnstile
TURNSTILE_SECRET_KEY=0x4AAAAAAA5AFyrxyN6i-H_oZUm7Sf6HtkU
```

### 3. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### POST /api/contact

Handles contact form submissions.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+218 91-057 9911",
  "subject": "general",
  "message": "Hello, I have a question...",
  "token": "cloudflare_turnstile_token"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

### GET /api/health

Health check endpoint.

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2025-01-01T00:00:00.000Z"
}
```

## Testing

You can test the endpoint using curl:

```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+218 91-057 9911",
    "subject": "general",
    "message": "This is a test message",
    "token": "test_token"
  }'
```

## Deployment

### Option 1: Deploy with the Frontend (Recommended)

If using a platform like Vercel or Netlify, you can deploy this as serverless functions.

### Option 2: Separate Backend Deployment

Deploy to platforms like:
- Heroku
- Railway
- DigitalOcean App Platform
- AWS EC2/Elastic Beanstalk

Don't forget to:
1. Set environment variables on your hosting platform
2. Update `FRONTEND_URL` in `.env` to your production domain
3. Update the frontend API endpoint in `vite.config.js` or use environment variables

## Security Considerations

- ✅ CORS is configured to only allow requests from your frontend
- ✅ Turnstile verification prevents bot submissions
- ✅ Input validation prevents malicious data
- ✅ API keys are stored in environment variables
- ✅ Error messages don't expose sensitive information

## Troubleshooting

**Server won't start:**
- Check that port 3001 is not in use
- Verify all dependencies are installed
- Check `.env` file exists and has correct format

**Emails not sending:**
- Verify Mailgun API key and domain are correct
- Check Mailgun dashboard for error logs
- Ensure domain is verified in Mailgun

**Turnstile verification failing:**
- Verify secret key matches your site key
- Check that token is being sent from frontend
- Test with Cloudflare's test keys first

## Support

For issues or questions, contact: support@labas.ly

