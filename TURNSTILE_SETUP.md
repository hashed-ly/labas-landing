# Cloudflare Turnstile Setup

## Production Keys

### Frontend (Public Site Key)
Add to `.env` file in the root directory:
```env
VITE_CLOUDFLARE_SITE_KEY=0x4AAAAAACFlVXsg3EdiBwxf
```

### Backend (Secret Key)
Add to `.env` file in the `server/` directory:
```env
TURNSTILE_SECRET_KEY=0x4AAAAAACFlVerbyDX0KoS3rz8OSA1YZrs
```

## Setup Instructions

### Frontend
1. Copy `.env.example` to `.env` in the root directory
2. Add the site key: `VITE_CLOUDFLARE_SITE_KEY=0x4AAAAAACFlVXsg3EdiBwxf`
3. Restart your development server

### Backend
1. Copy `server/.env.example` to `server/.env`
2. Add the secret key: `TURNSTILE_SECRET_KEY=0x4AAAAAACFlVerbyDX0KoS3rz8OSA1YZrs`
3. Restart your backend server

## Security Notes

- ✅ Site Key is public and safe to expose in frontend code
- ⚠️ Secret Key must NEVER be exposed in frontend code
- ⚠️ Keep `.env` files out of version control (already in `.gitignore`)
- ✅ Both keys are production-ready and configured for `labas.ly` domain

## Testing

After setting up the keys:
1. Restart both frontend and backend servers
2. Navigate to `/kyc` or `/contact` pages
3. The Turnstile widget should load without errors
4. Complete the challenge and submit the form
5. Check browser console - should see no Turnstile errors

## Troubleshooting

**Turnstile Error 110200:**
- Verify site key matches secret key
- Ensure domain is configured correctly in Cloudflare dashboard
- Check that keys are for the correct environment (production vs test)

**Widget not loading:**
- Check browser console for errors
- Verify `VITE_CLOUDFLARE_SITE_KEY` is set correctly
- Ensure Turnstile script is loading (check Network tab)

