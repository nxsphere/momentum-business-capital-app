// Email configuration for form submissions
export const emailConfig = {
  // Recipients for form notifications
  recipients: [
    "leads@momentumbusinesscapital.com"
  ],
  
  // Sender information
  from: {
    email: "support@joinmbc.com",
    name: "MBC Landing Page"
  },
  
  // Email templates
  subject: (businessName: string) => `🚀 New Lead: Funding Application from ${businessName}`,
  
  // Email content settings
  settings: {
    includeTimestamp: true,
    includeSource: true,
    followUpMessage: "Please follow up with this lead as soon as possible."
  }
};

// Export type for TypeScript
export type EmailConfig = typeof emailConfig; 