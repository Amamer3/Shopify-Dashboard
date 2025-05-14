
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Package, ShoppingCart, Users, Menu, X, LogOut, BarChart } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart,
  },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-md shadow-md"
      >
        {collapsed ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 z-40 h-full bg-store-navy text-white transition-all duration-300 ease-in-out",
        collapsed ? "-translate-x-full" : "translate-x-0",
        "lg:translate-x-0",
        "w-64 lg:w-64"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-slate-700">
            <h1 className="text-xl font-bold">Urban Sole Store</h1>
          </div>
          
          {/* Nav Links */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                      location.pathname === item.href
                        ? "bg-store-purple text-white"
                        : "text-gray-300 hover:bg-slate-800 hover:text-white"
                    )}
                    onClick={() => setCollapsed(true)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t border-slate-700">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 px-4 py-2">
                <div className="h-8 w-8 rounded-full bg-store-purple flex items-center justify-center">
                  <span className="font-bold">{user?.name.charAt(0) || "U"}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold">{user?.name || "User"}</p>
                  <p className="text-xs text-gray-400">{user?.email || "admin@urbansole.com"}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-slate-800 hover:text-white rounded-md transition-colors w-full"
              >
                <LogOut className="h-5 w-5" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile view */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
};
