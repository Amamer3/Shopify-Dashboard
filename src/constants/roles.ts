export const UserRoles = {
  SUPERADMIN: 'superadmin',
  ADMIN: 'admin',
  USER: 'user'
} as const;

export const Permissions = {
  // User Management
  VIEW_USERS: 'view_users',
  CREATE_USER: 'create_user',
  UPDATE_USER: 'update_user',
  DELETE_USER: 'delete_user',
  MANAGE_USER_PERMISSIONS: 'manage_user_permissions',
  
  // Product Management
  VIEW_PRODUCTS: 'view_products',
  CREATE_PRODUCT: 'create_product',
  UPDATE_PRODUCT: 'update_product',
  DELETE_PRODUCT: 'delete_product',
  
  // Order Management
  VIEW_ORDERS: 'view_orders',
  UPDATE_ORDER_STATUS: 'update_order_status',
  DELETE_ORDER: 'delete_order',
  
  // Category Management
  VIEW_CATEGORIES: 'view_categories',
  CREATE_CATEGORY: 'create_category',
  UPDATE_CATEGORY: 'update_category',
  DELETE_CATEGORY: 'delete_category',
  
  // Analytics & Reports
  VIEW_ANALYTICS: 'view_analytics',
  EXPORT_REPORTS: 'export_reports',
  
  // Settings
  MANAGE_SETTINGS: 'manage_settings'
} as const;

// Superadmin has all permissions
export const SUPERADMIN_PERMISSIONS = Object.values(Permissions);

// Default admin permissions
export const DEFAULT_ADMIN_PERMISSIONS = [
  Permissions.VIEW_USERS,
  Permissions.CREATE_USER,
  Permissions.UPDATE_USER,
  Permissions.VIEW_PRODUCTS,
  Permissions.CREATE_PRODUCT,
  Permissions.UPDATE_PRODUCT,
  Permissions.DELETE_PRODUCT,
  Permissions.VIEW_ORDERS,
  Permissions.UPDATE_ORDER_STATUS,
  Permissions.VIEW_CATEGORIES,
  Permissions.CREATE_CATEGORY,
  Permissions.UPDATE_CATEGORY,
  Permissions.VIEW_ANALYTICS
];
