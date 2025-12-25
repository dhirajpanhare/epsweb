import imaps from 'imap-simple';
import { simpleParser } from 'mailparser';
import EmailAccount from '../models/emailAccount.model.js';

// Email provider configurations
const EMAIL_PROVIDERS = {
  gmail: {
    host: 'imap.gmail.com',
    port: 993,
    tls: true
  },
  outlook: {
    host: 'outlook.office365.com',
    port: 993,
    tls: true
  },
  yahoo: {
    host: 'imap.mail.yahoo.com',
    port: 993,
    tls: true
  },
  icloud: {
    host: 'imap.mail.me.com',
    port: 993,
    tls: true
  },
  custom: {
    // For custom IMAP servers
    host: null,
    port: 993,
    tls: true
  }
};

// Get email configuration for a specific account
const getEmailConfig = (account) => {
  const provider = EMAIL_PROVIDERS[account.provider] || EMAIL_PROVIDERS.custom;
  
  return {
    imap: {
      user: account.email,
      password: account.password,
      host: account.customHost || provider.host,
      port: account.customPort || provider.port,
      tls: account.tls !== undefined ? account.tls : provider.tls,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 10000
    }
  };
};

// Legacy: Get default email config from env
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

// Helper function to check if email has attachments
const hasAttachmentsInStruct = (struct) => {
  if (!struct) return false;
  
  const checkPart = (part) => {
    if (Array.isArray(part)) {
      return part.some(p => checkPart(p));
    }
    if (part.disposition && part.disposition.type === 'attachment') {
      return true;
    }
    if (part.subtype && ['OCTET-STREAM', 'PDF', 'ZIP'].includes(part.subtype.toUpperCase())) {
      return true;
    }
    return false;
  };
  
  return checkPart(struct);
};

// Fetch emails from inbox (supports multiple accounts)
export const fetchEmails = async (req, res) => {
  try {
    const { limit = 10, accountId, folder = 'INBOX' } = req.query;
    
    let config;
    let accountEmail;

    if (accountId) {
      const account = await EmailAccount.findById(accountId);
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Email account not found'
        });
      }
      config = getEmailConfig(account);
      accountEmail = account.email;
    } else {
      config = getDefaultEmailConfig();
      accountEmail = process.env.SMTP_EMAIL;
    }
    
    console.log(`🔄 Connecting to email server for ${accountEmail}...`);
    const connection = await imaps.connect(config);
    
    await connection.openBox(folder);
    console.log(`✅ Connected to ${folder}`);

    const searchCriteria = ['ALL'];
    // Only fetch headers for list view - much faster!
    const fetchOptions = {
      bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
      struct: true,
      markSeen: false
    };

    const messages = await connection.search(searchCriteria, fetchOptions);
    console.log(`📧 Found ${messages.length} emails`);

    const emails = [];
    const messagesToProcess = messages.slice(-limit);

    // Process emails in parallel for better performance
    const emailPromises = messagesToProcess.map(async (item) => {
      const header = item.parts.find(part => part.which === 'HEADER.FIELDS (FROM TO SUBJECT DATE)');
      const id = item.attributes.uid;

      if (header && header.body) {
        // header.body is an object with the fields, not a stream
        const headerObj = header.body;
        
        return {
          id: id,
          accountEmail: accountEmail,
          subject: headerObj.subject?.[0] || 'No Subject',
          from: headerObj.from?.[0] || 'Unknown',
          to: headerObj.to?.[0] || '',
          date: headerObj.date?.[0] ? new Date(headerObj.date[0]) : new Date(),
          // Don't include body/html in list view - fetch on demand
          hasAttachments: item.attributes.struct ? hasAttachmentsInStruct(item.attributes.struct) : false
        };
      }
      return null;
    });

    const results = await Promise.all(emailPromises);
    emails.push(...results.filter(email => email !== null));

    connection.end();
    console.log('✅ Email fetch completed');

    res.status(200).json({
      success: true,
      count: emails.length,
      accountEmail: accountEmail,
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

// Fetch single email by ID with full content
export const fetchEmailById = async (req, res) => {
  try {
    const { id } = req.params;
    const { accountId } = req.query;
    
    let config;
    if (accountId) {
      const account = await EmailAccount.findById(accountId);
      if (!account) {
        return res.status(404).json({
          success: false,
          message: 'Email account not found'
        });
      }
      config = getEmailConfig(account);
    } else {
      config = getDefaultEmailConfig();
    }

    console.log(`🔄 Fetching full email content for ID: ${id}`);
    const connection = await imaps.connect(config);
    await connection.openBox('INBOX');

    const searchCriteria = [['UID', id]];
    const fetchOptions = {
      bodies: ['HEADER', 'TEXT', ''],
      markSeen: false
    };

    const messages = await connection.search(searchCriteria, fetchOptions);

    if (messages.length === 0) {
      connection.end();
      return res.status(404).json({
        success: false,
        message: 'Email not found'
      });
    }

    const item = messages[0];
    const all = item.parts.find(part => part.which === '');
    const idHeader = "Imap-Id: " + id + "\r\n";
    const mail = await simpleParser(idHeader + all.body);

    const email = {
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
    };

    connection.end();
    console.log(`✅ Full email content fetched for ID: ${id}`);

    res.status(200).json({
      success: true,
      email
    });

  } catch (error) {
    console.error('❌ Error fetching email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email',
      error: error.message
    });
  }
};

// Fetch emails from all configured accounts
export const fetchAllAccounts = async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const accounts = await EmailAccount.find({ isActive: true });
    
    if (accounts.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No email accounts configured',
        accounts: []
      });
    }

    const results = [];

    for (const account of accounts) {
      try {
        const config = getEmailConfig(account);
        console.log(`🔄 Fetching from ${account.email}...`);
        
        const connection = await imaps.connect(config);
        await connection.openBox('INBOX');

        const searchCriteria = ['ALL'];
        // Only fetch headers for better performance
        const fetchOptions = {
          bodies: ['HEADER.FIELDS (FROM TO SUBJECT DATE)'],
          struct: true,
          markSeen: false
        };

        const messages = await connection.search(searchCriteria, fetchOptions);
        const messagesToProcess = messages.slice(-limit);

        // Process emails in parallel
        const emailPromises = messagesToProcess.map(async (item) => {
          const header = item.parts.find(part => part.which === 'HEADER.FIELDS (FROM TO SUBJECT DATE)');
          const id = item.attributes.uid;

          if (header && header.body) {
            // header.body is an object with the fields, not a stream
            const headerObj = header.body;
            
            return {
              id: id,
              subject: headerObj.subject?.[0] || 'No Subject',
              from: headerObj.from?.[0] || 'Unknown',
              to: headerObj.to?.[0] || '',
              date: headerObj.date?.[0] ? new Date(headerObj.date[0]) : new Date(),
              hasAttachments: item.attributes.struct ? hasAttachmentsInStruct(item.attributes.struct) : false
            };
          }
          return null;
        });

        const emails = (await Promise.all(emailPromises)).filter(email => email !== null);

        connection.end();
        
        results.push({
          accountId: account._id,
          accountEmail: account.email,
          provider: account.provider,
          success: true,
          count: emails.length,
          emails: emails.reverse()
        });

      } catch (error) {
        console.error(`❌ Error fetching from ${account.email}:`, error.message);
        results.push({
          accountId: account._id,
          accountEmail: account.email,
          provider: account.provider,
          success: false,
          error: error.message
        });
      }
    }

    res.status(200).json({
      success: true,
      totalAccounts: accounts.length,
      results
    });

  } catch (error) {
    console.error('❌ Error fetching all accounts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch emails from accounts',
      error: error.message
    });
  }
};

