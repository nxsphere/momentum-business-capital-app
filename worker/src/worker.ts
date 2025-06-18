export interface Env {
  ASSETS: Fetcher;
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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // API route for form submission
    if (url.pathname === '/submit-application' && request.method === 'POST') {
      try {
        const formData: FormData = await request.json();
        if (!formData.businessName || !formData.contactName || !formData.email || !formData.phone) {
          return new Response(JSON.stringify({ error: 'Missing required fields' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
          });
        }
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
              { type: 'text/plain', value: emailText },
              { type: 'text/html', value: emailHtml },
            ],
          }),
        });
        if (!emailResponse.ok) {
          const errorText = await emailResponse.text();
          return new Response(JSON.stringify({ error: `Email sending failed: ${emailResponse.status} - ${errorText}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
          });
        }
        return new Response(JSON.stringify({ success: true, message: 'Application submitted successfully!' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
    }

    // For all other requests, serve static assets
    return env.ASSETS.fetch(request);
  },
}; 