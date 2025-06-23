import { Hono } from "hono";
import { cors } from "hono/cors";
import { Resend } from "resend";
import { emailConfig } from "./config/email";
import { ApplicationNotificationTemplate } from "./emails/application-notification";

type Bindings = {
  ASSETS: {
    fetch(request: Request | string): Promise<Response>;
  };
  RESEND_API_KEY: string;
  ENVIRONMENT?: string;
  NOTIFICATION_EMAIL?: string;
};

interface FormSubmissionData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  desiredAmount: string;
  timestamp: string;
  source: string;
}

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS for the frontend
app.use("*", cors({
  origin: "*", // In production, replace with your domain
  allowHeaders: ["Content-Type"],
  allowMethods: ["GET", "POST", "OPTIONS"],
}));

// Health check endpoint
app.get("/api/health", (c) => {
  return c.json({ 
    status: "ok", 
    timestamp: new Date().toISOString(),
    service: "Momentum Business Capital API"
  });
});

// Form submission endpoint with email notification
app.post("/api/submit-application", async (c) => {
  try {
    const body = await c.req.json() as FormSubmissionData;
    
    // Validate required fields
    const requiredFields = ['businessName', 'contactName', 'email', 'phone', 'businessType', 'desiredAmount'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return c.json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      }, 400);
    }

    // Check if RESEND_API_KEY is available
    if (!c.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return c.json({ 
        success: false, 
        message: "Email service not configured" 
      }, 500);
    }

    // Initialize Resend
    const resend = new Resend(c.env.RESEND_API_KEY);
    
    // Determine recipient email based on environment
    const isProduction = c.env.ENVIRONMENT === 'production';
    const recipientEmail = c.env.NOTIFICATION_EMAIL || (isProduction ? emailConfig.to : emailConfig.devTo);
    
    // Send notification email
    const emailResult = await resend.emails.send({
      from: emailConfig.from,
      to: [recipientEmail],
      subject: emailConfig.subject,
      react: ApplicationNotificationTemplate({
        businessName: body.businessName,
        contactName: body.contactName,
        email: body.email,
        phone: body.phone,
        businessType: body.businessType,
        desiredAmount: body.desiredAmount,
        timestamp: body.timestamp || new Date().toISOString(),
        source: body.source || 'website',
      }),
    });

    if (emailResult.error) {
      console.error('Email sending failed:', emailResult.error);
      return c.json({ 
        success: false, 
        message: "Failed to send notification email"
      }, 500);
    }

    return c.json({ 
      success: true, 
      message: "Application received successfully",
      emailId: emailResult.data?.id,
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
    return c.json({ 
      success: false, 
      message: "Failed to process application" 
    }, 500);
  }
});

// Serve static assets for all other routes
app.get("*", async (c) => {
  const url = new URL(c.req.url);
  
  // Try to get the asset from the ASSETS binding
  try {
    const response = await c.env.ASSETS.fetch(c.req.url);
    
    // If asset is found, return it
    if (response.status !== 404) {
      return response;
    }
    
    // If not found and it's a route that should serve index.html (SPA routing)
    if (!url.pathname.startsWith('/api') && !url.pathname.includes('.')) {
      const indexUrl = new URL('/index.html', url.origin);
      const indexResponse = await c.env.ASSETS.fetch(indexUrl.toString());
      return indexResponse;
    }
    
    return c.text("Not found", 404);
  } catch (error) {
    console.error('Asset serving error:', error);
    return c.text("Internal Server Error", 500);
  }
});

export default app; 