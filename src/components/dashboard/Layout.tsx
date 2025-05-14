
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-store-light-gray">
      <Sidebar />
      <div className="flex-1 ml-0 lg:ml-64">
        {children}
      </div>
    </div>
  );
};
