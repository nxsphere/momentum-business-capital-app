export interface FormSubmissionData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  desiredAmount: string;
  timestamp: string;
  source: string; // 'funding-1' or 'funding-2'
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  emailId?: string;
  docuseal?: {
    submission_id: number;
    submission_slug: string;
    signing_url: string | null;
    status: string;
  } | null;
}

export async function submitApplicationForm(
  formData: FormSubmissionData,
): Promise<SubmissionResponse> {
  try {
    // Check if we're in local development mode (localhost) or dev environment
    const isLocalDevelopment =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const isDevEnvironment =
      window.location.hostname.includes("dev.mbc-landing-page.pages.dev") ||
      window.location.hostname.includes(".mbc-landing-page.pages.dev");

    if (isLocalDevelopment) {
      // Mock response for local development only
      console.log(
        "[DEV] Form submission simulated for:",
        formData.businessName,
      );
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      return {
        success: true,
        message: "Application submitted successfully! (Development Mode)",
        docuseal: {
          submission_id: 12345,
          submission_slug: "mock-slug-dev",
          signing_url: "https://docuseal.com/s/mock-dev-url",
          status: "pending"
        }
      };
    }

    // Use Pages Function endpoint (relative URL) for production
    const response = await fetch("/api/submit-application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      return { 
        success: true, 
        message: "Application submitted successfully!",
        emailId: result.emailId,
        docuseal: result.docuseal
      };
    } else {
      return {
        success: false,
        message: result.error || "Failed to submit application",
      };
    }
  } catch (error) {
    console.error("Form submission error:", error);
    return { success: false, message: "Network error. Please try again." };
  }
}

// DocuSeal specific functions (for direct API access if needed)
export async function createDocuSealSubmission(
  formData: Omit<FormSubmissionData, 'timestamp' | 'source'>
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

export async function getDocuSealTemplates(): Promise<{ success: boolean; data?: any[]; error?: string }> {
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
