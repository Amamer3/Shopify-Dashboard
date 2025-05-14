
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type OrderStatus = "delivered" | "pending" | "processing" | "cancelled";

interface Order {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: OrderStatus;
}

const mockOrders: Order[] = [
  { id: "ORD-5289", customer: "Alex Johnson", date: "May 12, 2025", amount: "$135.00", status: "delivered" },
  { id: "ORD-5288", customer: "Maya Patel", date: "May 12, 2025", amount: "$89.50", status: "pending" },
  { id: "ORD-5287", customer: "Sam Wilson", date: "May 11, 2025", amount: "$212.99", status: "processing" },
  { id: "ORD-5286", customer: "Taylor Swift", date: "May 11, 2025", amount: "$159.99", status: "delivered" },
  { id: "ORD-5285", customer: "Jamie Rodriguez", date: "May 10, 2025", amount: "$49.99", status: "cancelled" },
];

const statusStyles: Record<OrderStatus, string> = {
  delivered: "bg-green-100 text-store-success",
  pending: "bg-yellow-100 text-store-warning",
  processing: "bg-blue-100 text-blue-600",
  cancelled: "bg-red-100 text-store-error",
};

export const RecentOrders = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">Recent Orders</h2>
        <Link to="/orders" className="text-store-purple flex items-center text-sm hover:underline">
          View All <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-500 border-b">
              <th className="font-medium text-left px-6 py-3">Order ID</th>
              <th className="font-medium text-left px-6 py-3">Customer</th>
              <th className="font-medium text-left px-6 py-3">Date</th>
              <th className="font-medium text-left px-6 py-3">Amount</th>
              <th className="font-medium text-left px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                <td className="px-6 py-4 text-sm">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 text-sm font-medium">{order.amount}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusStyles[order.status]}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
