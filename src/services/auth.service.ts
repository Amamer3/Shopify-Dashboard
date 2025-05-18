import { LoginCredentials, RegisterAdminData, AuthResponse, ErrorResponse } from '@/types/auth';
import { API_CONFIG } from '@/config/api.config';

// Server response types
interface ServerUser {
  uid: string;
  email: string;
  role: 'admin' | 'superadmin';
}

interface ServerAuthResponse {
  success: boolean;
  message?: string;
  data?: {
    user: ServerUser;
    token: string;
  };
}

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

function transformServerUser(serverUser: ServerUser): AuthResponse['user'] {
  return {
    id: serverUser.uid,
    email: serverUser.email,
    name: serverUser.email.split('@')[0], // Use email username as name
    role: serverUser.role
  };
}

function validateUserData(userData: any): asserts userData is NonNullable<AuthResponse['user']> {
  if (!userData) {
    throw new AuthenticationError('Login failed: No user data received');
  }

  const requiredFields = {
    id: 'User ID',
    email: 'Email',
    name: 'Name',
    role: 'Role'
  } as const;

  for (const [field, fieldName] of Object.entries(requiredFields)) {
    if (!userData[field]) {
      throw new AuthenticationError(`Login failed: ${fieldName} is missing`);
    }
  }

  if (!['admin', 'superadmin'].includes(userData.role)) {
    throw new AuthenticationError(`Login failed: Invalid role "${userData.role}"`);
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  console.log('Response status:', response.status, response.statusText);
  
  let data;
  try {
    data = await response.json();
    console.log('Response data:', data);
  } catch (error) {
    console.error('Error parsing response:', error);
    throw new Error('Server response was not in the expected format');
  }
  if (!response.ok) {
    const errorMessage = data.message || `Server error: ${response.statusText}`;
    console.error('Request failed:', errorMessage);
    
    // Handle specific authentication errors
    if (response.status === 401) {
      throw new AuthenticationError('Invalid email or password');
    } else if (response.status === 403) {
      throw new AuthenticationError('Access denied. Please check your credentials.');
    }
    
    throw new Error(errorMessage);
  }

  return data;
}

export const authService = {    
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('Attempting login with email:', credentials.email);
      
      const serverResponse = await API_CONFIG.fetchApi<ServerAuthResponse>('/auth/login', {
        method: 'POST',
        body: credentials,
        requiresAuth: false // Mark login as not requiring authentication
      });

      if (!serverResponse || typeof serverResponse !== 'object') {
        throw new AuthenticationError('Invalid response format received from server');
      }

      const { success, data, message } = serverResponse;

      if (!success || !data?.user) {
        throw new AuthenticationError(message || 'Login failed');
      }

      const transformedUser = transformServerUser(data.user);
      validateUserData(transformedUser);

      return {
        user: transformedUser,
        token: data.token
      };
    } catch (error: unknown) {
      console.error('Login error:', error);
      
      // Re-throw authentication errors with better messages
      if (error instanceof Error) {
        if (error.name === 'AuthenticationError') {
          throw error; // Already formatted properly
        } else if (error.name === 'SessionExpiredError') {
          throw new AuthenticationError('Session expired. Please log in again.');
        } else {
          let message = 'An error occurred during login';
          if (error.message.includes('401')) {
            message = 'Invalid email or password';
          } else if (error.message.includes('network')) {
            message = 'Unable to connect to the server. Please check your connection.';
          }
          throw new AuthenticationError(message);
        }
      }
      throw new AuthenticationError('An unexpected error occurred during login');
    }
  },
  async registerAdmin(data: RegisterAdminData, token: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/register-admin`, {
        method: 'POST',
        headers: API_CONFIG.getHeaders(token),
        body: JSON.stringify(data),
        credentials: 'include'
      }).catch(error => {
        console.error('Network error during admin registration:', error);
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      });

      return await handleResponse<AuthResponse>(response);
    } catch (error) {
      throw error instanceof Error ? error : new Error('An unexpected error occurred');
    }
  },  
  async registerSuperAdmin(data: RegisterAdminData, token: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/register-superadmin`, {
        method: 'POST',
        headers: API_CONFIG.getHeaders(token),
        body: JSON.stringify(data),
        credentials: 'include'
      }).catch(error => {
        console.error('Network error during superadmin registration:', error);
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      });

      return await handleResponse<AuthResponse>(response);
    } catch (error) {
      throw error instanceof Error ? error : new Error('An unexpected error occurred');
    }
  },
};
