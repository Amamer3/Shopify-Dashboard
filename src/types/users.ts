export type UserRole = 'superadmin' | 'admin' | 'user';

export interface Permission {
  id: string;
  name: string;
  description: string;
  code: 'view_products' | 'edit_products' | 'view_orders' | 'manage_orders' | 
        'view_customers' | 'manage_customers' | 'view_analytics' | 'manage_users';
}

export interface UserPermissions {
  userId: string;
  permissions: string[]; // Array of permission codes
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions?: string[];
  createdAt: string;
  lastLogin?: string;
  status: 'active' | 'inactive';
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  permissions: string[];
}
