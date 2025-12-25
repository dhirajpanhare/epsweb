# Troubleshooting: Unable to Load Emails

## Quick Diagnostic Steps

### Step 1: Check if Backend is Running

**Open a terminal and run:**
```bash
cd backend
npm run dev
```

**Expected output:**
```
✅ Server running on port 3002
Successfully connected to mongodb database...
```

**If you see errors:**
- Install dependencies: `npm install`
- Check if port 3002 is already in use
- Check MongoDB is running

---

### Step 2: Test Backend API Directly

**Option A: Using Browser**
Open this URL in your browser:
```
http://localhost:3002/email/fetch?limit=5
```

**Expected response:**
```json
{
  "success": true,
  "count": 5,
  "accountEmail": "dhirajpanhare08@gmail.com",
  "emails": [...]
}
```

**Option B: Using Command Line**
```bash
# Windows PowerShell
Invoke-RestMethod -Uri "http://localhost:3002/email/fetch?limit=5" -Method Get

# Or using curl (if installed)
curl http://localhost:3002/email/fetch?limit=5
```

**Option C: Run diagnostic script**
```bash
cd backend
node diagnose-email.js
```

---

### Step 3: Check Browser Console

1. Open your frontend in browser
2. Press F12 to open DevTools
3. Go to Console tab
4. Click "Fetch Emails" button
5. Look for error messages

**Common errors and solutions:**

#### Error: "Failed to fetch"
**Cause:** Backend not running or wrong URL
**Solution:**
- Make sure backend is running on port 3002
- Check URL in AdminHome.jsx is `http://localhost:3002/email/fetch`

#### Error: "CORS policy"
**Cause:** CORS not enabled in backend
**Solution:**
- Backend already has `app.use(cors())` - should be working
- If still seeing CORS error, restart backend server

#### Error: "NetworkError"
**Cause:** Network/firewall blocking request
**Solution:**
- Check firewall settings
- Try disabling antivirus temporarily
- Check if localhost is accessible

---

### Step 4: Check Backend Console

Look at the terminal where backend is running. You should see:

**When API is called:**
```
🔄 Connecting to email server for dhirajpanhare08@gmail.com...
✅ Connected to INBOX
📧 Found 100 emails
✅ Email fetch completed
```

**If you see errors:**

#### Error: "Invalid credentials"
**Solution:**
1. Go to: https://myaccount.google.com/apppasswords
2. Enable 2-Step Verification first
3. Generate new App Password
4. Update `backend/.env`:
   ```
   SMTP_EMAIL=dhirajpanhare08@gmail.com
   SMTP_PASSWORD=your-new-app-password
   ```
5. Restart backend server

#### Error: "Connection timeout"
**Solution:**
- Check internet connection
- Check firewall/antivirus
- Try disabling VPN
- Check Gmail IMAP is enabled

#### Error: "IMAP disabled"
**Solution:**
1. Go to Gmail Settings
2. Click "Forwarding and POP/IMAP"
3. Enable IMAP access
4. Save changes

---

### Step 5: Verify Gmail Settings

1. **Enable IMAP:**
   - Gmail → Settings → Forwarding and POP/IMAP
   - Enable IMAP
   - Save Changes

2. **Create App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the 16-character password
   - Use this in `.env` file (no spaces)

3. **Enable 2-Step Verification:**
   - Required for App Passwords
   - Go to: https://myaccount.google.com/security

---

## Quick Fix Commands

### 1. Restart Everything
```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

### 2. Test Backend API
```bash
# Run diagnostic
cd backend
node diagnose-email.js
```

### 3. Check Logs
```bash
# Backend logs
cd backend
npm run dev
# Watch for errors when you click "Fetch Emails"

# Frontend logs
# Open browser console (F12)
# Click "Fetch Emails"
# Check for errors
```

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Modal opens but stays loading | Backend not responding | Check backend is running |
| "Failed to fetch" error | Backend not running | Start backend: `cd backend && npm run dev` |
| "Invalid credentials" | Wrong password | Use App Password, not regular password |
| "Connection timeout" | Network/firewall | Check internet, disable VPN |
| Empty response | No emails in inbox | Check Gmail inbox has emails |
| CORS error | CORS not enabled | Already enabled - restart backend |

---

## Verification Checklist

Run through this checklist:

- [ ] Backend server is running (`npm run dev` in backend folder)
- [ ] See "Server running on port 3002" message
- [ ] MongoDB connected successfully
- [ ] `.env` file exists in backend folder
- [ ] `.env` has SMTP_EMAIL and SMTP_PASSWORD
- [ ] Using App Password (16 characters, no spaces)
- [ ] Gmail IMAP is enabled
- [ ] 2-Step Verification is enabled
- [ ] Can access `http://localhost:3002/email/fetch?limit=5` in browser
- [ ] Frontend is running
- [ ] No CORS errors in browser console
- [ ] No errors in backend console

---

## Test Commands

### Test 1: Backend Health Check
```bash
curl http://localhost:3002/email/fetch?limit=1
```

### Test 2: Run Diagnostic
```bash
cd backend
node diagnose-email.js
```

### Test 3: Check Environment
```bash
cd backend
cat .env
# Should show:
# SMTP_EMAIL=dhirajpanhare08@gmail.com
# SMTP_PASSWORD=orryxsirlwmwzqon
```

---

## Still Not Working?

1. **Check Backend Console Output:**
   - Copy any error messages
   - Look for specific error codes

2. **Check Browser Console:**
   - Press F12
   - Go to Console tab
   - Copy any error messages

3. **Check Network Tab:**
   - Press F12
   - Go to Network tab
   - Click "Fetch Emails"
   - Look for request to `/email/fetch`
   - Check status code and response

4. **Try Manual Test:**
   ```bash
   cd backend
   node diagnose-email.js
   ```
   This will tell you exactly what's wrong.

---

## Contact Information

If you're still having issues, provide:
1. Backend console output
2. Browser console errors
3. Output from `node diagnose-email.js`
4. Network tab screenshot showing the failed request
