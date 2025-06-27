// DocuSeal API integration types and functions

export interface DocuSealSubmitter {
  email: string;
  name: string;
  role?: string;
  external_id?: string;
  phone?: string;
}

export interface DocuSealSubmissionData {
  template_id: number;
  submitters: DocuSealSubmitter[];
  send_email?: boolean;
  reply_to?: string;
  completed_redirect_url?: string;
}

export interface DocuSealSubmissionResponse {
  id: number;
  slug: string;
  status: string;
  submitters: Array<{
    id: number;
    uuid: string;
    email: string;
    slug: string;
    name: string;
    status: string;
    role: string;
  }>;
  template: {
    id: number;
    name: string;
  };
  audit_log_url?: string;
  combined_document_url?: string;
}

export interface DocuSealTemplate {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  folder_name: string;
}

export class DocuSealService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl = 'https://api.docuseal.com') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'X-Auth-Token': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`DocuSeal API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }

  async getTemplates(): Promise<{ data: DocuSealTemplate[] }> {
    return this.request<{ data: DocuSealTemplate[] }>('/templates');
  }

  async createSubmission(data: DocuSealSubmissionData): Promise<DocuSealSubmissionResponse> {
    return this.request<DocuSealSubmissionResponse>('/submissions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getSubmission(id: number): Promise<DocuSealSubmissionResponse> {
    return this.request<DocuSealSubmissionResponse>(`/submissions/${id}`);
  }

  async getSubmissionBySlug(slug: string): Promise<DocuSealSubmissionResponse> {
    const submissions = await this.request<{ data: DocuSealSubmissionResponse[] }>(`/submissions?slug=${slug}`);
    if (submissions.data.length === 0) {
      throw new Error(`No submission found with slug: ${slug}`);
    }
    return submissions.data[0];
  }

  // Helper method to create submission from form data
  async createSubmissionFromForm(
    templateId: number,
    formData: {
      businessName: string;
      contactName: string;
      email: string;
      phone: string;
      businessType: string;
      desiredAmount: string;
    },
    options: {
      sendEmail?: boolean;
      replyTo?: string;
      completedRedirectUrl?: string;
    } = {}
  ): Promise<DocuSealSubmissionResponse> {
    const submissionData: DocuSealSubmissionData = {
      template_id: templateId,
      submitters: [
        {
          email: formData.email,
          name: formData.contactName,
          role: 'Business Owner',
          phone: formData.phone,
          external_id: `${formData.businessName}-${Date.now()}`,
        },
      ],
      send_email: options.sendEmail ?? true,
      reply_to: options.replyTo,
      completed_redirect_url: options.completedRedirectUrl,
    };

    return this.createSubmission(submissionData);
  }
}

// Frontend API functions
export async function createDocuSealSubmission(
  formData: {
    businessName: string;
    contactName: string;
    email: string;
    phone: string;
    businessType: string;
    desiredAmount: string;
  }
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const response = await fetch('/api/docuseal/create-submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create DocuSeal submission');
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error('DocuSeal submission error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}

export async function getDocuSealTemplates(): Promise<{ success: boolean; data?: DocuSealTemplate[]; error?: string }> {
  try {
    const response = await fetch('/api/docuseal/templates');
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch DocuSeal templates');
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error('DocuSeal templates error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
} 