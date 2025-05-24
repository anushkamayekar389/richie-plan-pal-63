
import { Link } from "react-router-dom";
import { User, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { type Client } from "@/hooks/use-clients";

interface ClientCardProps {
  client: Client;
  index: number;
}

export const ClientCard = ({ client, index }: ClientCardProps) => {
  return (
    <Link to={`/clients/${client.id}`} className="block">
      <div className="rounded-lg border p-4 hover:border-primary transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">
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
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Review due</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="mt-4 flex justify-between text-sm">
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium truncate max-w-[120px]">{client.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Phone</p>
            <p className="font-medium">{client.phone || "—"}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
