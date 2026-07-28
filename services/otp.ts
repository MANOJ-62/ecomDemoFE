import api, { unwrapApiResponse } from './apiClient'
import { ApiResponse } from './types/backend'

export interface SendOtpRequest {
  email: string
}

export interface VerifyOtpRequest {
  email: string
  otp: string
}

export const sendRegistrationOtp = async (
  request: SendOtpRequest
): Promise<boolean> => {
  const response = await api.post<ApiResponse<string>>(
    '/auth/register/send-otp',
    request
  )

  unwrapApiResponse(response)

  return true
}

export const verifyRegistrationOtp = async (
  request: VerifyOtpRequest
): Promise<boolean> => {
  const response = await api.post<ApiResponse<string>>(
    '/auth/register/verify-otp',
    request
  )

  unwrapApiResponse(response)

  return true
}

/** * Format remaining time as MM:SS */ 
export function formatExpiryTime(seconds: number): string { 
  const mins = Math.floor(seconds / 60); 
  const secs = seconds % 60; 
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; 
}
  
  /**
   * Validate email format
   */
  export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  /**
   * Validate password strength
   */
  export function validatePasswordStrength(password: string): {
    valid: boolean;
    strength: 'weak' | 'medium' | 'strong';
    message: string;
  } {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;
  
    if (!isLongEnough || !hasUpperCase || !hasLowerCase || !hasNumbers) {
      return {
        valid: false,
        strength: 'weak',
        message: 'Password must be at least 8 characters with uppercase, lowercase, and numbers.',
      };
    }
  
    if (hasSpecialChar) {
      return {
        valid: true,
        strength: 'strong',
        message: 'Strong password',
      };
    }
  
    return {
      valid: true,
      strength: 'medium',
      message: 'Medium strength password',
    };
  }
  