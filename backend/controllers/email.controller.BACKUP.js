// BACKUP - Simple working version
import imaps from 'imap-simple';
import { simpleParser } from 'mailparser';

const getDefaultEmailConfig = () => ({
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

export const fetchEmails = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    console.log('🔄 Connecting to email server...');
    const config = getDefaultEmailConfig();
    const connection = await imaps.connect(config);
    
    await connection.openBox('INBOX');
    console.log('✅ Connected to INBOX');

    const searchCriteria = ['ALL'];
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT', ''],
      markSeen: false
    };

    const messages = await connection.search(searchCriteria, fetchOptions);
    console.log(`📧 Found ${messages.length} emails`);

    const emails = [];
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
          text: mail.text || '',
          html: mail.html || '',
          attachments: mail.attachments?.map(att => ({
            filename: att.filename,
            contentType: att.contentType,
            size: att.size
          })) || []
        });
      }
    }

    connection.end();
    console.log('✅ Email fetch completed');

    res.status(200).json({
      success: true,
      count: emails.length,
      emails: emails.reverse()
    });

  } catch (error) {
    console.error('❌ Error fetching emails:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch emails',
      error: error.message
    });
  }
};
