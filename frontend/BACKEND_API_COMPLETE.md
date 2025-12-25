# Complete Backend API Documentation

## Base URL
```
http://localhost:3002
```

## Email API Endpoints

### 1. Fetch Emails (Single Account)
**Endpoint:** `GET /email/fetch`

**Query Parameters:**
- `limit` (optional) - Number of emails to fetch (default: 10)
- `accountId` (optional) - Specific email account ID
- `folder` (optional) - Email folder (default: 'INBOX')

**Example:**
```bash
GET http://localhost:3002/email/fetch?limit=100
```

**Response:**
```json
{
  "success": true,
  "count": 100,
  "accountEmail": "your-email@gmail.com",
  "emails": [
    {
      "id": "12345",
      "accountEmail": "your-email@gmail.com",
      "subject": "Email Subject",
      "from": "sender@example.com",
      "to": "recipient@example.com",
      "date": "2024-01-01T00:00:00.000Z",
      "text": "Email body text",
      "html": "<p>Email body HTML</p>",
      "attachments": []
    }
  ]
}
```

---

### 2. Fetch Single Email by ID
**Endpoint:** `GET /email/email/:id`

**Parameters:**
- `id` - Email UID

**Query Parameters:**
- `accountId` (optional) - Email account ID

**Example:**
```bash
GET http://localhost:3002/email/email/12345
```

---

### 3. Fetch from All Accounts
**Endpoint:** `GET /email/fetch-all`

**Query Parameters:**
- `limit` (optional) - Number of emails per account (default: 10)

**Example:**
```bash
GET http://localhost:3002/email/fetch-all?limit=20
```

**Response:**
```json
{
  "success": true,
  "totalAccounts": 3,
  "results": [
    {
      "accountId": "account123",
      "accountEmail": "email1@gmail.com",
      "provider": "gmail",
      "success": true,
      "count": 20,
      "emails": [...]
    },
    {
      "accountId": "account456",
      "accountEmail": "email2@outlook.com",
      "provider": "outlook",
      "success": true,
      "count": 15,
      "emails": [...]
    }
  ]
}
```

---

### 4. Get All Email Accounts
**Endpoint:** `GET /email/accounts`

**Example:**
```bash
GET http://localhost:3002/email/accounts
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "accounts": [
    {
      "_id": "account123",
      "email": "email1@gmail.com",
      "provider": "gmail",
      "label": "Personal Gmail",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 5. Add Email Account
**Endpoint:** `POST /email/accounts`

**Body:**
```json
{
  "email": "your-email@gmail.com",
  "password": "your-app-password",
  "provider": "gmail",
  "label": "Personal Gmail"
}
```

**Supported Providers:**
- `gmail`
- `outlook`
- `yahoo`
- `icloud`
- `custom` (requires customHost)

**For Custom Provider:**
```json
{
  "email": "your-email@custom.com",
  "password": "your-password",
  "provider": "custom",
  "customHost": "imap.custom.com",
  "customPort": 993,
  "tls": true,
  "label": "Custom Email"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email account added successfully",
  "account": {
    "id": "account123",
    "email": "your-email@gmail.com",
    "provider": "gmail",
    "label": "Personal Gmail",
    "isActive": true
  }
}
```

---

### 6. Update Email Account
**Endpoint:** `PUT /email/accounts/:id`

**Parameters:**
- `id` - Account ID

**Body:**
```json
{
  "label": "Updated Label",
  "isActive": false
}
```

---

### 7. Delete Email Account
**Endpoint:** `DELETE /email/accounts/:id`

**Parameters:**
- `id` - Account ID

**Response:**
```json
{
  "success": true,
  "message": "Email account deleted successfully"
}
```

---

### 8. Test Email Connection
**Endpoint:** `POST /email/test-connection`

**Body:**
```json
{
  "email": "test@gmail.com",
  "password": "app-password",
  "provider": "gmail"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Connection successful"
}
```

---

## Other API Endpoints

### Contact Routes
**Base:** `/contact`
- POST `/contact` - Submit contact form

### Users Routes
**Base:** `/users`
- POST `/users/register` - Register new user
- POST `/users/login` - User login
- GET `/users` - Get all users

### AI Agent Proposal Routes
**Base:** `/aiAgentProposal`
- POST `/aiAgentProposal` - Submit AI agent proposal
- GET `/aiAgentProposal` - Get all proposals

---

## Environment Variables Required

```env
# Database
MONGODB_URI=mongodb://127.0.0.1:27017/eps

# Default Email (for backward compatibility)
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Server
PORT=3002
```

---

## Email Provider Settings

### Gmail
- **Host:** imap.gmail.com
- **Port:** 993
- **TLS:** true
- **Note:** Requires App Password (not regular password)

### Outlook/Office365
- **Host:** outlook.office365.com
- **Port:** 993
- **TLS:** true

### Yahoo
- **Host:** imap.mail.yahoo.com
- **Port:** 993
- **TLS:** true
- **Note:** Requires App Password

### iCloud
- **Host:** imap.mail.me.com
- **Port:** 993
- **TLS:** true
- **Note:** Requires App-Specific Password

---

## Database Schema

### EmailAccount Model
```javascript
{
  email: String (required, unique),
  password: String (required),
  provider: String (enum: gmail, outlook, yahoo, icloud, custom),
  label: String,
  customHost: String,
  customPort: Number (default: 993),
  tls: Boolean (default: true),
  isActive: Boolean (default: true),
  lastFetched: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

---

## Testing the API

### Using cURL

**Fetch Emails:**
```bash
curl http://localhost:3002/email/fetch?limit=10
```

**Add Account:**
```bash
curl -X POST http://localhost:3002/email/accounts \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@gmail.com",
    "password": "app-password",
    "provider": "gmail",
    "label": "Test Account"
  }'
```

**Get Accounts:**
```bash
curl http://localhost:3002/email/accounts
```

### Using Postman or Thunder Client
Import the endpoints and test with the examples above.

---

## Security Notes

1. **Never commit .env file** - Contains sensitive credentials
2. **Use App Passwords** - Not regular email passwords
3. **Enable 2FA** - Required for app passwords
4. **Secure Database** - Use authentication in production
5. **HTTPS in Production** - Always use SSL/TLS
6. **Rate Limiting** - Consider adding rate limits
7. **Input Validation** - All inputs are validated
8. **Password Encryption** - Consider encrypting stored passwords

---

## Current Status

✅ **Backend API:** Fully implemented and working
✅ **Database:** MongoDB connected
✅ **Email Fetching:** Working with IMAP
✅ **Multi-Account Support:** Implemented
✅ **Frontend Integration:** Connected to Admin Dashboard
✅ **Error Handling:** Comprehensive error responses
✅ **Documentation:** Complete

---

## Next Steps (Optional Enhancements)

1. Add password encryption for stored accounts
2. Implement email search/filter functionality
3. Add email reply/send capabilities
4. Implement email categorization
5. Add webhook notifications for new emails
6. Create email analytics dashboard
7. Add email export functionality
8. Implement email archiving
