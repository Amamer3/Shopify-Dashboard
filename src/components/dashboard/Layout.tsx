import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="fixed inset-0 flex bg-store-light-gray">
      <Sidebar onCollapse={setIsCollapsed} />
      <div className={`flex-1 flex flex-col transition-[margin] duration-200 ${isCollapsed ? 'lg:ml-0' : 'lg:ml-15'}`}>
        <div className="sticky top-0 z-10">
          <Header title="Dashboard" 
        subtitle="Welcome back to your store overview" />
        </div>
        <div className="flex-1 overflow-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
