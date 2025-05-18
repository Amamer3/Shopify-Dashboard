import { CreateUserData, User } from '@/types/users';
import { API_CONFIG } from '@/config/api.config';

export const usersService = {
  // Get all users (admin and superadmin)
  async getUsers(token: string): Promise<User[]> {
    return API_CONFIG.fetchApi<User[]>('/users', { token });
  },

  // Get single user
  async getUser(userId: string, token: string): Promise<User> {
    return API_CONFIG.fetchApi<User>(`/users/${userId}`, { token });
  },

  // Create new user
  async createUser(userData: CreateUserData, token: string): Promise<User> {
    return API_CONFIG.fetchApi<User>('/users', {
      method: 'POST',
      token,
      body: userData
    });
  },

  // Update user
  async updateUser(userId: string, userData: Partial<CreateUserData>, token: string): Promise<User> {
    return API_CONFIG.fetchApi<User>(`/users/${userId}`, {
      method: 'PUT',
      token,
      body: userData
    });
  },

  // Delete user
  async deleteUser(userId: string, token: string): Promise<void> {
    return API_CONFIG.fetchApi<void>(`/users/${userId}`, {
      method: 'DELETE',
      token
    });
  },

  // Update user permissions (convenience method)
  async updateUserPermissions(userId: string, permissions: string[], token: string): Promise<User> {
    return this.updateUser(userId, { permissions }, token);
  },

  // Update user status (convenience method)
  async updateUserStatus(userId: string, status: 'active' | 'inactive', token: string): Promise<User> {
    return this.updateUser(userId, { status }, token);
  }
};
