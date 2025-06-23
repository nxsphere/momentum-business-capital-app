# Resend Email Setup Guide

This guide explains how to set up Resend email functionality for the Momentum Business Capital application.

## Prerequisites

1. **Resend Account**: Sign up at [resend.com](https://resend.com)
2. **Domain Verification**: Add and verify your domain in Resend
3. **Cloudflare Workers**: Application deployed to Cloudflare Workers

## Step 1: Create Resend Account & API Key

1. **Sign up**: Go to [resend.com](https://resend.com) and create an account
2. **Create API Key**:
   - Go to the Resend dashboard
   - Navigate to "API Keys" section
   - Click "Create API Key"
   - Name it "Momentum Business Capital Production"
   - Copy the API key (starts with `re_`)

## Step 2: Domain Setup

1. **Add Domain** in Resend dashboard:
   - Go to "Domains" section
   - Click "Add Domain"
   - Enter: `momentumbusiness.capital`

2. **DNS Configuration**:
   - Add the DNS records provided by Resend to your domain's DNS settings
   - Wait for verification (usually takes a few minutes)

3. **Verify Email Addresses**:
   - Ensure `noreply@momentumbusiness.capital` is configured
   - Set up `leads@momentumbusiness.capital` as the recipient

## Step 3: Configure Cloudflare Secrets

Set up the required secrets in your Cloudflare Workers:

```bash
# Set the Resend API key (replace with your actual key)
wrangler secret put RESEND_API_KEY
# When prompted, enter your Resend API key (re_xxxxxxxx)

# Set the notification email (optional, uses config default if not set)
wrangler secret put NOTIFICATION_EMAIL
# When prompted, enter: leads@momentumbusiness.capital
```

## Step 4: Environment Configuration

Update `wrangler.toml` for production:

```toml
[vars]
ENVIRONMENT = "production"  # Change from "development" to "production"
```

## Step 5: Deploy Updated Application

```bash
# Build and deploy the application
npm run build
npm run deploy
```

## Step 6: Test Email Functionality

1. **Visit your live application**:
   - Go to: https://momentum-business-capital-landing.shy-math-4d31.workers.dev

2. **Test the form**:
   - Fill out the application form
   - Submit the application
   - Verify you receive an email at `leads@momentumbusiness.capital`

3. **Test API directly** (optional):
```bash
curl -X POST https://momentum-business-capital-landing.shy-math-4d31.workers.dev/api/submit-application \
  -H "Content-Type: application/json" \
  -d '{
    "businessName": "Test Business",
    "contactName": "John Doe",
    "email": "john@testbusiness.com",
    "phone": "(555) 123-4567",
    "businessType": "retail",
    "desiredAmount": "25000-50000",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'",
    "source": "test"
  }'
```

## Email Configuration Details

The application is configured to send emails with:

- **From**: `Momentum Business Capital Applications <noreply@momentumbusiness.capital>`
- **To**: `leads@momentumbusiness.capital` (production) or `dev-leads@momentumbusiness.capital` (development)
- **Subject**: `🚀 New Funding Application Lead Received`

## Email Template Features

The email includes:
- ✅ Professional branded design
- ✅ Complete business information
- ✅ Clickable email and phone links
- ✅ Source tracking (funding-1 vs funding-2 page)
- ✅ Timestamp information
- ✅ Next steps guidance

## Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `RESEND_API_KEY` | Your Resend API key | Yes | `re_xxxxxxxx` |
| `NOTIFICATION_EMAIL` | Override recipient email | No | `leads@momentumbusiness.capital` |
| `ENVIRONMENT` | Environment mode | No | `production` |

## Troubleshooting

### Common Issues

1. **"Failed to send notification email"**:
   - Verify RESEND_API_KEY is set correctly
   - Check domain verification in Resend dashboard
   - Ensure from email domain is verified

2. **Email not received**:
   - Check spam folder
   - Verify recipient email is correct
   - Check Resend dashboard logs

3. **CORS errors**:
   - Verify the application is deployed correctly
   - Check browser console for detailed errors

### Debug Commands

```bash
# Check secrets are set
wrangler secret list

# View worker logs
wrangler tail

# Test API health
curl https://momentum-business-capital-landing.shy-math-4d31.workers.dev/api/health
```

## Production Checklist

- [ ] Resend account created
- [ ] Domain verified in Resend
- [ ] API key generated and secured
- [ ] Cloudflare secrets configured
- [ ] Environment set to "production"
- [ ] Application deployed
- [ ] Email functionality tested
- [ ] Form submission tested
- [ ] DocuSign integration verified

## Support

- **Resend Documentation**: [resend.com/docs](https://resend.com/docs)
- **Cloudflare Workers Docs**: [developers.cloudflare.com/workers](https://developers.cloudflare.com/workers)

## Security Notes

- ✅ API keys are stored as encrypted secrets in Cloudflare
- ✅ CORS is configured to prevent unauthorized requests
- ✅ Form validation prevents incomplete submissions
- ✅ Error handling provides user-friendly messages 