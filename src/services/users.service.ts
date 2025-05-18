import { CreateUserData, User } from '@/types/users';
import { API_CONFIG } from '@/config/api.config';

export const usersService = {
  // Get all users (admin and superadmin)
  async getUsers(token: string): Promise<User[]> {
    if (!token) {
      throw new Error('Authentication token is required');
    }
    return API_CONFIG.fetchApi<User[]>('/users', { 
      method: 'GET',
      token,
      requiresAuth: true 
    });
  },

  // Get single user (superadmin, admin or own profile)
  async getUser(userId: string, token: string): Promise<User> {
    return API_CONFIG.fetchApi<User>(`/users/${userId}`, { token });
  },

  // Create new user (superadmin only)
  async createUser(userData: CreateUserData, token: string): Promise<User> {
    // Set default permissions based on role
    let permissions: string[] = [];
    if (userData.role === 'superadmin') {
      // Superadmin gets all permissions
      permissions = [
        'view_users', 'create_user', 'update_user', 'delete_user', 'manage_user_permissions',
        'view_products', 'create_product', 'update_product', 'delete_product',
        'view_orders', 'update_order_status', 'delete_order',
        'view_categories', 'create_category', 'update_category', 'delete_category',
        'view_analytics', 'export_reports', 'manage_settings'
      ];
    } else if (userData.role === 'admin') {
      // Admin gets a subset of permissions
      permissions = [
        'view_users', 'create_user', 'update_user',
        'view_products', 'create_product', 'update_product', 'delete_product',
        'view_orders', 'update_order_status',
        'view_categories', 'create_category', 'update_category',
        'view_analytics'
      ];
    }

    return API_CONFIG.fetchApi<User>('/users', {
      method: 'POST',
      token,
      body: {
        ...userData,
        permissions
      }
    });
  },

  // Update user profile (superadmin, admin or own profile)
  async updateUser(userId: string, userData: Partial<CreateUserData>, token: string): Promise<User> {
    // If role is being updated, update permissions accordingly
    if (userData.role) {
      let permissions: string[] = [];
      if (userData.role === 'superadmin') {
        permissions = [
          'view_users', 'create_user', 'update_user', 'delete_user', 'manage_user_permissions',
          'view_products', 'create_product', 'update_product', 'delete_product',
          'view_orders', 'update_order_status', 'delete_order',
          'view_categories', 'create_category', 'update_category', 'delete_category',
          'view_analytics', 'export_reports', 'manage_settings'
        ];
      } else if (userData.role === 'admin') {
        permissions = [
          'view_users', 'create_user', 'update_user',
          'view_products', 'create_product', 'update_product', 'delete_product',
          'view_orders', 'update_order_status',
          'view_categories', 'create_category', 'update_category',
          'view_analytics'
        ];
      }
      userData.permissions = permissions;
    }

    return API_CONFIG.fetchApi<User>(`/users/${userId}`, {
      method: 'PUT',
      token,
      body: userData
    });
  },

  // Delete user (superadmin only)
  async deleteUser(userId: string, token: string): Promise<void> {
    return API_CONFIG.fetchApi<void>(`/users/${userId}`, {
      method: 'DELETE',
      token
    });
  },

  // Update user permissions (superadmin only)
  async updateUserPermissions(userId: string, permissions: string[], token: string): Promise<User> {
    return this.updateUser(userId, { permissions }, token);
  },

  // Update user status (superadmin or admin)
  async updateUserStatus(userId: string, status: 'active' | 'inactive', token: string): Promise<User> {
    return this.updateUser(userId, { status }, token);
  },

  // Update user password
  async updateUserPassword(userId: string, newPassword: string, token: string): Promise<void> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/users/${userId}/password`, {
        method: 'PUT',
        headers: API_CONFIG.getHeaders(token),
        body: JSON.stringify({ password: newPassword }),
        credentials: 'include'
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error updating user password:', error);
      throw error instanceof Error ? error : new Error('An unexpected error occurred');
    }
  }
};
