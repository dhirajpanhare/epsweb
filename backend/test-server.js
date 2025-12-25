// Simple test server to verify email fetching works
// Run with: node test-server.js

import express from 'express';
import cors from 'cors';
import imaps from 'imap-simple';
import { simpleParser } from 'mailparser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

const getEmailConfig = () => ({
  imap: {
    user: process.env.SMTP_EMAIL,
    password: process.env.SMTP_PASSWORD,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 10000
  }
});

app.get('/test-fetch', async (req, res) => {
  try {
    console.log('🔄 Testing email fetch...');
    console.log('Email:', process.env.SMTP_EMAIL);
    
    const config = getEmailConfig();
    const connection = await imaps.connect(config);
    console.log('✅ Connected to IMAP');
    
    await connection.openBox('INBOX');
    console.log('✅ Opened INBOX');
    
    const searchCriteria = ['ALL'];
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT', ''],
      markSeen: false
    };
    
    const messages = await connection.search(searchCriteria, fetchOptions);
    console.log(`✅ Found ${messages.length} emails`);
    
    const emails = [];
    const limit = 5;
    const messagesToProcess = messages.slice(-limit);
    
    for (const item of messagesToProcess) {
      const all = item.parts.find(part => part.which === '');
      const id = item.attributes.uid;
      const idHeader = "Imap-Id: " + id + "\r\n";
      
      if (all && all.body) {
        const mail = await simpleParser(idHeader + all.body);
        
        emails.push({
          id: id,
          subject: mail.subject || 'No Subject',
          from: mail.from?.text || 'Unknown',
          to: mail.to?.text || '',
          date: mail.date || new Date(),
          text: mail.text?.substring(0, 100) || '',
        });
      }
    }
    
    connection.end();
    console.log('✅ Fetch completed successfully');
    
    res.json({
      success: true,
      count: emails.length,
      accountEmail: process.env.SMTP_EMAIL,
      emails: emails.reverse()
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error.toString()
    });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`✅ Test server running on http://localhost:${PORT}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`\nTest the endpoint:`);
  console.log(`  Browser: http://localhost:${PORT}/test-fetch`);
  console.log(`  cURL: curl http://localhost:${PORT}/test-fetch`);
  console.log(`\nUsing credentials:`);
  console.log(`  Email: ${process.env.SMTP_EMAIL}`);
  console.log(`  Password: ${'*'.repeat(process.env.SMTP_PASSWORD?.length || 0)}`);
  console.log(`\n${'='.repeat(60)}\n`);
});
