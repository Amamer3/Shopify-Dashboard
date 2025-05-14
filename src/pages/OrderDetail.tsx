
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/dashboard/Header";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, AlertTriangle } from "lucide-react";

type OrderStatus = "delivered" | "pending" | "processing" | "cancelled";

interface OrderItem {
  id: string;
  product: string;
  quantity: number;
  price: string;
  total: string;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  amount: string;
  status: OrderStatus;
  payment: string;
  items: OrderItem[];
  address: string;
  phone: string;
}

// Mock order data
const mockOrders: Record<string, Order> = {
  "ORD-5289": {
    id: "ORD-5289",
    customer: "Alex Johnson",
    email: "alex@example.com",
    date: "May 12, 2025",
    amount: "$135.00",
    status: "delivered",
    payment: "Credit Card",
    items: [
      { id: "1", product: "Urban Runner Sneakers", quantity: 1, price: "$89.00", total: "$89.00" },
      { id: "2", product: "Comfort Insoles", quantity: 2, price: "$23.00", total: "$46.00" }
    ],
    address: "123 Main St, New York, NY 10001",
    phone: "(555) 123-4567"
  },
  "ORD-5288": {
    id: "ORD-5288",
    customer: "Maya Patel",
    email: "maya@example.com",
    date: "May 12, 2025",
    amount: "$89.50",
    status: "pending",
    payment: "PayPal",
    items: [
      { id: "1", product: "City Hiker Boots", quantity: 1, price: "$89.50", total: "$89.50" }
    ],
    address: "456 Park Ave, Boston, MA 02215",
    phone: "(555) 987-6543"
  },
  "ORD-5287": {
    id: "ORD-5287",
    customer: "Sam Wilson",
    email: "sam@example.com",
    date: "May 11, 2025",
    amount: "$212.99",
    status: "processing",
    payment: "Credit Card",
    items: [
      { id: "1", product: "Elite Sport Shoes", quantity: 1, price: "$129.99", total: "$129.99" },
      { id: "2", product: "Athletic Socks", quantity: 3, price: "$12.00", total: "$36.00" },
      { id: "3", product: "Shoe Cleaner Kit", quantity: 1, price: "$47.00", total: "$47.00" }
    ],
    address: "789 Oak St, Chicago, IL 60611",
    phone: "(555) 456-7890"
  },
  "ORD-5286": {
    id: "ORD-5286",
    customer: "Taylor Swift",
    email: "taylor@example.com",
    date: "May 11, 2025",
    amount: "$159.99",
    status: "delivered",
    payment: "Apple Pay",
    items: [
      { id: "1", product: "Designer Loafers", quantity: 1, price: "$159.99", total: "$159.99" }
    ],
    address: "101 Music Lane, Nashville, TN 37203",
    phone: "(555) 789-0123"
  },
  "ORD-5285": {
    id: "ORD-5285",
    customer: "Jamie Rodriguez",
    email: "jamie@example.com",
    date: "May 10, 2025",
    amount: "$49.99",
    status: "cancelled",
    payment: "Credit Card",
    items: [
      { id: "1", product: "Casual Canvas Shoes", quantity: 1, price: "$49.99", total: "$49.99" }
    ],
    address: "234 Elm St, San Francisco, CA 94107",
    phone: "(555) 234-5678"
  },
};

const statusStyles: Record<OrderStatus, string> = {
  delivered: "bg-green-100 text-store-success",
  pending: "bg-yellow-100 text-store-warning",
  processing: "bg-blue-100 text-blue-600",
  cancelled: "bg-red-100 text-store-error",
};

const StatusIcon = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-5 w-5 text-store-success" />;
    case "pending":
      return <Clock className="h-5 w-5 text-store-warning" />;
    case "processing":
      return <Package className="h-5 w-5 text-blue-600" />;
    case "cancelled":
      return <AlertTriangle className="h-5 w-5 text-store-error" />;
    default:
      return null;
  }
};

const OrderTimeline = ({ status }: { status: OrderStatus }) => {
  // Define the order of statuses in the timeline
  const timeline = ["pending", "processing", "delivered"];
  const currentIndex = timeline.indexOf(status);
  
  // Don't show timeline for cancelled orders
  if (status === "cancelled") {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-store-error flex items-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        <span>This order was cancelled</span>
      </div>
    );
  }

  return (
    <div className="flex items-center w-full mt-4 mb-8">
      {timeline.map((step, index) => (
        <div key={step} className="flex-1 relative">
          {/* Connector line */}
          {index > 0 && (
            <div 
              className={`absolute top-1/2 w-full h-1 -left-1/2 transform -translate-y-1/2 ${
                index <= currentIndex ? "bg-store-purple" : "bg-gray-200"
              }`} 
            />
          )}
          
          {/* Circle with icon */}
          <div className="flex flex-col items-center">
            <div 
              className={`rounded-full h-10 w-10 flex items-center justify-center z-10 ${
                index <= currentIndex 
                  ? "bg-store-purple text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              {index === 0 && <Clock className="h-5 w-5" />}
              {index === 1 && <Package className="h-5 w-5" />}
              {index === 2 && <Truck className="h-5 w-5" />}
            </div>
            <span className="text-xs mt-2 font-medium text-center">
              {step.charAt(0).toUpperCase() + step.slice(1)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const order = id ? mockOrders[id] : null;

  // If order doesn't exist
  if (!order) {
    return (
      <div className="flex-1 bg-store-light-gray min-h-screen">
        <Header
          title="Order Not Found"
          subtitle="The requested order does not exist"
        />
        <div className="p-6">
          <Button asChild>
            <Link to="/orders">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-store-light-gray min-h-screen">
      <Header
        title={`Order ${order.id}`}
        subtitle={`Placed on ${order.date}`}
      />
      
      <div className="p-6">
        <Button asChild variant="outline" className="mb-6">
          <Link to="/orders">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Link>
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Order Status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <StatusIcon status={order.status} />
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${statusStyles[order.status]}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <OrderTimeline status={order.status} />
            </CardContent>
          </Card>
          
          {/* Customer Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm font-medium">{order.customer}</p>
                <p className="text-sm text-gray-500">{order.email}</p>
                <p className="text-sm text-gray-500">{order.phone}</p>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm font-medium">Shipping Address</p>
                <p className="text-sm text-gray-500">{order.address}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Payment Method</span>
                  <span className="text-sm font-medium">{order.payment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Amount</span>
                  <span className="text-sm font-medium">{order.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Status</span>
                  <span className="text-sm font-medium text-store-success">Paid</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Items */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Order Items</CardTitle>
            <CardDescription>
              {order.items.length} {order.items.length === 1 ? 'item' : 'items'} in this order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.price}</TableCell>
                    <TableCell className="text-right font-medium">{item.total}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {order.amount}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetail;
