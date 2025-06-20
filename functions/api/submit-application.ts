import { emailConfig } from '../config';

// Type declarations for Cloudflare Email Workers
declare class EmailMessage {
  constructor(from: string, to: string, raw: string);
}

interface CloudflareEnv {
  EMAIL: {
    send(message: EmailMessage): Promise<void>;
  };
}

interface FormData {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  fundingAmount: string;
  timeInBusiness: string;
  creditScore: string;
  monthlyRevenue: string;
  useOfFunds: string;
  businessDescription: string;
  businessType: string;
  businessAddress: string;
}

export async function onRequestPost(context: { request: Request; env: CloudflareEnv }) {
  try {
    const request = context.request;
    const env = context.env;
    
    // Parse form data
    const formData = await request.json() as FormData;
    
    // Validate required fields
    const requiredFields = ['businessName', 'ownerName', 'email', 'phone', 'fundingAmount'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: `Missing required field: ${field}` 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    
    // Create email content
    const emailHTML = generateEmailHTML(formData);
    const emailText = generateEmailText(formData);
    
    // Send email using Cloudflare Email Workers
    const emailPromises = emailConfig.recipients.map(async (recipient) => {
      try {
        // Create raw email message
        const rawEmail = createRawEmail({
          from: emailConfig.from,
          to: recipient,
          subject: emailConfig.subject(formData.businessName),
          html: emailHTML,
          text: emailText
        });
        
        // Create EmailMessage instance
        const message = new EmailMessage(
          emailConfig.from.email,
          recipient,
          rawEmail
        );
        
        // Send via Cloudflare Email Workers
        await env.EMAIL.send(message);
        
        return { success: true, recipient };
      } catch (error) {
        console.error(`Email error for ${recipient}:`, error);
        return { success: false, recipient, error };
      }
    });
    
    // Wait for all emails to complete
    const emailResults = await Promise.all(emailPromises);
    const successfulEmails = emailResults.filter(result => result.success);
    
    if (successfulEmails.length === 0) {
      throw new Error('All email deliveries failed');
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Application submitted successfully',
      emailsSent: successfulEmails.length,
      totalRecipients: emailConfig.recipients.length
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process application. Please try again later.'
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

// Create raw email message in RFC 5322 format
function createRawEmail(options: {
  from: { email: string; name: string };
  to: string;
  subject: string;
  html: string;
  text: string;
}): string {
  const boundary = `boundary_${Date.now()}_${Math.random().toString(36)}`;
  const date = new Date().toUTCString();
  const messageId = `<${Date.now()}.${Math.random().toString(36)}@joinmbc.com>`;
  
  return `Date: ${date}
From: ${options.from.name} <${options.from.email}>
To: <${options.to}>
Message-ID: ${messageId}
Subject: ${options.subject}
MIME-Version: 1.0
Content-Type: multipart/alternative; boundary="${boundary}"

--${boundary}
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 7bit

${options.text}

--${boundary}
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: 7bit

${options.html}

--${boundary}--`;
}

function generateEmailHTML(data: FormData): string {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Funding Application</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .content { background: white; padding: 30px; border: 1px solid #e1e1e1; }
        .footer { background: #f8f9fa; padding: 20px; border-radius: 0 0 10px 10px; text-align: center; font-size: 14px; color: #666; }
        .field { margin-bottom: 20px; }
        .label { font-weight: 600; color: #555; margin-bottom: 5px; display: block; }
        .value { background: #f8f9fa; padding: 12px; border-radius: 6px; border-left: 4px solid #667eea; }
        .highlight { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .urgent { background: #ff6b6b; color: white; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🚀 New Funding Application</h1>
        <p>Received: ${timestamp}</p>
      </div>
      
      <div class="content">
        <div class="urgent">
          <strong>⚡ ACTION REQUIRED:</strong> New lead requires immediate follow-up!
        </div>
        
        <div class="highlight">
          <h2>Business: ${data.businessName}</h2>
          <p><strong>Funding Amount:</strong> $${Number(data.fundingAmount).toLocaleString()}</p>
        </div>
        
        <div class="field">
          <span class="label">👤 Owner Name</span>
          <div class="value">${data.ownerName}</div>
        </div>
        
        <div class="field">
          <span class="label">📧 Email</span>
          <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
        </div>
        
        <div class="field">
          <span class="label">📞 Phone</span>
          <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
        </div>
        
        <div class="field">
          <span class="label">🏢 Business Type</span>
          <div class="value">${data.businessType || 'Not specified'}</div>
        </div>
        
        <div class="field">
          <span class="label">📍 Business Address</span>
          <div class="value">${data.businessAddress || 'Not specified'}</div>
        </div>
        
        <div class="field">
          <span class="label">⏰ Time in Business</span>
          <div class="value">${data.timeInBusiness}</div>
        </div>
        
        <div class="field">
          <span class="label">💳 Credit Score Range</span>
          <div class="value">${data.creditScore}</div>
        </div>
        
        <div class="field">
          <span class="label">💰 Monthly Revenue</span>
          <div class="value">$${Number(data.monthlyRevenue).toLocaleString()}</div>
        </div>
        
        <div class="field">
          <span class="label">🎯 Use of Funds</span>
          <div class="value">${data.useOfFunds}</div>
        </div>
        
        <div class="field">
          <span class="label">📝 Business Description</span>
          <div class="value">${data.businessDescription}</div>
        </div>
      </div>
      
      <div class="footer">
        <p><strong>${emailConfig.settings.followUpMessage}</strong></p>
        <p>This application was submitted via the MBC Landing Page</p>
        <p>Generated on ${timestamp}</p>
      </div>
    </body>
    </html>
  `;
}

function generateEmailText(data: FormData): string {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York'
  });

  return `
🚀 NEW FUNDING APPLICATION RECEIVED

⚡ ACTION REQUIRED: This lead requires immediate follow-up!

BUSINESS DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Business Name: ${data.businessName}
Owner Name: ${data.ownerName}
Email: ${data.email}
Phone: ${data.phone}

FUNDING INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Requested Amount: $${Number(data.fundingAmount).toLocaleString()}
Use of Funds: ${data.useOfFunds}

BUSINESS PROFILE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Business Type: ${data.businessType || 'Not specified'}
Business Address: ${data.businessAddress || 'Not specified'}
Time in Business: ${data.timeInBusiness}
Monthly Revenue: $${Number(data.monthlyRevenue).toLocaleString()}
Credit Score Range: ${data.creditScore}

BUSINESS DESCRIPTION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.businessDescription}

${emailConfig.settings.followUpMessage}

Submitted: ${timestamp}
Source: MBC Landing Page
  `;
} 