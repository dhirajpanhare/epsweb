# Test API Connection - Email Fetching

## Current Implementation Status

✅ **Frontend (AdminHome.jsx):**
```javascript
// Line 237-252 in AdminHome.jsx
const handleFetchEmails = async () => {
    setShowModal(true);
    setLoading(true);
    setEmailData(null);
    
    try {
        const response = await fetch('http://localhost:3002/email/fetch?limit=100');
        const data = await response.json();
        
        if (data.success) {
            setEmailData(data);
            console.log('Fetched emails:', data.emails);
        } else {
            alert(`❌ Error: ${data.message}`);
            setShowModal(false);
        }
    } catch (err) {
        alert('❌ Failed to fetch emails. Check console for details.');
        console.error('Email fetch error:', err);
        setShowModal(false);
    } finally {
        setLoading(false);
    }
};
```

✅ **Backend (email.controller.js):**
```javascript
// Endpoint: GET /email/fetch
export const fetchEmails = async (req, res) => {
  const { limit = 10 } = req.query;
  // ... fetches emails from IMAP server
  res.status(200).json({
    success: true,
    count: emails.length,
    accountEmail: accountEmail,
    emails: emails.reverse()
  });
};
```

✅ **Backend Route (email.router.js):**
```javascript
router.get('/fetch', fetchEmails);
```

✅ **Backend App (app.js):**
```javascript
app.use("/email", EmailRouter);
```

## How to Test

### 1. Test Backend API Directly

**Option A: Using Browser**
```
http://localhost:3002/email/fetch?limit=5
```

**Option B: Using cURL**
```bash
curl http://localhost:3002/email/fetch?limit=5
```

**Option C: Using PowerShell**
```powershell
Invoke-RestMethod -Uri "http://localhost:3002/email/fetch?limit=5" -Method Get
```

**Expected Response:**
```json
{
  "success": true,
  "count": 5,
  "accountEmail": "your-email@gmail.com",
  "emails": [
    {
      "id": "12345",
      "accountEmail": "your-email@gmail.com",
      "subject": "Test Email",
      "from": "sender@example.com",
      "to": "recipient@example.com",
      "date": "2024-01-01T00:00:00.000Z",
      "text": "Email body",
      "html": "<p>Email body</p>",
      "attachments": []
    }
  ]
}
```

### 2. Test Frontend Integration

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   
   Expected output:
   ```
   ✅ Server running on port 3002
   Successfully connected to mongodb database...
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Navigate to Admin Dashboard:**
   ```
   http://localhost:5173/admin
   ```

4. **Click "Fetch Emails" Button**
   - Modal opens immediately
   - Shows loading spinner
   - After 2-5 seconds, emails appear in table
   - Pagination shows at bottom

5. **Check Browser Console:**
   - Should see: `Fetched emails: [...]`
   - No error messages

### 3. Troubleshooting

**If you see "Failed to fetch emails":**

1. **Check Backend is Running:**
   ```bash
   # Should return JSON response
   curl http://localhost:3002/email/fetch?limit=1
   ```

2. **Check CORS:**
   - Backend should have `app.use(cors());`
   - Already configured in `backend/app.js`

3. **Check .env File:**
   ```env
   SMTP_EMAIL=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ```

4. **Check Gmail Settings:**
   - IMAP enabled
   - App Password created (not regular password)
   - 2-Step Verification enabled

5. **Check Network Tab:**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Click "Fetch Emails"
   - Look for request to `http://localhost:3002/email/fetch`
   - Check response status and data

**Common Issues:**

| Issue | Solution |
|-------|----------|
| CORS error | Backend has `cors()` middleware - already added |
| Connection refused | Backend not running - start with `npm run dev` |
| Invalid credentials | Check .env file has correct App Password |
| Timeout | Check internet connection and Gmail IMAP settings |
| Empty response | Check if inbox has emails |

## API Flow Diagram

```
User clicks "Fetch Emails"
         ↓
Modal opens (loading state)
         ↓
Frontend sends GET request
         ↓
http://localhost:3002/email/fetch?limit=100
         ↓
Backend receives request
         ↓
Connects to Gmail IMAP
         ↓
Fetches emails from inbox
         ↓
Parses email data
         ↓
Returns JSON response
         ↓
Frontend receives data
         ↓
Updates modal with email table
         ↓
User sees emails with pagination
```

## Verification Checklist

- [ ] Backend server running on port 3002
- [ ] MongoDB connected successfully
- [ ] .env file has correct credentials
- [ ] API endpoint responds: `http://localhost:3002/email/fetch`
- [ ] Frontend can reach backend (no CORS errors)
- [ ] "Fetch Emails" button visible in Admin Dashboard
- [ ] Modal opens on button click
- [ ] Loading spinner displays
- [ ] Emails load in table
- [ ] Pagination works (15 emails per page)
- [ ] "View" button shows email details
- [ ] No errors in browser console
- [ ] No errors in backend console

## Success Indicators

✅ **Backend Console:**
```
🔄 Connecting to email server for your-email@gmail.com...
✅ Connected to INBOX
📧 Found 100 emails
✅ Email fetch completed
```

✅ **Frontend Console:**
```
Fetched emails: Array(100)
  0: {id: "12345", subject: "Test", from: "sender@example.com", ...}
  1: {id: "12346", subject: "Another", from: "sender2@example.com", ...}
  ...
```

✅ **Browser:**
- Modal displays with email table
- Pagination shows correct page numbers
- Emails display with proper formatting
- "View" button opens email details

## Current Status

✅ **API Integration:** COMPLETE
✅ **Frontend Code:** IMPLEMENTED
✅ **Backend Code:** IMPLEMENTED
✅ **Routes:** REGISTERED
✅ **Error Handling:** IMPLEMENTED
✅ **Loading States:** IMPLEMENTED
✅ **Modal UI:** COMPLETE

**Ready to test!** Just ensure backend is running and .env is configured.
