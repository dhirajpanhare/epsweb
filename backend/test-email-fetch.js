// Quick test script to fetch emails using SMTP credentials from .env
import dotenv from 'dotenv';
import imaps from 'imap-simple';
import { simpleParser } from 'mailparser';

dotenv.config();

const config = {
  imap: {
    user: process.env.SMTP_EMAIL,
    password: process.env.SMTP_PASSWORD,
    host: 'imap.gmail.com',
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
    authTimeout: 10000
  }
};

async function testEmailFetch() {
  try {
    console.log('🔄 Testing email fetch with SMTP credentials...');
    console.log(`📧 Email: ${process.env.SMTP_EMAIL}`);
    
    const connection = await imaps.connect(config);
    console.log('✅ Connected to Gmail IMAP server');
    
    await connection.openBox('INBOX');
    console.log('✅ Opened INBOX');

    const searchCriteria = ['ALL'];
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT', ''],
      markSeen: false
    };

    const messages = await connection.search(searchCriteria, fetchOptions);
    console.log(`📧 Found ${messages.length} total emails`);

    // Get latest 5 emails
    const recentMessages = messages.slice(-5);
    console.log(`\n📬 Latest 5 emails:\n`);

    for (const item of recentMessages) {
      const all = item.parts.find(part => part.which === '');
      const id = item.attributes.uid;
      const idHeader = "Imap-Id: " + id + "\r\n";

      if (all && all.body) {
        const mail = await simpleParser(idHeader + all.body);
        console.log(`  ID: ${id}`);
        console.log(`  Subject: ${mail.subject || 'No Subject'}`);
        console.log(`  From: ${mail.from?.text || 'Unknown'}`);
        console.log(`  Date: ${mail.date || 'Unknown'}`);
        console.log(`  ---`);
      }
    }

    connection.end();
    console.log('\n✅ Test completed successfully!');
    console.log('\n💡 Your SMTP credentials are working correctly.');
    console.log('💡 You can now use the API endpoint: GET /email/fetch?limit=20');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('  1. Check if SMTP_EMAIL and SMTP_PASSWORD are set in .env');
    console.error('  2. Make sure you are using Gmail App Password (not regular password)');
    console.error('  3. Enable IMAP in Gmail settings');
    console.error('  4. Check your internet connection');
  }
}

testEmailFetch();
