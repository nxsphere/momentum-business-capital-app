interface Env {
  SENDGRID_API_KEY: string;
  NOTIFICATION_EMAIL: string;
  NOTIFICATION_EMAIL_2: string;
  FROM_EMAIL: string;
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

interface PagesContext<T = unknown> {
  request: Request;
  env: T;
  params: Record<string, string>;
  next: () => Promise<Response>;
  data: Record<string, unknown>;
  waitUntil: (promise: Promise<unknown>) => void;
}

export const onRequestPost = async (context: PagesContext<Env>): Promise<Response> => {
  const { request, env } = context;

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  try {
    const formData: FormData = await request.json();
    
    // Validate required fields
    if (!formData.businessName || !formData.contactName || !formData.email || !formData.phone) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }
    
    // Create email content
    const emailHtml = `
      <h2>New Business Funding Application</h2>
      <p><strong>Source:</strong> ${formData.source}</p>
      <p><strong>Submission Time:</strong> ${formData.timestamp}</p>
      
      <h3>Business Information</h3>
      <ul>
        <li><strong>Business Name:</strong> ${formData.businessName}</li>
        <li><strong>Contact Name:</strong> ${formData.contactName}</li>
        <li><strong>Email:</strong> ${formData.email}</li>
        <li><strong>Phone:</strong> ${formData.phone}</li>
        <li><strong>Business Type:</strong> ${formData.businessType}</li>
        <li><strong>Desired Amount:</strong> ${formData.desiredAmount}</li>
      </ul>
      
      <p>Please follow up with this lead as soon as possible.</p>
    `;
    
    const emailText = `
New Business Funding Application

Source: ${formData.source}
Submission Time: ${formData.timestamp}

Business Information:
- Business Name: ${formData.businessName}
- Contact Name: ${formData.contactName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Business Type: ${formData.businessType}
- Desired Amount: ${formData.desiredAmount}

Please follow up with this lead as soon as possible.
    `;
    
    // Send email using SendGrid API
    const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [
              { email: env.NOTIFICATION_EMAIL },
              { email: env.NOTIFICATION_EMAIL_2 }
            ],
            subject: `New Funding Application - ${formData.businessName}`,
          },
        ],
        from: { email: env.FROM_EMAIL, name: 'MBC Landing Page' },
        content: [
          {
            type: 'text/plain',
            value: emailText,
          },
          {
            type: 'text/html',
            value: emailHtml,
          },
        ],
      }),
    });
    
    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('Email sending failed:', errorText);
      console.error('SendGrid response status:', emailResponse.status);
      
      return new Response(JSON.stringify({ 
        error: `Email sending failed: ${emailResponse.status} - ${errorText}` 
      }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }
    
    // Return success response
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Application submitted successfully!' 
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error' 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}; 