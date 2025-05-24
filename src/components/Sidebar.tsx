
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar, 
  Calculator, 
  Settings,
  LogOut,
  User,
  Users2,
  Target
} from "lucide-react";

export function Sidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Plan Builder", href: "/plan-builder", icon: Target },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "Financial Plans", href: "/financial-plans", icon: FileText },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Calculators", href: "/calculators", icon: Calculator },
    { name: "Team", href: "/team", icon: Users2 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    const { success } = await signOut();
    if (success) {
      toast({
        title: "Signed out successfully",
      });
    }
  };

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-4 border-b border-gray-200">
        <Link to="/dashboard" className="flex items-center">
          <span className="text-xl font-bold text-primary">Richie</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium",
              location.pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <item.icon className="w-5 h-5 mr-2" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        {user && (
          <div className="mb-4">
            <Link 
              to="/profile"
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium",
                location.pathname === "/profile"
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <User className="w-5 h-5 mr-2" />
              My Profile
            </Link>
          </div>
        )}
        <button 
          onClick={handleSignOut}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sign out
        </button>
      </div>
    </div>
  );
}
