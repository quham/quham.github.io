# Email Setup Guide for Your AI Academy Landing Page

## Option 1: EmailJS (Recommended - Easiest)

### Step 1: Sign up for EmailJS
1. Go to [EmailJS.com](https://www.emailjs.com/) and create a free account
2. Verify your email address

### Step 2: Set up Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. **Save the Service ID** - you'll need this

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** New AI Academy Waitlist Signup - {{from_name}}

**Body:**
```
Hello!

You have a new waitlist signup for your AI Academy:

Name: {{from_name}}
Email: {{from_email}}
Goal: {{goal}}

Message: {{message}}

This person will be notified when the Academy launches.

Best regards,
Your AI Academy Team
```

4. **Save the Template ID** - you'll need this

### Step 4: Get Your Public Key
1. Go to "Account" → "API Keys"
2. **Copy your Public Key**

### Step 5: Update Your Code
Replace these placeholders in `src/App.tsx`:

```typescript
const serviceId = 'YOUR_EMAILJS_SERVICE_ID' // Replace with your actual service ID
const templateId = 'YOUR_EMAILJS_TEMPLATE_ID' // Replace with your actual template ID
const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY' // Replace with your actual public key
const to_email = 'your-email@example.com' // Replace with your actual email
```

### Step 6: Test
1. Fill out your signup form
2. Check your email for the notification
3. Check the browser console for success/error messages

---

## Option 2: Netlify Forms (Alternative)

If you deploy to Netlify, you can use their built-in form handling:

1. Add `netlify` attribute to your form:
```html
<form netlify name="waitlist-signup" onSubmit={form.handleSubmit(onSubmit)}>
```

2. Add a hidden input for Netlify:
```html
<input type="hidden" name="form-name" value="waitlist-signup" />
```

3. Netlify will automatically send form submissions to your email

---

## Option 3: Custom Backend (Advanced)

For a production app, you might want:
- Node.js + Express backend
- Email service like SendGrid or AWS SES
- Database to store signups
- Rate limiting and spam protection

---

## Troubleshooting

### EmailJS Issues:
- Check browser console for error messages
- Verify all IDs and keys are correct
- Ensure your email service is properly connected
- Check spam folder

### Common Problems:
- **"Service not found"**: Check your Service ID
- **"Template not found"**: Check your Template ID  
- **"Invalid key"**: Check your Public Key
- **"Authentication failed"**: Reconnect your email service

### Security Notes:
- Your Public Key is safe to expose in frontend code
- Never expose Service IDs or Template IDs in public repositories
- Consider rate limiting to prevent spam

---

## Next Steps

1. Set up EmailJS following the steps above
2. Test with your signup form
3. Customize the email template to match your brand
4. Consider adding email validation and spam protection
5. Set up email notifications for yourself

Need help? Check EmailJS documentation or reach out with specific error messages!
