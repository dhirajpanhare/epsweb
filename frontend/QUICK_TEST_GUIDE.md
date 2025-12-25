# Quick Test Guide - Email Fetching Feature

## Prerequisites
1. ✅ Backend server running on port 3002
2. ✅ MongoDB running on localhost:27017
3. ✅ Gmail App Password configured in `.env`
4. ✅ Frontend running (React app)

## Test Steps

### 1. Start Backend Server
```bash
cd backend
npm run dev
```

**Expected Output:**
```
✅ Server running on port 3002
Successfully connected to mongodb database...
```

### 2. Test API Directly (Optional)

**Using Browser:**
```
http://localhost:3002/email/fetch?limit=10
```

**Using cURL:**
```bash
curl http://localhost:3002/email/fetch?limit=10
```

**Expected Response:**
```json
{
  "success": true,
  "count": 10,
  "accountEmail": "your-email@gmail.com",
  "emails": [...]
}
```

### 3. Test Frontend Integration

1. **Login to Admin Dashboard:**
   - Navigate to `/admin`
   - Login with admin credentials

2. **Click "Fetch Emails" Button:**
   - Modal opens immediately
   - Shows loading spinner
   - Displays "Fetching Emails..." in header

3. **View Results:**
   - Table shows emails with:
     - Serial number
     - From address
     - Subject
     - Date
     - View button
   - Pagination shows (15 emails per page)

4. **Test Pagination:**
   - Click page numbers
   - Click Previous/Next buttons
   - Verify correct emails display

5. **View Email Details:**
   - Click "View" button on any email
   - See full email content
   - Click "Back to List" to return

6. **Close Modal:**
   - Click X button
   - Or click outside modal

## Troubleshooting

### Issue: "Failed to fetch emails"
**Solutions:**
1. Check backend server is running
2. Verify `.env` has correct credentials
3. Check Gmail IMAP is enabled
4. Verify App Password (not regular password)
5. Check console for detailed errors

### Issue: "Connection timeout"
**Solutions:**
1. Check internet connection
2. Verify firewall settings
3. Test IMAP connection manually
4. Check Gmail security settings

### Issue: Modal doesn't open
**Solutions:**
1. Check browser console for errors
2. Verify frontend is connected to backend
3. Check CORS settings
4. Verify API endpoint URL

### Issue: No emails showing
**Solutions:**
1. Check if inbox has emails
2. Increase limit parameter
3. Check email filters
4. Verify IMAP folder access

## API Endpoints Summary

### Fetch Emails (Current Implementation)
```
GET http://localhost:3002/email/fetch?limit=100
```

### Fetch All Accounts
```
GET http://localhost:3002/email/fetch-all?limit=20
```

### Get Email Accounts
```
GET http://localhost:3002/email/accounts
```

### Add Email Account
```
POST http://localhost:3002/email/accounts
Body: {
  "email": "test@gmail.com",
  "password": "app-password",
  "provider": "gmail",
  "label": "Test Account"
}
```

## Current Features

✅ **Working:**
- Email fetching from Gmail
- Modal display with loading state
- Table view with pagination (15 per page)
- Email detail view
- Full email body display (HTML/Text)
- Attachment information
- Responsive design
- Error handling

✅ **Backend:**
- Multi-account support
- Multiple email providers (Gmail, Outlook, Yahoo, iCloud)
- Account management (Add, Update, Delete)
- Connection testing
- Database storage

## Test Checklist

- [ ] Backend server starts successfully
- [ ] MongoDB connection established
- [ ] API endpoint responds correctly
- [ ] Frontend loads without errors
- [ ] "Fetch Emails" button visible
- [ ] Modal opens on button click
- [ ] Loading spinner displays
- [ ] Emails load in table
- [ ] Pagination works correctly
- [ ] Email detail view works
- [ ] Modal closes properly
- [ ] No console errors

## Success Criteria

✅ All tests pass
✅ No errors in console
✅ Smooth user experience
✅ Data displays correctly
✅ Pagination functions properly

## Next Steps

Once basic testing is complete, you can:
1. Add more email accounts
2. Test with different providers
3. Customize email display
4. Add search/filter features
5. Implement email actions (reply, forward, etc.)

## Support

If you encounter issues:
1. Check console logs (frontend & backend)
2. Verify environment variables
3. Test API endpoints directly
4. Review error messages
5. Check network tab in browser DevTools

---

**Status:** ✅ All systems operational and ready for testing!
