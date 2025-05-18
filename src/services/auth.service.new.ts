import { LoginCredentials, RegisterAdminData, AuthResponse } from '@/types/auth';
import { API_CONFIG } from '@/config/api.config';

class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await API_CONFIG.fetchApi<{success: boolean; data: AuthResponse}>('/auth/login', {
        method: 'POST',
        body: credentials
      });

      if (!response.success || !response.data) {
        throw new AuthenticationError('Login failed: Invalid server response');
      }

      if (!response.data.token) {
        throw new AuthenticationError('Login failed: No authentication token received');
      }

      if (!response.data.user) {
        throw new AuthenticationError('Login failed: No user data received');
      }

      // Validate required user fields
      const { id, email, name, role } = response.data.user;
      
      if (!id || !email || !name || !role) {
        throw new AuthenticationError('Login failed: Incomplete user data received');
      }

      // Only return the data if all validations pass
      return {
        token: response.data.token,
        user: {
          id,
          email,
          name,
          role
        }
      };
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw error;
      }
      throw new AuthenticationError('An unexpected error occurred during login');
    }
  },

  async registerAdmin(data: RegisterAdminData, token: string): Promise<AuthResponse> {
    return API_CONFIG.fetchApi<AuthResponse>('/auth/register-admin', {
      method: 'POST',
      token,
      body: data
    });
  },

  async registerSuperAdmin(data: RegisterAdminData, token: string): Promise<AuthResponse> {
    return API_CONFIG.fetchApi<AuthResponse>('/auth/register-superadmin', {
      method: 'POST',
      token,
      body: data
    });
  }
};
