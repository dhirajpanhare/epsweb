// Email Diagnostic Script
// Run with: node diagnose-email.js

import imaps from 'imap-simple';
import dotenv from 'dotenv';

dotenv.config();

const diagnose = async () => {
  console.log('='.repeat(60));
  console.log('EMAIL FETCHING DIAGNOSTIC TOOL');
  console.log('='.repeat(60));
  
  // Step 1: Check environment variables
  console.log('\n📋 Step 1: Checking Environment Variables');
  console.log('-'.repeat(60));
  
  const email = process.env.SMTP_EMAIL;
  const password = process.env.SMTP_PASSWORD;
  
  if (!email || !password) {
    console.error('❌ SMTP_EMAIL or SMTP_PASSWORD not found in .env file');
    console.log('\nPlease create a .env file with:');
    console.log('SMTP_EMAIL=your-email@gmail.com');
    console.log('SMTP_PASSWORD=your-app-password');
    process.exit(1);
  }
  
  console.log('✅ SMTP_EMAIL:', email);
  console.log('✅ SMTP_PASSWORD:', '*'.repeat(password.length), '(hidden)');
  
  // Step 2: Test IMAP connection
  console.log('\n🔌 Step 2: Testing IMAP Connection');
  console.log('-'.repeat(60));
  
  const config = {
    imap: {
      user: email,
      password: password,
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 10000
    }
  };
  
  try {
    console.log('🔄 Connecting to imap.gmail.com:993...');
    const connection = await imaps.connect(config);
    console.log('✅ Connected successfully!');
    
    // Step 3: Open inbox
    console.log('\n📬 Step 3: Opening INBOX');
    console.log('-'.repeat(60));
    
    await connection.openBox('INBOX');
    console.log('✅ INBOX opened successfully!');
    
    // Step 4: Search for emails
    console.log('\n🔍 Step 4: Searching for Emails');
    console.log('-'.repeat(60));
    
    const searchCriteria = ['ALL'];
    const fetchOptions = {
      bodies: ['HEADER'],
      markSeen: false
    };
    
    const messages = await connection.search(searchCriteria, fetchOptions);
    console.log(`✅ Found ${messages.length} emails in inbox`);
    
    if (messages.length > 0) {
      console.log('\n📧 Sample Email Info:');
      const sample = messages[messages.length - 1];
      const header = sample.parts.find(part => part.which === 'HEADER');
      if (header) {
        const subject = header.body.subject?.[0] || 'No Subject';
        const from = header.body.from?.[0] || 'Unknown';
        console.log('  Subject:', subject);
        console.log('  From:', from);
      }
    }
    
    connection.end();
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ ALL TESTS PASSED!');
    console.log('='.repeat(60));
    console.log('\nYour email configuration is working correctly.');
    console.log('The API should be able to fetch emails.');
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.log('\n' + '='.repeat(60));
    console.log('TROUBLESHOOTING STEPS:');
    console.log('='.repeat(60));
    
    if (error.message.includes('Invalid credentials')) {
      console.log('\n1. Invalid Credentials:');
      console.log('   - Make sure you are using an App Password, not your regular Gmail password');
      console.log('   - Generate App Password: https://myaccount.google.com/apppasswords');
      console.log('   - Enable 2-Step Verification first');
    } else if (error.message.includes('ETIMEDOUT') || error.message.includes('timeout')) {
      console.log('\n2. Connection Timeout:');
      console.log('   - Check your internet connection');
      console.log('   - Check firewall settings');
      console.log('   - Try disabling VPN if active');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.log('\n3. Connection Refused:');
      console.log('   - Gmail IMAP might be disabled');
      console.log('   - Enable IMAP: Gmail Settings → Forwarding and POP/IMAP → Enable IMAP');
    } else {
      console.log('\n4. Other Error:');
      console.log('   - Error details:', error.message);
      console.log('   - Check Gmail security settings');
      console.log('   - Try generating a new App Password');
    }
    
    process.exit(1);
  }
};

diagnose();
