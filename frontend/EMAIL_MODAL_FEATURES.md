# Email Modal Features

## Overview
A comprehensive email viewing modal has been added to the Admin Dashboard with full pagination and email detail viewing capabilities.

## Features Implemented

### 1. Modal Trigger
- **Fetch Emails Button** - Fetches up to 100 emails from the email server
- Loading state with disabled button during fetch
- Opens modal automatically when emails are fetched

### 2. Email Table View
- **Columns:**
  - # (Serial number)
  - From (Sender email)
  - Subject (Email subject line)
  - Date (Formatted date and time)
  - Action (View button)

- **Features:**
  - Sticky header for easy navigation
  - Hover effects on rows
  - Truncated text with ellipsis for long content
  - Responsive design

### 3. Pagination
- **15 emails per page**
- Previous/Next buttons
- Page number buttons (clickable)
- Active page highlighting
- Pagination info (e.g., "Showing 1 to 15 of 100 emails")
- Disabled state for first/last page buttons

### 4. Email Detail View
- Click "View" button to see full email
- **Displays:**
  - Full subject
  - From address
  - To address
  - Date and time
  - Full email body (HTML or plain text)
  - Attachments list (if any)

- **Features:**
  - Back button to return to list
  - HTML rendering for rich emails
  - Plain text display with proper formatting
  - Attachment information (filename and size)

### 5. Modal Controls
- **Close button (X)** - Top right corner
- **Click outside** - Closes modal
- **ESC key** - Can be added if needed
- Smooth animations (slide-in effect)

## User Flow

1. Admin clicks "Fetch Emails" button
2. System fetches emails from server (shows loading state)
3. Modal opens with email table (15 per page)
4. Admin can:
   - Browse through pages using pagination
   - Click "View" to see full email details
   - Click "Back to List" to return to table
   - Close modal using X button or clicking outside

## Styling
- Consistent with existing admin dashboard theme
- Accent blue color (#8CA9FF) for primary actions
- Smooth transitions and hover effects
- Fully responsive for mobile devices
- Maximum width of 1200px for optimal viewing

## Technical Details

### State Management
- `showModal` - Controls modal visibility
- `currentPage` - Tracks current pagination page
- `selectedEmail` - Stores email being viewed in detail
- `emailData` - Stores all fetched emails

### Pagination Logic
- 15 emails per page (configurable)
- Dynamic page number generation
- Index calculation for slicing email array
- Total pages calculation based on email count

### API Integration
- Endpoint: `GET /email/fetch?limit=100`
- Fetches up to 100 emails
- Returns structured email data with all fields

## Responsive Design
- Desktop: Full table with all columns
- Tablet: Adjusted column widths
- Mobile: Stacked layout with smaller fonts
- Modal adapts to screen size (95% width on mobile)

## Future Enhancements (Optional)
- Search/filter emails by subject or sender
- Sort by date, sender, or subject
- Mark emails as read/unread
- Delete emails
- Reply functionality
- Export emails to CSV
- Email categories/labels
