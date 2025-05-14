
import { Header } from "@/components/dashboard/Header";
import { CustomerList } from "@/components/dashboard/CustomerList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Plus } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: string;
  lastOrder: string;
}

const mockCustomers: Customer[] = [
  {
    id: "C1001",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    orders: 8,
    spent: "$1,243.00",
    lastOrder: "May 12, 2025",
  },
  {
    id: "C1002",
    name: "Maya Patel",
    email: "maya@example.com",
    phone: "+1 (555) 234-5678",
    orders: 5,
    spent: "$782.50",
    lastOrder: "May 11, 2025",
  },
  {
    id: "C1003",
    name: "Sam Wilson",
    email: "sam@example.com",
    phone: "+1 (555) 345-6789",
    orders: 12,
    spent: "$2,458.99",
    lastOrder: "May 10, 2025",
  },
  {
    id: "C1004",
    name: "Taylor Swift",
    email: "taylor@example.com",
    phone: "+1 (555) 456-7890",
    orders: 3,
    spent: "$459.97",
    lastOrder: "May 9, 2025",
  },
  {
    id: "C1005",
    name: "Jamie Rodriguez",
    email: "jamie@example.com",
    phone: "+1 (555) 567-8901",
    orders: 7,
    spent: "$897.45",
    lastOrder: "May 8, 2025",
  },
  {
    id: "C1006",
    name: "Jordan Lee",
    email: "jordan@example.com",
    phone: "+1 (555) 678-9012",
    orders: 4,
    spent: "$582.75",
    lastOrder: "May 7, 2025",
  },
  {
    id: "C1007",
    name: "Casey Kim",
    email: "casey@example.com",
    phone: "+1 (555) 789-0123",
    orders: 9,
    spent: "$1,356.25",
    lastOrder: "May 6, 2025",
  },
  {
    id: "C1008",
    name: "Riley Johnson",
    email: "riley@example.com",
    phone: "+1 (555) 890-1234",
    orders: 2,
    spent: "$245.98",
    lastOrder: "May 5, 2025",
  },
];

const Customers = () => {
  return (
    <div className="flex-1 bg-store-light-gray min-h-screen">
      <Header 
        title="Customers" 
        subtitle="Manage your customer base"
      />
      
      <div className="p-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search customers..." 
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
            <Button className="bg-store-purple hover:bg-purple-600 flex-1 md:flex-none">
              <Plus className="h-4 w-4 mr-2" /> Add Customer
            </Button>
          </div>
        </div>
        
        {/* Customer Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-500 border-b">
                  <th className="font-medium text-left px-6 py-3">Customer</th>
                  <th className="font-medium text-left px-6 py-3">Phone</th>
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
                      <div>
                        <p className="text-sm font-medium">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{customer.phone}</td>
                    <td className="px-6 py-4 text-sm">{customer.orders}</td>
                    <td className="px-6 py-4 text-sm font-medium">{customer.spent}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{customer.lastOrder}</td>
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
              <p className="text-sm text-gray-500">Showing 8 of 42 customers</p>
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

export default Customers;
