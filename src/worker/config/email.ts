// Email configuration for the application
export const emailConfig = {
  // Production recipient: The primary email address to receive notifications.
  // You can set this in Cloudflare dashboard as NOTIFICATION_EMAIL secret
  to: 'leads@momentumbusiness.capital',

  // Development recipient: Used for testing in non-production environments.
  devTo: 'dev-leads@momentumbusiness.capital',

  // Sender address: This will be managed by Resend
  from: 'Momentum Business Capital Applications <noreply@momentumbusiness.capital>', 
  
  // Subject line for the notification email.
  subject: '🚀 New Funding Application Lead Received',

  // Additional settings for email content.
  settings: {
    // A message to encourage prompt follow-up on the new lead.
    followUpMessage: "Let's turn this lead into a success story!", 
  },
};

// You can add other configurations here as needed, for example:
// export const databaseConfig = { ... };
// export const featureFlags = { ... }; 