
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconColor?: string;
}

export const StatCard = ({
  title,
  value,
  change,
  isPositive = true,
  icon: Icon,
  iconColor = "bg-blue-100 text-blue-600"
}: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-fade-in">
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          
          {change && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${isPositive ? 'text-store-success' : 'text-store-error'}`}>
                {isPositive ? '+' : ''}{change}
              </span>
            </div>
          )}
        </div>
        
        <div className={`rounded-full p-3 h-fit ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};
