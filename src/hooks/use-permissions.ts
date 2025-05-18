import { useAuth } from '@/context/AuthContext';
import { User } from '@/context/AuthContext';

export type Permission = 
  | 'view_products'
  | 'edit_products'
  | 'view_orders'
  | 'manage_orders'
  | 'view_customers'
  | 'manage_customers'
  | 'view_analytics'
  | 'manage_users';

// Default permissions for different roles
const DEFAULT_ADMIN_PERMISSIONS: Permission[] = [
  'view_products',
  'view_orders',
  'view_customers',
  'view_analytics'
];

export const usePermissions = () => {
  const { user } = useAuth();

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;

    // Superadmins have all permissions
    if (user.role === 'superadmin') {
      return true;
    }

    // Regular admins get default permissions
    if (user.role === 'admin' && DEFAULT_ADMIN_PERMISSIONS.includes(permission)) {
      return true;
    }

    // Check custom permissions if they exist
    return user.permissions?.includes(permission) ?? false;
  };

  const hasPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };

  // Common permission checks
  const canViewProducts = (): boolean => hasPermission('view_products');
  const canEditProducts = (): boolean => hasPermission('edit_products');
  const canViewOrders = (): boolean => hasPermission('view_orders');
  const canManageOrders = (): boolean => hasPermission('manage_orders');
  const canViewCustomers = (): boolean => hasPermission('view_customers');
  const canManageCustomers = (): boolean => hasPermission('manage_customers');
  const canViewAnalytics = (): boolean => hasPermission('view_analytics');
  const canManageUsers = (): boolean => hasPermission('manage_users');

  // Convenience method to check if user can perform any management actions
  const canManageAny = (): boolean => {
    return hasAnyPermission([
      'edit_products',
      'manage_orders',
      'manage_customers',
      'manage_users'
    ]);
  };

  return {
    hasPermission,
    hasPermissions,
    hasAnyPermission,
    canViewProducts,
    canEditProducts,
    canViewOrders,
    canManageOrders,
    canViewCustomers,
    canManageCustomers,
    canViewAnalytics,
    canManageUsers,
    canManageAny,
  };
};