// Add new email account
export const addEmailAccount = async (req, res) => {
  try {
    const { email, password, provider, customHost, customPort, tls, label } = req.body;

    if (!email || !password || !provider) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and provider are required'
      });
    }

    // Test connection before saving
    const testAccount = {
      email,
      password,
      provider,
      customHost,
      customPort,
      tls
    };

    try {
      const config = getEmailConfig(testAccount);
      const connection = await imaps.connect(config);
      await connection.openBox('INBOX');
      connection.end();
      console.log(`✅ Connection test successful for ${email}`);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Failed to connect to email server. Please check credentials.',
        error: error.message
      });
    }

    // Save account
    const account = new EmailAccount({
      email,
      password,
      provider,
      customHost,
      customPort,
      tls,
      label: label || email,
      isActive: true
    });

    await account.save();

    res.status(201).json({
      success: true,
      message: 'Email account added successfully',
      account: {
        id: account._id,
        email: account.email,
        provider: account.provider,
        label: account.label,
        isActive: account.isActive
      }
    });

  } catch (error) {
    console.error('❌ Error adding email account:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add email account',
      error: error.message
    });
  }
};

// Get all email accounts
export const getEmailAccounts = async (req, res) => {
  try {
    const accounts = await EmailAccount.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: accounts.length,
      accounts
    });

  } catch (error) {
    console.error('❌ Error fetching accounts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email accounts',
      error: error.message
    });
  }
};

// Update email account
export const updateEmailAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const account = await EmailAccount.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Email account not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Email account updated successfully',
      account
    });

  } catch (error) {
    console.error('❌ Error updating account:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update email account',
      error: error.message
    });
  }
};

// Delete email account
export const deleteEmailAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await EmailAccount.findByIdAndDelete(id);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Email account not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Email account deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting account:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete email account',
      error: error.message
    });
  }
};

// Test email account connection
export const testEmailConnection = async (req, res) => {
  try {
    const { email, password, provider, customHost, customPort, tls } = req.body;

    const testAccount = {
      email,
      password,
      provider,
      customHost,
      customPort,
      tls
    };

    const config = getEmailConfig(testAccount);
    const connection = await imaps.connect(config);
    await connection.openBox('INBOX');
    connection.end();

    res.status(200).json({
      success: true,
      message: 'Connection successful'
    });

  } catch (error) {
    console.error('❌ Connection test failed:', error);
    res.status(400).json({
      success: false,
      message: 'Connection failed',
      error: error.message
    });
  }
};
