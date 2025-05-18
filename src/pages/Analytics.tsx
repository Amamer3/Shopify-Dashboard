
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

const salesData = [
  { month: "Jan", revenue: 12500, orders: 87, target: 12000 },
  { month: "Feb", revenue: 14200, orders: 95, target: 13000 },
  { month: "Mar", revenue: 15800, orders: 110, target: 14000 },
  { month: "Apr", revenue: 16500, orders: 116, target: 15000 },
  { month: "May", revenue: 18200, orders: 124, target: 16000 },
  { month: "Jun", revenue: 17800, orders: 122, target: 17000 },
  { month: "Jul", revenue: 19500, orders: 128, target: 18000 },
  { month: "Aug", revenue: 20100, orders: 132, target: 19000 },
  { month: "Sep", revenue: 21500, orders: 145, target: 20000 },
  { month: "Oct", revenue: 22800, orders: 158, target: 21000 },
  { month: "Nov", revenue: 24100, orders: 167, target: 22000 },
  { month: "Dec", revenue: 28500, orders: 195, target: 23000 },
];

const inventoryData = [
  { category: "Running", stock: 175, value: 16250 },
  { category: "Casual", stock: 210, value: 12500 },
  { category: "Sports", stock: 125, value: 14750 },
  { category: "Streetwear", stock: 95, value: 9500 },
  { category: "Hiking", stock: 65, value: 7800 },
  { category: "Training", stock: 110, value: 11000 },
];

const customerData = [
  { age: "18-24", count: 250, spending: 15200 },
  { age: "25-34", count: 480, spending: 42500 },
  { age: "35-44", count: 320, spending: 36800 },
  { age: "45-54", count: 180, spending: 22400 },
  { age: "55+", count: 120, spending: 14800 },
];

const forecastData = [
  { month: "Jan", actual: 12500, forecast: 12800 },
  { month: "Feb", actual: 14200, forecast: 14500 },
  { month: "Mar", actual: 15800, forecast: 16100 },
  { month: "Apr", actual: 16500, forecast: 17200 },
  { month: "May", actual: 18200, forecast: 18500 },
  { month: "Jun", actual: 17800, forecast: 19000 },
  { month: "Jul", actual: 19500, forecast: 20200 },
  { month: "Aug", actual: 20100, forecast: 21500 },
  { month: "Sep", actual: 21500, forecast: 22800 },
  { month: "Oct", actual: null, forecast: 24100 },
  { month: "Nov", actual: null, forecast: 26500 },
  { month: "Dec", actual: null, forecast: 29800 },
];

const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899'];


const getBreadcrumbs = () => {
      const paths = location.pathname.split('/').filter(Boolean);
      return paths.map((path, index) => {
        const displayName = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
        const isLast = index === paths.length - 1;
        return (
          <span key={path} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">/</span>}
            <span className={cn(
              "hover:text-primary cursor-pointer",
              isLast ? "text-gray-600" : "text-gray-400"
            )}>
              {displayName}
            </span>
          </span>
        );
      });
    };
