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
    // Using the deployed Worker URL
    const workerUrl = 'https://mbc-form-handler.shy-math-4d31.workers.dev/submit-application';
    
    const response = await fetch(workerUrl, {
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