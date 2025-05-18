
import { Header } from "@/components/dashboard/Header";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex-1 bg-store-light-gray min-h-screen">
      
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard 
            title="Total Revenue" 
            value="$24,532.95"
            change="12.5% from last month"
            isPositive={true}
            icon={DollarSign}
            iconColor="bg-green-100 text-store-success"
          />
          <StatCard 
            title="Orders" 
            value="345"
            change="5.2% from last month"
            isPositive={true}
            icon={ShoppingCart}
            iconColor="bg-blue-100 text-blue-600"
          />
          <StatCard 
            title="Products" 
            value="126"
            change="3 new this month"
            isPositive={true}
            icon={Package}
            iconColor="bg-purple-100 text-store-purple"
          />
          <StatCard 
            title="Customers" 
            value="1,245"
            change="12 new this week"
            isPositive={true}
            icon={Users}
            iconColor="bg-yellow-100 text-store-warning"
          />
        </div>
        
        {/* Recent Orders */}
        <div className="mb-6">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
