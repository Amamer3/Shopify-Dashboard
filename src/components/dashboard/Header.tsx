import { Bell, Search, User, ChevronDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Mock notifications - in a real app, these would come from an API
  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Order",
      message: "You have received a new order #1234",
      time: "5m ago",
      read: false
    },
    {
      id: "2",
      title: "Low Stock Alert",
      message: "Product 'Nike Air Max' is running low on stock",
      time: "1h ago",
      read: false
    },
    {
      id: "3",
      title: "System Update",
      message: "System maintenance scheduled for tonight",
      time: "2h ago",
      read: true
    }
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search logic here
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // const getBreadcrumbs = () => {
  //   const paths = location.pathname.split('/').filter(Boolean);
  //   return paths.map((path, index) => {
  //     const displayName = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
  //     const isLast = index === paths.length - 1;
  //     return (
  //       <span key={path} className="flex items-center">
  //         {index > 0 && <span className="mx-2 text-gray-400">/</span>}
  //         <span className={cn(
  //           "hover:text-primary cursor-pointer",
  //           isLast ? "text-gray-600" : "text-gray-400"
  //         )}>
  //           {displayName}
  //         </span>
  //       </span>
  //     );
  //   });
  // };

  return (
    <div className="bg-white border-b px-6 py-2 shadow-sm">
      <div className="flex flex-col space-y-2">
        {/* Breadcrumbs */}
        {/* <div className="flex text-sm items-center h-6">
          {getBreadcrumbs()}
        </div> */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className={cn(
              "relative transition-all duration-300",
              showSearch ? "w-full md:w-64" : "w-auto"
            )}>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..." 
                  className="pl-10 w-full bg-slate-50"
                />
              </div>

              {/* Mobile Search */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setShowSearch(!showSearch)}
              >
                {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>
            </form>

            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full relative">
                  <Bell className="h-5 w-5" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-xs text-gray-400">{notification.time}</span>
                    </div>
                    <span className="text-sm text-gray-500">{notification.message}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline-block">{user?.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};
