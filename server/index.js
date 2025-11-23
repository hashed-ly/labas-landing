// Simple Express server for handling contact form submissions
// This is a basic example - you can adapt it to your preferred backend framework

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactHandler from './api/contact.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact form endpoint
app.post('/api/contact', contactHandler);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📧 Contact form endpoint: http://localhost:${PORT}/api/contact`);
  console.log(`🔑 Mailgun domain: ${process.env.MAILGUN_DOMAIN || 'Not configured'}`);
  console.log(`🛡️  Turnstile configured: ${process.env.TURNSTILE_SECRET_KEY ? 'Yes' : 'No'}`);
});

export default app;

