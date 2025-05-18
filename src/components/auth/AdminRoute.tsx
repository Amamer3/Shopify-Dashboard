import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface AdminRouteProps {
  children: ReactNode;
  requiredPermissions?: string[];
}

export const AdminRoute = ({ children, requiredPermissions = [] }: AdminRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Allow superadmin to access all admin routes
  if (user?.role === 'superadmin') {
    return <>{children}</>;
  }

  // For regular admin, check if they have admin role
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  // If specific permissions are required, check them
  if (requiredPermissions.length > 0) {
    const hasRequiredPermissions = requiredPermissions.every(
      permission => user.permissions?.includes(permission)
    );

    if (!hasRequiredPermissions) {
      return <Navigate to="/dashboard" />;
    }
  }

  return <>{children}</>;
};
