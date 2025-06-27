import { Hono } from "hono";
import { cors } from "hono/cors";
import { Resend } from "resend";
import { emailConfig } from "./config/email";
import { ApplicationNotificationTemplate } from "./emails/application-notification";
import { DocuSealService } from "../lib/docuseal";

type Bindings = {
  ASSETS: {
    fetch(request: Request | string): Promise<Response>;
  };
  RESEND_API_KEY: string;
  DOCUSEAL_API_KEY: string;
  DOCUSEAL_TEMPLATE_ID: string;
  ENVIRONMENT?: string;
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

// DocuSeal endpoints
app.get("/api/docuseal/templates", async (c) => {
  try {
    if (!c.env.DOCUSEAL_API_KEY) {
      return c.json({ 
        success: false, 
        message: "DocuSeal API key not configured" 
      }, 500);
    }

    const docuseal = new DocuSealService(c.env.DOCUSEAL_API_KEY);
    const templates = await docuseal.getTemplates();
    
    return c.json({ 
      success: true, 
      data: templates.data 
    });
  } catch (error) {
    console.error('DocuSeal templates error:', error);
    return c.json({ 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to fetch templates"
    }, 500);
  }
});

app.post("/api/docuseal/create-submission", async (c) => {
  try {
    const body = await c.req.json() as Omit<FormSubmissionData, 'timestamp' | 'source'>;
    
    // Validate required fields
    const requiredFields = ['businessName', 'contactName', 'email', 'phone', 'businessType', 'desiredAmount'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return c.json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      }, 400);
    }

    if (!c.env.DOCUSEAL_API_KEY) {
      return c.json({ 
        success: false, 
        message: "DocuSeal API key not configured" 
      }, 500);
    }

    if (!c.env.DOCUSEAL_TEMPLATE_ID) {
      return c.json({ 
        success: false, 
        message: "DocuSeal template ID not configured" 
      }, 500);
    }

    const docuseal = new DocuSealService(c.env.DOCUSEAL_API_KEY);
    const templateId = parseInt(c.env.DOCUSEAL_TEMPLATE_ID);
    
    // Create submission with completion redirect
    const isProduction = c.env.ENVIRONMENT === 'production';
    const baseUrl = isProduction 
      ? 'https://mbc-landing-page.pages.dev' 
      : c.req.url.split('/api')[0]; // Use current domain in dev
      
    const completedRedirectUrl = `${baseUrl}/funding-complete`;
    
    const submission = await docuseal.createSubmissionFromForm(
      templateId,
      body,
      {
        sendEmail: true,
        completedRedirectUrl,
        replyTo: 'info@momentumbusinesscapital.com'
      }
    );
    
    return c.json({ 
      success: true, 
      data: {
        submission_id: submission.id,
        submission_slug: submission.slug,
        signing_url: submission.submitters[0] ? 
          `https://docuseal.com/s/${submission.submitters[0].slug}` : null,
        status: submission.status
      }
    });
    
  } catch (error) {
    console.error('DocuSeal submission error:', error);
    return c.json({ 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to create submission"
    }, 500);
  }
});

app.get("/api/docuseal/submission/:id", async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    
    if (!c.env.DOCUSEAL_API_KEY) {
      return c.json({ 
        success: false, 
        message: "DocuSeal API key not configured" 
      }, 500);
    }

    const docuseal = new DocuSealService(c.env.DOCUSEAL_API_KEY);
    const submission = await docuseal.getSubmission(id);
    
    return c.json({ 
      success: true, 
      data: submission 
    });
  } catch (error) {
    console.error('DocuSeal get submission error:', error);
    return c.json({ 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to get submission"
    }, 500);
  }
});

// Form submission endpoint with email notification and DocuSeal integration
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

    // Send notification email if Resend is configured
    let emailResult = null;
    if (c.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(c.env.RESEND_API_KEY);
        const isProduction = c.env.ENVIRONMENT === 'production';
        const recipientEmail = isProduction ? emailConfig.to : emailConfig.devTo;
        
        emailResult = await resend.emails.send({
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
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the whole request if email fails
      }
    }

    // Create DocuSeal submission if configured
    let docusealSubmission = null;
    if (c.env.DOCUSEAL_API_KEY && c.env.DOCUSEAL_TEMPLATE_ID) {
      try {
        const docuseal = new DocuSealService(c.env.DOCUSEAL_API_KEY);
        const templateId = parseInt(c.env.DOCUSEAL_TEMPLATE_ID);
        
        const isProduction = c.env.ENVIRONMENT === 'production';
        const baseUrl = isProduction 
          ? 'https://mbc-landing-page.pages.dev' 
          : c.req.url.split('/api')[0];
          
        const completedRedirectUrl = `${baseUrl}/funding-complete`;
        
        docusealSubmission = await docuseal.createSubmissionFromForm(
          templateId,
          body,
          {
            sendEmail: true,
            completedRedirectUrl,
            replyTo: 'info@momentumbusinesscapital.com'
          }
        );
      } catch (docusealError) {
        console.error('DocuSeal submission failed:', docusealError);
        // Don't fail the whole request if DocuSeal fails
      }
    }

    return c.json({ 
      success: true, 
      message: "Application received successfully",
      emailId: emailResult?.data?.id,
      docuseal: docusealSubmission ? {
        submission_id: docusealSubmission.id,
        submission_slug: docusealSubmission.slug,
        signing_url: docusealSubmission.submitters[0] ? 
          `https://docuseal.com/s/${docusealSubmission.submitters[0].slug}` : null,
        status: docusealSubmission.status
      } : null
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