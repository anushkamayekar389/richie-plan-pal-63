
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users2 } from "lucide-react";
import { type Client } from "@/hooks/use-clients";
import { ClientCard } from "./ClientCard";

interface ClientsListProps {
  clients: Client[];
  isLoading: boolean;
  onAddClientClick: () => void;
  onGeneratePlan?: (client: Client) => void;
}

export const ClientsList = ({ clients, isLoading, onAddClientClick, onGeneratePlan }: ClientsListProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users2 className="w-5 h-5 mr-2" /> 
            All Clients
          </CardTitle>
          <CardDescription>Loading clients...</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-500">Loading clients...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (clients.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users2 className="w-5 h-5 mr-2" /> 
            All Clients
          </CardTitle>
          <CardDescription>No clients found</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 mb-4">No clients found</p>
            <Button onClick={onAddClientClick}>
              <Plus className="w-4 h-4 mr-2" /> Add Your First Client
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users2 className="w-5 h-5 mr-2" /> 
          All Clients
        </CardTitle>
        <CardDescription>
          Showing {clients.length} client{clients.length !== 1 ? 's' : ''} in your portfolio
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {clients.map((client, index) => (
            <ClientCard 
              key={client.id} 
              client={client} 
              index={index}
              onGeneratePlan={onGeneratePlan}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
