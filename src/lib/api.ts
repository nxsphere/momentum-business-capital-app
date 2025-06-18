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
    // Use Pages Function endpoint (relative URL)
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