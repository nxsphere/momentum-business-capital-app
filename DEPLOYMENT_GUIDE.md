# 🚀 MBC Landing Page - Email System Deployment Guide

## ✅ Current Status
- ✅ Email system migrated from Mailtrap to Cloudflare Email Workers
- ✅ Build completed successfully (`dist` folder ready)
- ❌ Wrangler deployment blocked by Yarn PnP issues
- ❌ Git push blocked by 1Password SSH issues

## 📧 What's New in the Email System
- **Native Cloudflare Integration**: Uses `env.EMAIL.send()` API
- **No External Dependencies**: No more Mailtrap subscription needed
- **Enhanced Templates**: Beautiful HTML emails with professional styling
- **Better Deliverability**: Native Cloudflare infrastructure

## 🚀 Deploy via Cloudflare Dashboard (Recommended)

### Step 1: Access Cloudflare Dashboard
1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
2. Find your `mbc-landing-page` project
3. Click on the project name

### Step 2: Upload New Version
1. Click **"Upload assets"** or **"Create deployment"**
2. Select **"Upload folder"**
3. Choose the entire `dist` folder from your project
4. Set **Branch**: `dev` (for testing) or `main` (for production)
5. Click **"Deploy site"**

### Step 3: Verify Email Configuration
After deployment, the email system will automatically:
- Send emails to: `leads@momentumbusinesscapital.com`
- Use subject: `🚀 New Lead: Funding Application from [Business Name]`
- Include all form data in professional HTML format

## 🔧 Alternative: Fix SSH and Git Push

If you prefer Git deployment:

### Fix 1Password SSH Issue
```bash
# Check SSH agent
ssh-add -l

# If needed, add your key to 1Password SSH agent
# Follow: https://developer.1password.com/docs/ssh/agent/config/
```

### Then Git Deploy
```bash
git add .
git commit -m "Implement Cloudflare Email Workers integration"
git push origin dev  # This will auto-deploy via GitHub integration
```

## 🧪 Testing the Email System

After deployment, test by:
1. Visit your deployed site
2. Fill out the funding application form
3. Submit the form
4. Check `leads@momentumbusinesscapital.com` for the email

## 📋 Email Configuration

Email settings are in `functions/config.ts`:
```typescript
export const emailConfig = {
  recipients: [
    "leads@momentumbusinesscapital.com"
  ],
  from: {
    email: "support@joinmbc.com",
    name: "MBC Landing Page"
  },
  subject: (businessName: string) => `🚀 New Lead: Funding Application from ${businessName}`,
  // ... other settings
};
```

## ⚡ Key Benefits of New System

1. **No API Keys**: Uses Cloudflare's built-in email binding
2. **Better Reliability**: Native to your hosting platform  
3. **Enhanced Emails**: Professional HTML templates with styling
4. **Cost Savings**: No external email service fees
5. **Better Deliverability**: Cloudflare's email infrastructure

## 🔍 Troubleshooting

### If Emails Don't Send
1. Check Cloudflare Pages Functions logs in dashboard
2. Verify `functions/config.ts` recipients are correct
3. Ensure form data includes all required fields

### If Form Submission Fails
1. Check browser console for JavaScript errors
2. Verify API endpoint is accessible: `/api/submit-application`
3. Check CORS headers in function response

---

**Your email system is ready to work as soon as you deploy! 🎉** 