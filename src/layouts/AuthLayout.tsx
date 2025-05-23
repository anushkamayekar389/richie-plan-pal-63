
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { DashboardHeader } from "@/components/DashboardHeader";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <DashboardHeader />
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
