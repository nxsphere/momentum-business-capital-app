# DocuSeal Integration Setup Guide

This document explains how to set up and configure the DocuSeal API integration for the Momentum Business Capital landing page.

## Overview

The DocuSeal integration allows for seamless document signing as part of the funding application process. When users submit the application form, a DocuSeal submission is automatically created and the user receives an email with a signing link.

## Features

- 🔄 **Automated Document Signing**: Submissions automatically create DocuSeal signing requests
- 📧 **Email Integration**: Users receive signing links via email
- 🔗 **Seamless UX**: Users can sign documents directly from the success page
- 📱 **Mobile Friendly**: Signing process works on all devices
- ↩️ **Completion Redirect**: Users are redirected back to your site after signing
- 🔒 **Secure**: All API keys and sensitive data are handled securely

## Setup Instructions

### 1. Get DocuSeal API Key

1. Sign up for a DocuSeal account at [docuseal.com](https://www.docuseal.com)
2. Navigate to Settings > API & Webhooks
3. Generate a new API key
4. Save this key securely - you'll need it for environment configuration

### 2. Create a Document Template

1. In your DocuSeal dashboard, create a new template
2. Upload your funding agreement document (PDF)
3. Add form fields where signatures and information are needed:
   - Signature fields for the business owner
   - Text fields for business name, contact name, etc.
   - Date fields for signing date
4. Configure submitter roles (typically "Business Owner")
5. Save the template and note down the Template ID

### 3. Environment Configuration

Set up the following environment variables:

#### For Local Development:
```bash
# Add to your .env.local file
DOCUSEAL_API_KEY=your_actual_api_key_here
DOCUSEAL_TEMPLATE_ID=your_template_id_here
```

#### For Production (Cloudflare):
```bash
# Set secrets using Wrangler CLI
wrangler secret put DOCUSEAL_API_KEY
# Enter your API key when prompted

wrangler secret put DOCUSEAL_TEMPLATE_ID  
# Enter your template ID when prompted
```

### 4. Test the Integration

1. Start your development server: `npm run dev`
2. Fill out the application form on your localhost
3. Submit the form
4. Check that:
   - Form submission succeeds
   - DocuSeal submission is created
   - You receive a signing link
   - Signing process works correctly
   - Completion redirect works

## API Endpoints

The integration adds the following API endpoints:

### GET `/api/docuseal/templates`
- Lists all available DocuSeal templates
- Used for debugging and template verification

### POST `/api/docuseal/create-submission`
- Creates a new DocuSeal submission
- Requires form data (businessName, contactName, email, phone, etc.)
- Returns submission ID and signing URL

### GET `/api/docuseal/submission/:id`
- Gets details of a specific submission
- Used for tracking submission status

### POST `/api/submit-application` (Enhanced)
- Enhanced existing endpoint
- Now creates both email notification AND DocuSeal submission
- Returns DocuSeal signing URL in response

## Code Structure

```
src/
├── lib/
│   ├── docuseal.ts          # DocuSeal service class and types
│   └── api.ts               # Updated API functions
├── pages/
│   └── FundingComplete.tsx  # Completion page after signing
├── components/momentum/
│   └── ApplicationForm.tsx  # Updated form with DocuSeal integration
└── worker/
    └── index.ts            # Backend API with DocuSeal endpoints
```

## Workflow

1. **User fills out form** → Application form collects business details
2. **Form submission** → Creates email notification + DocuSeal submission
3. **Success page** → Shows signing button and instructions
4. **Document signing** → User signs documents via DocuSeal
5. **Completion redirect** → User returns to completion page
6. **Follow-up** → Business team processes signed documents

## Configuration Options

### DocuSeal Submission Options

```typescript
{
  template_id: number,           // Your template ID
  submitters: [{
    email: string,               // User's email
    name: string,                // User's name
    role: "Business Owner",      // Submitter role
    phone?: string,              // Optional phone number
    external_id?: string         // Your internal ID
  }],
  send_email: true,              // Send email to user
  reply_to: "info@yourdomain.com", // Reply-to address
  completed_redirect_url: string  // Where to redirect after signing
}
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DOCUSEAL_API_KEY` | Your DocuSeal API key | Yes |
| `DOCUSEAL_TEMPLATE_ID` | ID of your document template | Yes |
| `RESEND_API_KEY` | For email notifications | Optional |
| `ENVIRONMENT` | "production" or "development" | Yes |

## Error Handling

The integration includes comprehensive error handling:

- **Missing API Key**: Graceful fallback, form still works
- **Invalid Template**: Error logged, user sees generic message  
- **Network Issues**: Retry logic and user-friendly error messages
- **DocuSeal API Errors**: Detailed logging for debugging

## Monitoring

Monitor the integration health by checking:

1. **Application Logs**: Check Cloudflare Workers logs for errors
2. **DocuSeal Dashboard**: Monitor submission success rates
3. **Email Delivery**: Ensure signing emails are being sent
4. **Completion Rates**: Track how many users complete signing

## Security Considerations

- ✅ API keys are stored as encrypted secrets
- ✅ All communications use HTTPS
- ✅ User data is validated before sending to DocuSeal
- ✅ No sensitive data is logged
- ✅ Proper CORS configuration

## Troubleshooting

### Common Issues

**"DocuSeal API key not configured"**
- Ensure `DOCUSEAL_API_KEY` secret is set in Cloudflare
- Check the secret name matches exactly

**"Invalid template ID"** 
- Verify `DOCUSEAL_TEMPLATE_ID` is correct
- Check template exists and is active in DocuSeal

**"Signing URL not generated"**
- Check DocuSeal template has proper submitter roles configured
- Verify email address is valid

**"Completion redirect not working"**
- Check the redirect URL is correctly configured
- Ensure `/funding-complete` route exists

### Debug Mode

For debugging, check browser console and Cloudflare Workers logs:

```bash
# View real-time logs
wrangler tail

# Or check logs in Cloudflare dashboard
```

## Best Practices

1. **Test Thoroughly**: Always test the full flow in staging before production
2. **Monitor Performance**: Track API response times and success rates
3. **Handle Gracefully**: Ensure form still works if DocuSeal is unavailable
4. **User Communication**: Provide clear instructions for document signing
5. **Follow Up**: Have a process for unsigned documents

## Support

- **DocuSeal Documentation**: [https://www.docuseal.com/docs](https://www.docuseal.com/docs)
- **DocuSeal Support**: Available through their dashboard
- **API Reference**: [https://www.docuseal.com/docs/api](https://www.docuseal.com/docs/api)

---

**Note**: [Always test changes in a development environment first][[memory:5816189698993211204]] before deploying to production. 