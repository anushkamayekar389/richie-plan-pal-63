
import { Link } from "react-router-dom";
import { useState } from "react";
import { User, AlertCircle, Mail, Phone, FileText } from "lucide-react";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { type Client } from "@/hooks/use-clients";
import { useIsMobile } from "@/hooks/use-mobile";
import { CreatePlanDialog } from "./CreatePlanDialog";

interface ClientCardProps {
  client: Client;
  index: number;
}

export const ClientCard = ({ client, index }: ClientCardProps) => {
  const isMobile = useIsMobile();
  const [createPlanOpen, setCreatePlanOpen] = useState(false);

  const handleCreatePlan = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to client detail
    setCreatePlanOpen(true);
  };

  return (
    <>
      <Link to={`/clients/${client.id}`} className="block">
        <div className="rounded-lg border p-4 hover:border-primary hover:shadow-md transition-all duration-200 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 truncate">
                  {client.first_name} {client.last_name}
                </p>
                <p className="text-sm text-gray-500">
                  Added {format(new Date(client.created_at), 'MMM yyyy')}
                </p>
              </div>
            </div>
            {index === 2 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Review due</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-4'} text-sm mb-4`}>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-gray-500 text-xs">Email</p>
                <p className="font-medium truncate">{client.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-gray-500 text-xs">Phone</p>
                <p className="font-medium">{client.phone || "—"}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleCreatePlan}
              className="text-primary border-primary hover:bg-primary hover:text-white"
            >
              <FileText className="w-4 h-4 mr-2" />
              Create Plan
            </Button>
          </div>
        </div>
      </Link>

      <CreatePlanDialog 
        open={createPlanOpen} 
        onOpenChange={setCreatePlanOpen}
        client={client}
      />
    </>
  );
};