const Analytics = () => {
  const [timeframe, setTimeframe] = useState("year");

  return (
    <div className="flex-1 bg-store-light-gray min-h-screen">
      {/* Breadcrumbs */}
        <div className="flex text-sm items-center h-6">
          {getBreadcrumbs()}
        </div> 
      
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <Tabs defaultValue="sales" className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="forecast">Forecasting</TabsTrigger>
              </TabsList>
              
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Sales Analytics */}
            <TabsContent value="sales">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Revenue</CardTitle>
                    <CardDescription>All time sales revenue</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$231,500</div>
                    <p className="text-xs text-green-600 flex items-center">
                      +12.5% from previous period
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Orders</CardTitle>
                    <CardDescription>All time orders processed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">1,579</div>
                    <p className="text-xs text-green-600 flex items-center">
                      +8.2% from previous period
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Average Order Value</CardTitle>
                    <CardDescription>Revenue per order</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$146.61</div>
                    <p className="text-xs text-green-600 flex items-center">
                      +3.8% from previous period
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Revenue vs Target</CardTitle>
                  <CardDescription>Monthly revenue compared to target</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ChartContainer 
                    config={{
                      revenue: { color: "#8B5CF6" },
                      target: { color: "#E5E7EB" }
                    }} 
                    className="h-80"
                  >
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `$${value/1000}k`} 
                        width={55}
                      />
                      <ChartTooltip 
                        formatter={(value) => [`$${value.toLocaleString()}`, null]} 
                      />
                      <Legend />
                      <Bar dataKey="revenue" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Monthly Orders</CardTitle>
                  <CardDescription>Order volume by month</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ChartContainer 
                    config={{
                      orders: { color: "#10B981" }
                    }} 
                    className="h-80"
                  >
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis width={40} />
                      <ChartTooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="orders" 
                        stroke="#10B981" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Inventory Analytics */}
            <TabsContent value="inventory">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Stock by Category</CardTitle>
                    <CardDescription>Current inventory distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer 
                      config={{
                        Running: { color: COLORS[0] },
                        Casual: { color: COLORS[1] },
                        Sports: { color: COLORS[2] },
                        Streetwear: { color: COLORS[3] },
                        Hiking: { color: COLORS[4] },
                        Training: { color: COLORS[5] },
                      }} 
                      className="h-80"
                    >
                      <PieChart>
                        <Pie
                          data={inventoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="stock"
                          nameKey="category"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {inventoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip formatter={(value, name) => [`${value} items`, name]} />
                        <Legend />
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Inventory Value by Category</CardTitle>
                    <CardDescription>Dollar value of inventory</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer 
                      config={{
                        value: { color: "#3B82F6" }
                      }} 
                      className="h-80"
                    >
                      <BarChart data={inventoryData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="category" />
                        <YAxis 
                          tickFormatter={(value) => `$${value/1000}k`} 
                          width={55}
                        />
                        <ChartTooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, null]} 
                        />
                        <Legend />
                        <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
                
                <Card className="mb-6 lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Low Stock Items</CardTitle>
                    <CardDescription>Products that need reordering</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left pb-3">Product ID</th>
                            <th className="text-left pb-3">Name</th>
                            <th className="text-left pb-3">Category</th>
                            <th className="text-left pb-3">Current Stock</th>
                            <th className="text-left pb-3">Reorder Point</th>
                            <th className="text-left pb-3">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3">P005</td>
                            <td>Comfort Slip-On</td>
                            <td>Casual</td>
                            <td className="text-store-error font-semibold">3</td>
                            <td>10</td>
                            <td>
                              <Button size="sm">Reorder</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3">P008</td>
                            <td>Trek Mountain Boot</td>
                            <td>Hiking</td>
                            <td className="text-store-warning font-semibold">8</td>
                            <td>12</td>
                            <td>
                              <Button size="sm">Reorder</Button>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-3">P012</td>
                            <td>Ultra Light Runner</td>
                            <td>Running</td>
                            <td className="text-store-warning font-semibold">7</td>
                            <td>15</td>
                            <td>
                              <Button size="sm">Reorder</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Customer Analytics */}
            <TabsContent value="customers">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Age Distribution</CardTitle>
                    <CardDescription>Demographics breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer 
                      config={{
                        count: { color: "#8B5CF6" }
                      }} 
                      className="h-80"
                    >
                      <BarChart data={customerData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="age" />
                        <YAxis width={40} />
                        <ChartTooltip />
                        <Legend />
                        <Bar dataKey="count" name="Number of Customers" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Spending by Age Group</CardTitle>
                    <CardDescription>Revenue by demographic</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer 
                      config={{
                        spending: { color: "#10B981" }
                      }} 
                      className="h-80"
                    >
                      <BarChart data={customerData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="age" />
                        <YAxis 
                          tickFormatter={(value) => `$${value/1000}k`} 
                          width={55}
                        />
                        <ChartTooltip 
                          formatter={(value) => [`$${value.toLocaleString()}`, null]} 
                        />
                        <Legend />
                        <Bar dataKey="spending" name="Total Spending" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Customer Acquisition</CardTitle>
                    <CardDescription>New customers over time</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <ChartContainer 
                      config={{
                        newCustomers: { color: "#3B82F6" },
                        returning: { color: "#F59E0B" }
                      }} 
                      className="h-80"
                    >
                      <LineChart data={salesData.map(d => ({
                        ...d,
                        newCustomers: Math.round(d.orders * 0.4),
                        returning: Math.round(d.orders * 0.6)
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" />
                        <YAxis width={40} />
                        <ChartTooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="newCustomers" 
                          name="New Customers"
                          stroke="#3B82F6" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="returning" 
                          name="Returning Customers"
                          stroke="#F59E0B" 
                          strokeWidth={2} 
                          dot={{ r: 4 }} 
                        />
                      </LineChart>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Revenue Forecast */}
            <TabsContent value="forecast">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Revenue Forecast</CardTitle>
                  <CardDescription>Next 3 months revenue projection</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ChartContainer 
                    config={{
                      actual: { color: "#3B82F6" },
                      forecast: { color: "#8B5CF6" }
                    }} 
                    className="h-80"
                  >
                    <LineChart data={forecastData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `$${value/1000}k`} 
                        width={55}
                      />
                      <ChartTooltip 
                        formatter={(value) => value ? [`$${value.toLocaleString()}`, null] : ["N/A", null]} 
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        name="Actual Revenue"
                        stroke="#3B82F6" 
                        strokeWidth={2} 
                        dot={{ r: 4 }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="forecast" 
                        name="Forecasted Revenue"
                        stroke="#8B5CF6" 
                        strokeWidth={2} 
                        strokeDasharray="5 5"
                        dot={{ r: 4 }} 
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500">
                    Forecast is based on historical data and seasonal trends.
                  </p>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Projected Sales</CardTitle>
                    <CardDescription>Next quarter prediction</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">$80,400</div>
                    <p className="text-xs text-green-600 flex items-center">
                      +15.2% from current quarter
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Projected Orders</CardTitle>
                    <CardDescription>Next quarter prediction</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">546</div>
                    <p className="text-xs text-green-600 flex items-center">
                      +12.8% from current quarter
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Growth Rate</CardTitle>
                    <CardDescription>Annualized prediction</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">18.5%</div>
                    <p className="text-xs text-green-600 flex items-center">
                      +2.3% from current rate
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Planning</CardTitle>
                  <CardDescription>Upcoming stock requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left pb-3">Category</th>
                          <th className="text-left pb-3">Current Stock</th>
                          <th className="text-left pb-3">Projected Need</th>
                          <th className="text-left pb-3">Recommendation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3">Running</td>
                          <td>175</td>
                          <td>210</td>
                          <td className="font-medium text-amber-600">Order 35 more</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">Casual</td>
                          <td>210</td>
                          <td>195</td>
                          <td className="font-medium text-green-600">Sufficient</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">Sports</td>
                          <td>125</td>
                          <td>160</td>
                          <td className="font-medium text-amber-600">Order 35 more</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3">Streetwear</td>
                          <td>95</td>
                          <td>140</td>
                          <td className="font-medium text-red-600">Order 45 more</td>
                        </tr>
                        <tr>
                          <td className="py-3">Hiking</td>
                          <td>65</td>
                          <td>50</td>
                          <td className="font-medium text-green-600">Sufficient</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
