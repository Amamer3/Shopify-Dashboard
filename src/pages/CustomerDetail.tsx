
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/dashboard/Header";
import { ArrowLeft, User, Package, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
  items: number;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: string;
  lastOrder: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  orderHistory: Order[];
}

// Mock purchase history data for demonstration
const mockPurchaseHistory: Order[] = [
  {
    id: "ORD-1234",
    date: "May 12, 2025",
    status: "Delivered",
    total: "$253.00",
    items: 3,
  },
  {
    id: "ORD-1235",
    date: "May 5, 2025",
    status: "Shipped",
    total: "$187.50",
    items: 2,
  },
  {
    id: "ORD-1236",
    date: "April 28, 2025",
    status: "Delivered",
    total: "$329.99",
    items: 4,
  },
  {
    id: "ORD-1237",
    date: "April 15, 2025",
    status: "Delivered",
    total: "$159.00",
    items: 1,
  },
  {
    id: "ORD-1238",
    date: "March 22, 2025",
    status: "Delivered",
    total: "$312.50",
    items: 3,
  },
];

// Mock spending data for chart
const spendingData = [
  { month: "Jan", amount: 0 },
  { month: "Feb", amount: 0 },
  { month: "Mar", amount: 312.5 },
  { month: "Apr", amount: 488.99 },
  { month: "May", amount: 440.5 },
  { month: "Jun", amount: 0 },
];

const mockCustomers: Record<string, Customer> = {
  "C1001": {
    id: "C1001",
    name: "Alex Johnson",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    orders: 8,
    spent: "$1,243.00",
    lastOrder: "May 12, 2025",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    orderHistory: mockPurchaseHistory,
  },
  "C1002": {
    id: "C1002",
    name: "Maya Patel",
    email: "maya@example.com",
    phone: "+1 (555) 234-5678",
    orders: 5,
    spent: "$782.50",
    lastOrder: "May 11, 2025",
    address: {
      street: "456 Oak Ave",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
    },
    orderHistory: mockPurchaseHistory,
  },
  "C1003": {
    id: "C1003",
    name: "Sam Wilson",
    email: "sam@example.com",
    phone: "+1 (555) 345-6789",
    orders: 12,
    spent: "$2,458.99",
    lastOrder: "May 10, 2025",
    address: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zip: "60601",
    },
    orderHistory: mockPurchaseHistory,
  },
};

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    if (id && mockCustomers[id]) {
      setCustomer(mockCustomers[id]);
    }
  }, [id]);

  if (!customer) {
    return (
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Link to="/customers">
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Customers
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Customer Not Found</h1>
        </div>
        <Card>
          <CardContent className="p-6">
            <p>The requested customer could not be found.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-store-light-gray min-h-screen">
      <Header 
        title={customer.name} 
        subtitle="Customer Details"
      />
      
      <div className="p-6">
        <div className="flex items-center mb-6">
          <Link to="/customers">
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Customers
            </Button>
          </Link>
        </div>
        
        {/* Customer Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <User className="h-10 w-10 text-gray-500" />
                  </div>
                  <h2 className="text-xl font-semibold">{customer.name}</h2>
                  <p className="text-gray-500 mb-4">{customer.email}</p>
                  <div className="w-full border-t pt-4 mt-2">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Phone:</span>
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Total Orders:</span>
                      <span>{customer.orders}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Total Spent:</span>
                      <span className="font-medium">{customer.spent}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-500">Last Order:</span>
                      <span>{customer.lastOrder}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Tabs defaultValue="orders">
              <TabsList className="bg-white mb-4">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders" className="mt-0">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Items</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customer.orderHistory.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                              <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'}`}>
                                {order.status}
                              </div>
                            </TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>{order.total}</TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline">View</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Spending Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ChartContainer 
                        config={{
                          purchases: {
                            label: "Purchases",
                            color: "#8B5CF6",
                          }
                        }}
                      >
                        <BarChart data={spendingData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip content={<ChartTooltipContent />} />
                          <Bar 
                            dataKey="amount" 
                            fill="var(--color-purchases, #8B5CF6)" 
                            radius={[4, 4, 0, 0]}
                            name="purchases"
                          />
                        </BarChart>
                      </ChartContainer>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-500 text-sm">Total Spent</p>
                        <p className="text-xl font-semibold">{customer.spent}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-500 text-sm">Avg. Order Value</p>
                        <p className="text-xl font-semibold">$155.38</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-500 text-sm">First Purchase</p>
                        <p className="text-xl font-semibold">Mar 22, 2025</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-500 text-sm">Last Purchase</p>
                        <p className="text-xl font-semibold">{customer.lastOrder}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="details" className="mt-0">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Customer Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {customer.address && (
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p>{customer.address.street}</p>
                          <p>{customer.address.city}, {customer.address.state} {customer.address.zip}</p>
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Account Information</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Customer ID</span>
                            <span>{customer.id}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Email</span>
                            <span>{customer.email}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Phone</span>
                            <span>{customer.phone}</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Account Created</span>
                            <span>January 15, 2025</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Preferences</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Newsletter</span>
                            <span>Subscribed</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">SMS Notifications</span>
                            <span>Opted Out</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Preferred Categories</span>
                            <span>Running, Casual</span>
                          </div>
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Payment Method</span>
                            <span>Credit Card</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
