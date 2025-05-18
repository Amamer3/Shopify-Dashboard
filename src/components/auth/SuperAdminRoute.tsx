import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface SuperAdminRouteProps {
  children: ReactNode;
}

export const SuperAdminRoute = ({ children }: SuperAdminRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (user?.role !== 'superadmin') {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};
