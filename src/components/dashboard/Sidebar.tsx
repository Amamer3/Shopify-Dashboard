import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Menu, 
  X, 
  LogOut, 
  BarChart, 
  Settings,
  ShieldAlert,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePermissions } from "@/hooks/use-permissions";
import { useToast } from "@/hooks/use-toast";
import type { Permission } from "@/types/permissions";

interface SidebarProps {
  onCollapse: (collapsed: boolean) => void;
}

export function Sidebar({ onCollapse }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved === "true";
  });

  useEffect(() => {
    onCollapse(isCollapsed);
    localStorage.setItem("sidebarCollapsed", String(isCollapsed));
  }, [isCollapsed, onCollapse]);

  const location = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const { hasPermission } = usePermissions();

  const isSuperAdmin = () => user?.role === 'superadmin';

  const getNavItems = () => {
    const items = [
      {
        title: "Dashboard",
        href: isSuperAdmin() ? "/dashboard" : "/admin-dashboard",
        icon: LayoutDashboard,
        permission: null // Always show dashboard
      },
    ];

    if (hasPermission('view_products')) {
      items.push({
        title: "Products",
        href: "/products",
        icon: Package,
        permission: 'view_products' as Permission
      });
    }

    if (hasPermission('view_orders')) {
      items.push({
        title: "Orders",
        href: "/orders",
        icon: ShoppingCart,
        permission: 'view_orders' as Permission
      });
    }

    if (hasPermission('view_customers')) {
      items.push({
        title: "Customers",
        href: "/customers",
        icon: Users,
        permission: 'view_customers' as Permission
      });
    }

    if (hasPermission('view_analytics')) {
      items.push({
        title: "Analytics",
        href: "/analytics",
        icon: BarChart,
        permission: 'view_analytics' as Permission
      });
    }

    if (isSuperAdmin()) {
      items.push({
        title: "User Management",
        href: "/users",
        icon: ShieldAlert,
        permission: 'manage_users' as Permission
      });
    }    if (isSuperAdmin()) {
      items.push({
        title: "Settings",
        href: "/settings",
        icon: Settings,
        permission: null // Settings only available to superadmin
      });
    }

    return items;
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navItems = getNavItems();

  return (
    <div className="h-full">      
      <button
        type="button"
        className="fixed p-2.5 bg-white/80 backdrop-blur-sm border rounded-lg top-2 left-2 lg:hidden z-[60] shadow-sm hover:bg-white"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>
      {/* this is not what I'm looking for... */}
      <aside
        className={cn(
          "h-screen border-r shadow-sm",
          "fixed lg:sticky inset-y-0 left-0 top-0 z-[50]",
          "transform transition-all duration-200 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          isCollapsed ? "w-16" : "w-56",
          "bg-white border-gray-200 lg:border-r lg:border-gray-200"
        )}
      >
        <div className="flex flex-col h-full bg-white relative">          
          <div className="flex items-center h-16 border-b relative bg-white/50 backdrop-blur-sm">
            <div className="flex items-center px-4 w-full">
              <h1 className={cn(
                "font-bold transition-all duration-200 truncate text-gray-900",
                isCollapsed ? "text-base" : "text-lg"
              )}>
                {isCollapsed ? "S&D" : "Shopify Dashboard"}
              </h1>
              <button
                onClick={() => {
                  const newCollapsed = !isCollapsed;
                  setIsCollapsed(newCollapsed);
                  onCollapse(newCollapsed);
                }}
                className={cn(
                  "absolute right-2 p-1.5 rounded-md hidden lg:flex",
                  "hover:bg-gray-100/80 transition-colors",
                  "items-center justify-center"
                )}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? (
                  <ChevronsRight className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronsLeft className="h-4 w-4 text-gray-600" />
                )}
              </button>
            </div>
          </div>
          <nav className="flex-1 ">
            <ul className="p-2 space-y-1">
              {navItems.map((item) => (
                <li key={`${item.title}-${item.href}`}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg transition-colors",
                      "text-sm font-medium text-gray-700 hover:text-gray-900",
                      "hover:bg-gray-100/80",
                      location.pathname === item.href && "bg-primary/5 text-primary hover:bg-primary/10",
                      isCollapsed && "justify-center"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className={cn(
                      "w-5 h-5 shrink-0",
                      location.pathname === item.href ? "text-primary" : "text-gray-500",
                      !isCollapsed && "mr-3"
                    )} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-2 border-t mt-auto">
            <button
              type="button"
              onClick={handleLogout}
              className={cn(
                "flex items-center w-full px-3 py-2 rounded-lg transition-colors",
                "text-sm font-medium text-gray-700 hover:text-red-600",
                "hover:bg-red-50/80",
                isCollapsed && "justify-center"
              )}
            >
              <LogOut className={cn(
                "w-5 h-5 shrink-0 text-gray-500",
                "hover:text-red-500",
                !isCollapsed && "mr-3"
              )} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-40"
          onClick={() => setIsMobileMenuOpen(false)}
          role="button"
          aria-label="Close mobile menu"
        />
      )}
    </div>
  );
}
