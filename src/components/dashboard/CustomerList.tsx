
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, User } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: string;
  lastOrder: string;
}

const mockCustomers: Customer[] = [
  {
    id: "C1001",
    name: "Alex Johnson",
    email: "alex@example.com",
    orders: 8,
    spent: "$1,243.00",
    lastOrder: "May 12, 2025",
  },
  {
    id: "C1002",
    name: "Maya Patel",
    email: "maya@example.com",
    orders: 5,
    spent: "$782.50",
    lastOrder: "May 11, 2025",
  },
  {
    id: "C1003",
    name: "Sam Wilson",
    email: "sam@example.com",
    orders: 12,
    spent: "$2,458.99",
    lastOrder: "May 10, 2025",
  },
  {
    id: "C1004",
    name: "Taylor Swift",
    email: "taylor@example.com",
    orders: 3,
    spent: "$459.97",
    lastOrder: "May 9, 2025",
  },
  {
    id: "C1005",
    name: "Jamie Rodriguez",
    email: "jamie@example.com",
    orders: 7,
    spent: "$897.45",
    lastOrder: "May 8, 2025",
  },
];

export const CustomerList = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b flex items-center justify-between">
        <h2 className="font-semibold text-lg">Customers</h2>
        <Button variant="outline" size="sm">
          View All Customers
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-500 border-b">
              <th className="font-medium text-left px-6 py-3">Customer</th>
              <th className="font-medium text-left px-6 py-3">Orders</th>
              <th className="font-medium text-left px-6 py-3">Spent</th>
              <th className="font-medium text-left px-6 py-3">Last Order</th>
              <th className="font-medium text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCustomers.map((customer) => (
              <tr key={customer.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{customer.orders}</td>
                <td className="px-6 py-4 text-sm font-medium">{customer.spent}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{customer.lastOrder}</td>
                <td className="px-6 py-4">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
