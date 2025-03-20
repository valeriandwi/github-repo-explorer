import { Card } from "antd";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row justify-center p-4">
      <Card className="lg:w-1/2 max-md:w-full md:w-3/4">{children}</Card>
    </div>
  );
};

export default MainLayout;
