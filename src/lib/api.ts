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

export async function submitApplicationForm(formData: FormSubmissionData): Promise<{ success: boolean; message: string }> {
  try {
    // Check if we're in local development mode (localhost) or dev environment
    const isLocalDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isDevEnvironment = window.location.hostname.includes('dev.mbc-landing-page.pages.dev') || 
                             window.location.hostname.includes('.mbc-landing-page.pages.dev');
    
    if (isLocalDevelopment) {
      // Mock response for local development only
      console.log('[DEV] Form submission simulated for:', formData.businessName);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      return { success: true, message: 'Application submitted successfully! (Development Mode)' };
    }
    
    // Use Pages Function endpoint (relative URL) for production
    const response = await fetch('/api/submit-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    
    if (response.ok) {
      return { success: true, message: 'Application submitted successfully!' };
    } else {
      return { success: false, message: result.error || 'Failed to submit application' };
    }
  } catch (error) {
    console.error('Form submission error:', error);
    return { success: false, message: 'Network error. Please try again.' };
  }
} 