import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create mail transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  debug: true, // Enable debug logging
  logger: true // Enable built-in logger
});

// Verify SMTP connection on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('SMTP Connection Success:', success);
    console.log('Mail server is ready to send messages');
  }
});

// Logo URLs - Using PNG files from S3
const MATRON_LOGO = 'https://amritanam-s3-bucket.s3.ap-south-1.amazonaws.com/Matron/matron.png';
const SKYBER_LOGO = 'https://amritanam-s3-bucket.s3.ap-south-1.amazonaws.com/Matron/skyber.png';

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    console.log('Received email request:', {
      name: req.body.name,
      email: req.body.email,
      timestamp: new Date().toISOString()
    });

    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      console.error('Missing required fields');
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const formattedDate = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    const formattedTime = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    // Create text version of the email
    const textContent = `
New Message from MATRON Portfolio Contact Form

Date: ${formattedDate}
Time: ${formattedTime}

From: ${name}
Email: ${email}

Message:
${message}

---
This is an automated message from MATRON Portfolio Contact Form.
© ${new Date().getFullYear()} MATRON. All rights reserved.
Powered by SKYBER (https://www.skybersupport.me/)
    `.trim();

    // Create HTML version with improved formatting
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <title>New Contact Form Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.5; color: #333333; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; margin: 20px auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
    <!-- Header with MATRON logo -->
    <div style="text-align: center; padding: 30px 20px; background: linear-gradient(to right, #000000, #1a1a1a);">
      <img src="${MATRON_LOGO}" alt="MATRON" style="width: 180px; height: auto; margin: 0 auto; display: block;">
    </div>

    <!-- Main Content -->
    <div style="padding: 30px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse;">
        <tr>
          <td>
            <h2 style="margin: 0 0 20px; color: #000000; font-size: 24px; font-weight: 600; text-align: center;">New Contact Form Message</h2>
            
            <!-- Timestamp -->
            <div style="text-align: center; margin-bottom: 30px; color: #666666; font-size: 14px;">
              <p style="margin: 5px 0;">${formattedDate}</p>
              <p style="margin: 5px 0;">${formattedTime}</p>
            </div>

            <!-- Contact Details -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding-bottom: 15px;">
                    <p style="margin: 0 0 5px; color: #666666;">From:</p>
                    <p style="margin: 0; color: #000000; font-size: 16px; font-weight: 600;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin: 0 0 5px; color: #666666;">Email:</p>
                    <p style="margin: 0;"><a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Message Content -->
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px;">
              <p style="margin: 0 0 10px; color: #666666;">Message:</p>
              <p style="margin: 0; color: #000000; white-space: pre-wrap;">${message}</p>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Footer -->
    <div style="background-color: #f8f9fa; padding: 30px 20px; text-align: center; border-top: 1px solid #eeeeee;">
      <p style="margin: 0 0 20px; color: #666666; font-size: 14px;">This is an automated message from MATRON Portfolio Contact Form.</p>
      
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse;">
        <tr>
          <td align="center">
            <a href="https://www.skybersupport.me" target="_blank" rel="noopener noreferrer" style="display: inline-block; text-decoration: none; color: #666666;">
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="font-size: 14px; padding-right: 4px;">Powered By</td>
                  <td style="padding: 0 4px;">
                    <img src="${SKYBER_LOGO}" alt="" style="width: 20px; height: 20px; vertical-align: middle; opacity: 0.8;">
                  </td>
                  <td style="font-size: 14px; font-weight: 500; padding-left: 4px;">SKYBER</td>
                </tr>
              </table>
            </a>
          </td>
        </tr>
      </table>
      
      <p style="margin: 20px 0 0; color: #999999; font-size: 12px;">© ${new Date().getFullYear()} MATRON. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    // Log mail configuration
    console.log('Mail configuration:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? '***' : 'not set',
      pass: process.env.SMTP_PASS ? '***' : 'not set',
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO
    });

    // Email options with improved configuration for better deliverability
    const mailOptions = {
      from: {
        name: 'MATRON Portfolio',
        address: process.env.MAIL_FROM || 'matron-mail@skybersupport.me'
      },
      to: process.env.MAIL_TO || 'soul@skybersupport.me',
      subject: `[MATRON] New Contact Message from ${name}`,
      text: textContent,
      html: htmlContent,
      replyTo: {
        name: name,
        address: email
      },
      headers: {
        'X-Entity-Ref-ID': `matron-${Date.now()}`,
        'List-Unsubscribe': `<mailto:${process.env.MAIL_FROM || 'matron-mail@skybersupport.me'}?subject=unsubscribe>`,
        'Feedback-ID': `matron-contact-form:skybersupport:${Date.now()}`,
        'X-Priority': '3',
        'Precedence': 'bulk',
        'X-Auto-Response-Suppress': 'OOF, AutoReply'
      }
    };

    console.log('Attempting to send email...');
    
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);

    res.status(200).json({ 
      message: 'Email sent successfully',
      messageId: info.messageId 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode,
      stack: error.stack
    });

    res.status(500).json({ 
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Serve static files from the dist directory
app.use(express.static(join(process.cwd(), 'dist')));

// Handle SPA routing
app.get('*', (req, res) => {
  res.sendFile(join(process.cwd(), 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment variables loaded:', {
    SMTP_HOST: process.env.SMTP_HOST ? '***' : 'not set',
    SMTP_PORT: process.env.SMTP_PORT ? '***' : 'not set',
    SMTP_USER: process.env.SMTP_USER ? '***' : 'not set',
    SMTP_PASS: process.env.SMTP_PASS ? '***' : 'not set',
    MAIL_FROM: process.env.MAIL_FROM ? '***' : 'not set',
    MAIL_TO: process.env.MAIL_TO ? '***' : 'not set'
  });
}); 