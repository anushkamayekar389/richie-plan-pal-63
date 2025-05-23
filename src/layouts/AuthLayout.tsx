
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const AuthLayout = () => {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="container px-6 py-8 max-w-7xl">
            <Outlet />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AuthLayout;
