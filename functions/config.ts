// Email configuration for the application
export const emailConfig = {
  // Production recipient: The primary email address to receive notifications.
  // You can set this in Cloudflare dashboard as NOTIFICATION_EMAIL secret
  to: "leads@momentumbusiness.capital",

  // Development recipient: Used for testing in non-production environments.
  devTo: "dev-leads@momentumbusiness.capital",

  // Recipients array (maintaining backward compatibility)
  recipients: ["leads@momentumbusiness.capital"],

  // Sender address: This will be managed by Resend
  from: {
    email: "noreply@momentumbusiness.capital",
    name: "Momentum Business Capital Applications",
  },

  // Subject line for the notification email.
  subject: (businessName: string) => `🚀 New Funding Application Lead Received`,

  // Additional settings for email content.
  settings: {
    includeTimestamp: true,
    includeSource: true,
    // A message to encourage prompt follow-up on the new lead.
    followUpMessage: "Let's turn this lead into a success story!",
  },
};

// Export type for TypeScript
export type EmailConfig = typeof emailConfig;
