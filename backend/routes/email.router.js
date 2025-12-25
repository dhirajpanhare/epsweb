import express from 'express';
import { 
  fetchEmails, 
  fetchEmailById, 
  fetchAllAccounts,
  addEmailAccount,
  getEmailAccounts,
  updateEmailAccount,
  deleteEmailAccount,
  testEmailConnection
} from '../controllers/email.controller.js';

const router = express.Router();

// Email fetching routes
router.get('/fetch', fetchEmails);                    // Fetch from single account
router.get('/fetch-all', fetchAllAccounts);           // Fetch from all accounts
router.get('/email/:id', fetchEmailById);             // Fetch single email by ID

// Email account management routes
router.get('/accounts', getEmailAccounts);            // Get all accounts
router.post('/accounts', addEmailAccount);            // Add new account
router.put('/accounts/:id', updateEmailAccount);      // Update account
router.delete('/accounts/:id', deleteEmailAccount);   // Delete account
router.post('/test-connection', testEmailConnection); // Test connection

export default router;
