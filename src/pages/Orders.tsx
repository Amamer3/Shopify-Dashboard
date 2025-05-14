
import { Header } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download } from "lucide-react";

type OrderStatus = "delivered" | "pending" | "processing" | "cancelled";

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  amount: string;
  status: OrderStatus;
  payment: string;
}

const mockOrders: Order[] = [
  { id: "ORD-5289", customer: "Alex Johnson", email: "alex@example.com", date: "May 12, 2025", amount: "$135.00", status: "delivered", payment: "Credit Card" },
  { id: "ORD-5288", customer: "Maya Patel", email: "maya@example.com", date: "May 12, 2025", amount: "$89.50", status: "pending", payment: "PayPal" },
  { id: "ORD-5287", customer: "Sam Wilson", email: "sam@example.com", date: "May 11, 2025", amount: "$212.99", status: "processing", payment: "Credit Card" },
  { id: "ORD-5286", customer: "Taylor Swift", email: "taylor@example.com", date: "May 11, 2025", amount: "$159.99", status: "delivered", payment: "Apple Pay" },
  { id: "ORD-5285", customer: "Jamie Rodriguez", email: "jamie@example.com", date: "May 10, 2025", amount: "$49.99", status: "cancelled", payment: "Credit Card" },
  { id: "ORD-5284", customer: "Jordan Lee", email: "jordan@example.com", date: "May 10, 2025", amount: "$76.00", status: "delivered", payment: "PayPal" },
  { id: "ORD-5283", customer: "Casey Kim", email: "casey@example.com", date: "May 9, 2025", amount: "$120.50", status: "pending", payment: "Credit Card" },
  { id: "ORD-5282", customer: "Riley Johnson", email: "riley@example.com", date: "May 9, 2025", amount: "$95.25", status: "delivered", payment: "Credit Card" },
  { id: "ORD-5281", customer: "Quinn Smith", email: "quinn@example.com", date: "May 8, 2025", amount: "$184.99", status: "processing", payment: "Google Pay" },
  { id: "ORD-5280", customer: "Morgan Brown", email: "morgan@example.com", date: "May 8, 2025", amount: "$67.50", status: "delivered", payment: "PayPal" },
];

const statusStyles: Record<OrderStatus, string> = {
  delivered: "bg-green-100 text-store-success",
  pending: "bg-yellow-100 text-store-warning",
  processing: "bg-blue-100 text-blue-600",
  cancelled: "bg-red-100 text-store-error",
};

const Orders = () => {
  return (
    <div className="flex-1 bg-store-light-gray min-h-screen">
      <Header 
        title="Orders" 
        subtitle="Manage your customer orders"
      />
      
      <div className="p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search orders..." 
              className="pl-10 md:w-80 bg-white" 
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>
        
        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-500 border-b">
                  <th className="font-medium text-left px-6 py-3">Order ID</th>
                  <th className="font-medium text-left px-6 py-3">Customer</th>
                  <th className="font-medium text-left px-6 py-3">Date</th>
                  <th className="font-medium text-left px-6 py-3">Amount</th>
                  <th className="font-medium text-left px-6 py-3">Payment</th>
                  <th className="font-medium text-left px-6 py-3">Status</th>
                  <th className="font-medium text-left px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium">{order.customer}</p>
                        <p className="text-xs text-gray-500">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 text-sm font-medium">{order.amount}</td>
                    <td className="px-6 py-4 text-sm">{order.payment}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusStyles[order.status]}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="outline" className="text-xs">View Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Showing 10 of 124 orders</p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
