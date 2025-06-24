/**
 * Security utility functions for input sanitization and validation
 */

export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  
  // Remove potentially dangerous characters and scripts
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Allow various phone formats: (555) 123-4567, 555-123-4567, 555.123.4567, 5551234567
  const phoneRegex = /^[\+]?[1-9]?[\s\-\(\)]?[\d\s\-\(\)]{10,14}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateBusinessName = (name: string): boolean => {
  // Business name should be 2-100 characters, letters, numbers, spaces, and common business punctuation
  const businessNameRegex = /^[a-zA-Z0-9\s\.\,\&\-\']{2,100}$/;
  return businessNameRegex.test(name);
};

export const sanitizeAndValidateFormData = (formData: {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  businessType: string;
  desiredAmount: string;
}) => {
  const sanitized = {
    businessName: sanitizeInput(formData.businessName),
    contactName: sanitizeInput(formData.contactName),
    email: sanitizeInput(formData.email).toLowerCase(),
    phone: sanitizeInput(formData.phone),
    businessType: sanitizeInput(formData.businessType),
    desiredAmount: sanitizeInput(formData.desiredAmount)
  };

  const errors: string[] = [];

  if (!validateBusinessName(sanitized.businessName)) {
    errors.push('Business name must be 2-100 characters with valid characters only');
  }

  if (!validateBusinessName(sanitized.contactName)) {
    errors.push('Contact name must be 2-100 characters with valid characters only');
  }

  if (!validateEmail(sanitized.email)) {
    errors.push('Please enter a valid email address');
  }

  if (!validatePhone(sanitized.phone)) {
    errors.push('Please enter a valid phone number');
  }

  return {
    sanitizedData: sanitized,
    isValid: errors.length === 0,
    errors
  };
}; 