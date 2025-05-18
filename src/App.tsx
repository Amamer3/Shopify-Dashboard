import { ReactNode, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AdminRoute } from "@/components/auth/AdminRoute";
import { SuperAdminRoute } from "@/components/auth/SuperAdminRoute";
import { Layout } from "@/components/dashboard/Layout";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";

// Lazy-loaded pages
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Products = lazy(() => import("./pages/Products"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const Customers = lazy(() => import("./pages/Customers"));
const CustomerDetail = lazy(() => import("./pages/CustomerDetail"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings")); // Added Settings page
const Profile = lazy(() => import("./pages/Profile")); // Added Profile page

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Error fallback component
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="p-4 text-red-600" role="alert">
    <h2>Something went wrong</h2>
    <p>{error.message}</p>
  </div>
);

// Redirect based on auth status
const RootRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has super admin role
  const isSuperAdmin = user.role === 'superadmin';
  return <Navigate to={isSuperAdmin ? "/dashboard" : "/admin-dashboard"} replace />;
};

// Wrapper for protected routes with Layout
const ProtectedLayout = ({ children }: { children: ReactNode }) => (
  <Layout>{children}</Layout>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Suspense fallback={<div className="p-4">Loading...</div>}>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<RootRedirect />} />
                  <Route path="/login" element={<Login />} />

                  {/* Protected Routes with Layout */}
                  <Route
                    path="/admin-dashboard"
                    element={
                      <AdminRoute>
                        <ProtectedLayout>
                          <AdminDashboard />
                        </ProtectedLayout>
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/products"
                    element={
                      <AdminRoute requiredPermissions={["view_products"]}>
                        <ProtectedLayout>
                          <Products />
                        </ProtectedLayout>
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/orders"
                    element={
                      <AdminRoute requiredPermissions={["view_orders"]}>
                        <ProtectedLayout>
                          <Orders />
                        </ProtectedLayout>
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/orders/:id"
                    element={
                      <AdminRoute requiredPermissions={["view_orders"]}>
                        <ProtectedLayout>
                          <OrderDetail />
                        </ProtectedLayout>
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/customers"
                    element={
                      <AdminRoute requiredPermissions={["view_customers"]}>
                        <ProtectedLayout>
                          <Customers />
                        </ProtectedLayout>
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/customers/:id"
                    element={
                      <AdminRoute requiredPermissions={["view_customers"]}>
                        <ProtectedLayout>
                          <CustomerDetail />
                        </ProtectedLayout>
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/analytics"
                    element={
                      <AdminRoute requiredPermissions={["view_analytics"]}>
                        <ProtectedLayout>
                          <Analytics />
                        </ProtectedLayout>
                      </AdminRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <SuperAdminRoute>
                        <ProtectedLayout>
                          <Dashboard />
                        </ProtectedLayout>
                      </SuperAdminRoute>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <SuperAdminRoute>
                        <ProtectedLayout>
                          <Users />
                        </ProtectedLayout>
                      </SuperAdminRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <SuperAdminRoute>
                        <ProtectedLayout>
                          <Settings />
                        </ProtectedLayout>
                      </SuperAdminRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProtectedLayout>
                          <Profile />
                        </ProtectedLayout>
                      </ProtectedRoute>
                    }
                  />

                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;