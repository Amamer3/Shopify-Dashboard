import { useEffect, useState } from 'react';
import { Layout } from '@/components/dashboard/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { ProductList } from '@/components/dashboard/ProductList';
import { DashboardMetrics } from '@/components/dashboard/DashboardMetrics';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { usePermissions } from '@/hooks/use-permissions';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import {
  BadgeDollarSign,
  Package,
  ShoppingCart,
  Users,
} from 'lucide-react';

interface DashboardStats {
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  revenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    revenue: 0,
  });
  const { hasPermission } = usePermissions();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // TODO: Implement API call to fetch dashboard stats
      // For now using mock data
      setStats({
        totalOrders: 150,
        totalProducts: 75,
        totalCustomers: 320,
        revenue: 25000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <QuickActions />
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {hasPermission('view_orders') && (
            <StatCard
              title="Total Orders"
              value={stats.totalOrders.toString()}
              icon={ShoppingCart}
              description="All time orders"
            />
          )}
          
          {hasPermission('view_products') && (
            <StatCard
              title="Products"
              value={stats.totalProducts.toString()}
              icon={Package}
              description="Active products"
            />
          )}          {hasPermission('view_customers') && (
            <StatCard
              title="Customers"
              value={stats.totalCustomers.toString()}
              icon={Users}
              description="Registered customers"
            />
          )}
          
          {hasPermission('view_analytics') && (
            <StatCard
              title="Revenue"
              value={`$${stats.revenue.toLocaleString()}`}
              icon={BadgeDollarSign}
              description="Total revenue"
            />
          )}
        </div>

        {hasPermission('view_analytics') && (
          <DashboardMetrics />
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {hasPermission('view_orders') && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
              <RecentOrders />
            </Card>
          )}
            {hasPermission('view_products') && (
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Popular Products</h2>
              <ProductList />
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
