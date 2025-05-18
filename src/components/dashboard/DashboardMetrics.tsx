import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface MetricsData {
  date: string;
  orders: number;
  revenue: number;
}

export function DashboardMetrics() {
  const [data, setData] = useState<MetricsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockData = Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      orders: Math.floor(Math.random() * 50) + 10,
      revenue: Math.floor(Math.random() * 5000) + 1000,
    })).reverse();

    setData(mockData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Skeleton className="w-full h-[400px]" />;
  }

  return (
    <Card className="p-6 ">
      <h2 className="text-xl font-semibold mb-6">Weekly Performance</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="orders"
            stroke="#8884d8"
            name="Orders"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="revenue"
            stroke="#82ca9d"
            name="Revenue ($)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
