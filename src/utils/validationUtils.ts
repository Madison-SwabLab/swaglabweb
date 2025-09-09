// Validation Utility Class
export class ValidationUtils {
  static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  static readonly PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  static readonly URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  static readonly PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;
  static readonly HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  static readonly ASPECT_RATIO_REGEX = /^\d+:\d+$/;
  static readonly PANTONE_CODE_REGEX = /^PANTONE\s+\d{2}-\d{4}\s+TCX$/i;
  static readonly UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  static validateEmail(email: string): boolean {
    return this.EMAIL_REGEX.test(email);
  }

  static validatePassword(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[@$!%*?&]/.test(password)) {
      errors.push('Password must contain at least one special character (@$!%*?&)');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  static validateUrl(url: string): boolean {
    try {
      new URL(url);
      return this.URL_REGEX.test(url);
    } catch {
      return false;
    }
  }

  static validatePhoneNumber(phone: string): boolean {
    return this.PHONE_REGEX.test(phone);
  }

  static validateHexColor(hex: string): boolean {
    return this.HEX_COLOR_REGEX.test(hex);
  }

  static validateAspectRatio(ratio: string): boolean {
    if (!this.ASPECT_RATIO_REGEX.test(ratio)) {
      return false;
    }

    const [width, height] = ratio.split(':').map(Number);
    return width > 0 && height > 0;
  }

  static validatePantoneCode(code: string): boolean {
    return this.PANTONE_CODE_REGEX.test(code);
  }

  static validateUuid(uuid: string): boolean {
    return this.UUID_REGEX.test(uuid);
  }

  static sanitizeString(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/[&<>"']/g, (match) => {
        const escapeMap: Record<string, string> = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        };
        return escapeMap[match];
      });
  }

  static validateJson(json: string): boolean {
    try {
      JSON.parse(json);
      return true;
    } catch {
      return false;
    }
  }

  static validateRequired(value: any, fieldName: string): { valid: boolean; error?: string } {
    if (value === null || value === undefined || value === '') {
      return { valid: false, error: `${fieldName} is required` };
    }
    return { valid: true };
  }

  static validateMinLength(value: string, minLength: number, fieldName: string): { valid: boolean; error?: string } {
    if (value.length < minLength) {
      return { valid: false, error: `${fieldName} must be at least ${minLength} characters long` };
    }
    return { valid: true };
  }

  static validateMaxLength(value: string, maxLength: number, fieldName: string): { valid: boolean; error?: string } {
    if (value.length > maxLength) {
      return { valid: false, error: `${fieldName} must be no more than ${maxLength} characters long` };
    }
    return { valid: true };
  }

  static validateMin(value: number, min: number, fieldName: string): { valid: boolean; error?: string } {
    if (value < min) {
      return { valid: false, error: `${fieldName} must be at least ${min}` };
    }
    return { valid: true };
  }

  static validateMax(value: number, max: number, fieldName: string): { valid: boolean; error?: string } {
    if (value > max) {
      return { valid: false, error: `${fieldName} must be no more than ${max}` };
    }
    return { valid: true };
  }

  static validateRange(value: number, min: number, max: number, fieldName: string): { valid: boolean; error?: string } {
    if (value < min || value > max) {
      return { valid: false, error: `${fieldName} must be between ${min} and ${max}` };
    }
    return { valid: true };
  }

  static validateArrayLength(value: any[], minLength: number, maxLength: number, fieldName: string): { valid: boolean; error?: string } {
    if (value.length < minLength) {
      return { valid: false, error: `${fieldName} must have at least ${minLength} items` };
    }
    if (value.length > maxLength) {
      return { valid: false, error: `${fieldName} must have no more than ${maxLength} items` };
    }
    return { valid: true };
  }

  static validateEnum(value: string, allowedValues: string[], fieldName: string): { valid: boolean; error?: string } {
    if (!allowedValues.includes(value)) {
      return { valid: false, error: `${fieldName} must be one of: ${allowedValues.join(', ')}` };
    }
    return { valid: true };
  }

  static validateFileSize(file: File, maxSize: number, fieldName: string): { valid: boolean; error?: string } {
    if (file.size > maxSize) {
      return { valid: false, error: `${fieldName} must be no larger than ${maxSize} bytes` };
    }
    return { valid: true };
  }

  static validateFileType(file: File, allowedTypes: string[], fieldName: string): { valid: boolean; error?: string } {
    const fileType = file.type;
    if (!allowedTypes.includes(fileType)) {
      return { valid: false, error: `${fieldName} must be one of: ${allowedTypes.join(', ')}` };
    }
    return { valid: true };
  }

  static validateDateRange(startDate: Date, endDate: Date, fieldName: string): { valid: boolean; error?: string } {
    if (startDate >= endDate) {
      return { valid: false, error: `${fieldName} start date must be before end date` };
    }
    return { valid: true };
  }

  static validateFutureDate(date: Date, fieldName: string): { valid: boolean; error?: string } {
    if (date <= new Date()) {
      return { valid: false, error: `${fieldName} must be in the future` };
    }
    return { valid: true };
  }

  static validatePastDate(date: Date, fieldName: string): { valid: boolean; error?: string } {
    if (date >= new Date()) {
      return { valid: false, error: `${fieldName} must be in the past` };
    }
    return { valid: true };
  }

  static validateAlphanumeric(value: string, fieldName: string): { valid: boolean; error?: string } {
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      return { valid: false, error: `${fieldName} must contain only letters and numbers` };
    }
    return { valid: true };
  }

  static validateNumeric(value: string, fieldName: string): { valid: boolean; error?: string } {
    if (!/^\d+$/.test(value)) {
      return { valid: false, error: `${fieldName} must contain only numbers` };
    }
    return { valid: true };
  }

  static validateDecimal(value: string, fieldName: string): { valid: boolean; error?: string } {
    if (!/^\d*\.?\d+$/.test(value)) {
      return { valid: false, error: `${fieldName} must be a valid decimal number` };
    }
    return { valid: true };
  }

  static validateInteger(value: string, fieldName: string): { valid: boolean; error?: string } {
    if (!/^-?\d+$/.test(value)) {
      return { valid: false, error: `${fieldName} must be a valid integer` };
    }
    return { valid: true };
  }

  static validatePositiveNumber(value: number, fieldName: string): { valid: boolean; error?: string } {
    if (value <= 0) {
      return { valid: false, error: `${fieldName} must be a positive number` };
    }
    return { valid: true };
  }

  static validateNonNegativeNumber(value: number, fieldName: string): { valid: boolean; error?: string } {
    if (value < 0) {
      return { valid: false, error: `${fieldName} must be a non-negative number` };
    }
    return { valid: true };
  }

  static validatePercentage(value: number, fieldName: string): { valid: boolean; error?: string } {
    if (value < 0 || value > 100) {
      return { valid: false, error: `${fieldName} must be between 0 and 100` };
    }
    return { valid: true };
  }

  static validateRgbValue(value: number, fieldName: string): { valid: boolean; error?: string } {
    if (value < 0 || value > 255) {
      return { valid: false, error: `${fieldName} must be between 0 and 255` };
    }
    return { valid: true };
  }

  static validateCmykValue(value: number, fieldName: string): { valid: boolean; error?: string } {
    if (value < 0 || value > 100) {
      return { valid: false, error: `${fieldName} must be between 0 and 100` };
    }
    return { valid: true };
  }

  static validateHslValue(value: number, fieldName: string, isHue: boolean = false): { valid: boolean; error?: string } {
    if (isHue) {
      if (value < 0 || value > 360) {
        return { valid: false, error: `${fieldName} must be between 0 and 360` };
      }
    } else {
      if (value < 0 || value > 100) {
        return { valid: false, error: `${fieldName} must be between 0 and 100` };
      }
    }
    return { valid: true };
  }
}
