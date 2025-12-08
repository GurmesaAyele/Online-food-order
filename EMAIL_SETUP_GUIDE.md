# Email Setup Guide - Gmail SMTP

## 📧 How to Set Up Gmail for Sending Emails

The system is configured to send emails from: **gurmesaayele49@gmail.com**

### Step 1: Enable 2-Step Verification

1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Under "Signing in to Google", click on "2-Step Verification"
4. Follow the steps to enable 2-Step Verification

### Step 2: Generate App Password

1. After enabling 2-Step Verification, go back to Security settings
2. Under "Signing in to Google", click on "App passwords"
3. You might need to sign in again
4. Select app: Choose "Mail"
5. Select device: Choose "Other (Custom name)"
6. Enter name: "FoodHub Backend"
7. Click "Generate"
8. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Update Backend Configuration

1. Open `backend/.env` file
2. Find the line: `SENDER_PASSWORD=your-gmail-app-password-here`
3. Replace `your-gmail-app-password-here` with your generated app password
4. Remove any spaces from the password
5. Save the file

Example:
```
SENDER_PASSWORD=abcdefghijklmnop
```

### Step 4: Restart Backend Server

After updating the .env file:
```bash
cd backend
# Stop the current server (Ctrl+C)
python start.py
```

## 📨 Email Features

### When Admin Approves a Request:

The system automatically:
1. ✅ Generates a random 10-character password
2. ✅ Creates user account with email as username
3. ✅ Sends beautiful HTML email to the applicant with:
   - Congratulations message
   - Username (their email)
   - Temporary password
   - Login link
   - Instructions to change password
   - Welcome message

### When Admin Rejects a Request:

The system automatically:
1. ✅ Sends polite rejection email
2. ✅ Encourages them to reapply in future

## 🎨 Email Template Features

- **Beautiful HTML Design** with gradients and styling
- **Responsive Layout** works on all devices
- **Plain Text Fallback** for email clients that don't support HTML
- **Security Warnings** reminding users to change password
- **Clear Instructions** with step-by-step guide
- **Professional Branding** with FoodHub logo and colors

## 🧪 Testing

### Test Email Sending:

1. Submit a restaurant or rider request from the frontend
2. Login as admin (admin@foodhub.com / admin123)
3. Go to "Requests" tab
4. Click "Approve" on a request
5. Check the email inbox of the applicant

### If Email Fails:

The system will:
- Print error message to console
- Show email preview in terminal
- Still create the account
- Display temporary password in admin dashboard (for testing)

## 🔒 Security Notes

- **Never commit** your app password to Git
- The `.env` file is in `.gitignore` for security
- App passwords are safer than using your actual Gmail password
- You can revoke app passwords anytime from Google Account settings

## 📝 Email Content Example

```
Subject: 🎉 Your Restaurant Account Has Been Approved!

Dear John Doe,

Congratulations! Your Restaurant account has been approved!

Your Login Credentials:
Username (Email): john@restaurant.com
Temporary Password: Abc123XyZ9

IMPORTANT: Please change your password after first login!

Login at: http://localhost:5173/login

Next Steps:
1. Visit the login page
2. Login with your credentials
3. Change your password in Settings
4. Complete your profile
5. Start using FoodHub!

Best regards,
The FoodHub Team
Admin: gurmesaayele49@gmail.com
```

## 🆘 Troubleshooting

### "Authentication failed" error:
- Make sure 2-Step Verification is enabled
- Generate a new app password
- Remove any spaces from the password in .env
- Restart the backend server

### "Connection refused" error:
- Check your internet connection
- Make sure SMTP_SERVER and SMTP_PORT are correct
- Try using port 465 with SSL instead

### Emails not received:
- Check spam/junk folder
- Verify the recipient email is correct
- Check Gmail "Sent" folder to confirm email was sent
- Some email providers may block automated emails

## 🔄 Alternative: Using Console Output

If you can't set up Gmail, the system will:
- Print email content to console/terminal
- Show all email details for testing
- Still create accounts successfully
- Display temporary password in response

This allows testing without email configuration!
