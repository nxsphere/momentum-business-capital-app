import { emailConfig } from "../config";

interface CloudflareEnv {
  RESEND_API_KEY: string;
}

interface FormData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  desiredAmount: string;
  timestamp: string;
  source: string;
}

export async function onRequestPost(context: {
  request: Request;
  env: CloudflareEnv;
}) {
  try {
    const request = context.request;
    const env = context.env;

    // Parse form data
    const formData = (await request.json()) as FormData;

    // Validate required fields
    const requiredFields = [
      "businessName",
      "contactName",
      "email",
      "phone",
      "businessType",
      "desiredAmount",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return new Response(
          JSON.stringify({
            success: false,
            error: `Missing required field: ${field}`,
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }
    }

    // Create email content
    const emailHTML = generateEmailHTML(formData);
    const emailText = generateEmailText(formData);

    // Check if we're in local development (no RESEND_API_KEY available)
    const isLocalDevelopment = !env?.RESEND_API_KEY;

    if (isLocalDevelopment) {
      // Local development simulation
      console.log("🧪 LOCAL DEVELOPMENT - Email simulation");
      console.log("📧 Email would be sent to:", emailConfig.recipients);
      console.log("📝 Subject:", emailConfig.subject(formData.businessName));
      console.log(
        "📄 Email HTML preview:",
        emailHTML.substring(0, 200) + "...",
      );
      console.log(
        "📄 Email Text preview:",
        emailText.substring(0, 200) + "...",
      );

      return new Response(
        JSON.stringify({
          success: true,
          message: "Application submitted successfully (LOCAL DEVELOPMENT)",
          emailsSent: emailConfig.recipients.length,
          totalRecipients: emailConfig.recipients.length,
          note: "This is local development - emails are simulated. Check console for email content.",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        },
      );
    }

    // Production email sending using Resend API
    const emailPromises = emailConfig.recipients.map(async (recipient) => {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: `${emailConfig.from.name} <${emailConfig.from.email}>`,
            to: [recipient],
            subject: emailConfig.subject(formData.businessName),
            html: emailHTML,
            text: emailText,
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(
            `Resend API error: ${response.status} - ${errorData}`,
          );
        }

        const result = await response.json();
        return { success: true, recipient, id: result.id };
      } catch (error) {
        console.error(`Email error for ${recipient}:`, error);
        return { success: false, recipient, error: error.message };
      }
    });

    // Wait for all emails to complete
    const emailResults = await Promise.all(emailPromises);
    const successfulEmails = emailResults.filter((result) => result.success);

    if (successfulEmails.length === 0) {
      throw new Error("All email deliveries failed");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Application submitted successfully",
        emailsSent: successfulEmails.length,
        totalRecipients: emailConfig.recipients.length,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    );
  } catch (error) {
    console.error("Form submission error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to process application. Please try again later.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

function generateEmailHTML(data: FormData): string {
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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
          <p><strong>Desired Amount:</strong> ${data.desiredAmount}</p>
        </div>

        <div class="field">
          <span class="label">👤 Contact Name</span>
          <div class="value">${data.contactName}</div>
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
          <div class="value">${data.businessType}</div>
        </div>

        <div class="field">
          <span class="label">🌐 Source Page</span>
          <div class="value">${data.source}</div>
        </div>

        <div class="field">
          <span class="label">⏰ Submitted</span>
          <div class="value">${data.timestamp}</div>
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
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/New_York",
  });

  return `
🚀 NEW FUNDING APPLICATION RECEIVED

⚡ ACTION REQUIRED: This lead requires immediate follow-up!

BUSINESS DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Business Name: ${data.businessName}
Contact Name: ${data.contactName}
Email: ${data.email}
Phone: ${data.phone}

FUNDING INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Desired Amount: ${data.desiredAmount}
Business Type: ${data.businessType}

SUBMISSION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━��━━━━━━━━━━━━━━━━━
Source Page: ${data.source}
Submitted: ${data.timestamp}

${emailConfig.settings.followUpMessage}

Submitted: ${timestamp}
Source: MBC Landing Page
  `;
}
