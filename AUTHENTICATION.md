# FoodZone Authentication System

## Overview
The FoodZone application implements a **JWT-based email OTP authentication system** with mock data. The system is designed to be easily integrated with a Spring Boot backend API later.

## Current Implementation (Mock Data)

### Authentication Flow
1. User enters email on login page
2. System generates a 6-digit OTP
3. OTP is sent to user's email (currently logged to console for demo)
4. User enters OTP to verify
5. System generates JWT token upon successful verification
6. User is authenticated and redirected to homepage

### Files Structure

```
/services
  ├── auth.ts                 # Core authentication service
├── /hooks
  ├── useAuth.ts            # React hook for auth operations
├── /app
  ├── /login
  │   └── page.tsx          # Login page component
└── /components
    └── Header.tsx          # Updated with user profile & logout
```

## API Endpoints (Mock Implementation)

All endpoints are currently mocked in `services/auth.ts`. Ready to be replaced with Spring Boot backend.

### 1. Send OTP
**Endpoint:** `POST /api/auth/send-otp`
**Current:** `sendOTPEmail(email: string)`

Request:
```json
{
  "email": "user@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "OTP sent to your email"
}
```

### 2. Verify OTP & Get Token
**Endpoint:** `POST /api/auth/verify-otp`
**Current:** `verifyOTPAndGetToken(email: string, otp: string)`

Request:
```json
{
  "email": "user@example.com",
  "otp": "123456"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user@example.com",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### 3. Verify JWT Token
**Current:** `verifyJWT(token: string): User | null`

Token Structure (JWT):
```json
{
  "sub": "user@example.com",
  "email": "user@example.com",
  "name": "User Name",
  "iat": 1234567890,
  "exp": 1234654290
}
```

## Using the Authentication System

### In React Components

```tsx
import { useAuth } from '@/hooks/useAuth'

export function MyComponent() {
  const { user, isAuthenticated, isLoading, error, sendOTP, verifyOTP, logout } = useAuth()

  const handleLogin = async (email: string) => {
    const success = await sendOTP(email)
    if (success) {
      // Show OTP input screen
    }
  }

  const handleVerifyOTP = async (email: string, otp: string) => {
    const success = await verifyOTP(email, otp)
    if (success) {
      // User is logged in, redirect to dashboard
    }
  }

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.name}!</p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  )
}
```

### Checking Authentication Status

```tsx
import { getAuthToken, getCurrentUser } from '@/services/auth'

// Get JWT token
const token = getAuthToken()

// Get current user
const user = getCurrentUser()

// Store auth data
import { storeAuthData } from '@/services/auth'
storeAuthData(token, user)
```

## Testing the System

### Demo Login
1. Go to `/login`
2. Enter any email (e.g., `test@example.com`)
3. Click "Send OTP"
4. Enter any 6-digit code (e.g., `123456`)
5. Click "Verify & Login"
6. You'll be logged in and redirected to homepage

### Checking Console
Open browser console to see:
- `[Auth] OTP sent to test@example.com: 123456`
- JWT token generation logs

## Integration with Spring Boot Backend

### Steps to Replace Mock with Real API

1. **Update `services/auth.ts`:**
   - Replace `sendOTPEmail()` with API call to `POST /api/auth/send-otp`
   - Replace `verifyOTPAndGetToken()` with API call to `POST /api/auth/verify-otp`
   - Use real JWT verification on backend

2. **Example with Fetch:**
```tsx
export const sendOTPEmail = async (email: string): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
  return response.ok
}

export const verifyOTPAndGetToken = async (email: string, otp: string) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp })
  })
  const data = await response.json()
  return data
}
```

3. **Update JWT Verification:**
   - Replace mock `verifyJWT()` with real token validation
   - Add token refresh mechanism
   - Implement token expiration handling

## Security Notes (for Production)

1. **Never store sensitive data in localStorage** - Use httpOnly cookies instead
2. **Implement CSRF protection** - Add CSRF tokens to requests
3. **Use real JWT library** - Replace mock base64 implementation
4. **Rate limiting** - Implement on backend for OTP endpoints
5. **Email verification** - Actually send OTP emails via service like SendGrid
6. **SSL/TLS** - Always use HTTPS for authentication endpoints
7. **Token rotation** - Implement refresh token mechanism
8. **CORS** - Configure proper CORS policies

## Files Modified/Created

- `services/auth.ts` - Authentication service
- `hooks/useAuth.ts` - React authentication hook
- `app/login/page.tsx` - Login page
- `components/Header.tsx` - Updated with auth UI
- `types/index.ts` - Updated User interface

## Next Steps

1. Replace mock data with Spring Boot API calls
2. Implement proper JWT token management
3. Add refresh token mechanism
4. Implement password reset flow
5. Add social login (optional)
6. Implement 2FA (optional)
