
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useClients } from "@/hooks/use-clients";
import { ClientsHeader } from "@/components/clients/ClientsHeader";
import { ClientsSearch } from "@/components/clients/ClientsSearch";
import { ClientsList } from "@/components/clients/ClientsList";
import { FinancialPlanWizard } from "@/components/plans/FinancialPlanWizard";

const Clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClientForPlan, setSelectedClientForPlan] = useState<{id: string, name: string} | null>(null);
  const { data: clients = [], isLoading, refetch } = useClients();

  const filteredClients = clients.filter((client) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      client.first_name.toLowerCase().includes(query) ||
      client.last_name.toLowerCase().includes(query) ||
      client.email.toLowerCase().includes(query)
    );
  });

  const handleClientAdded = (newClient?: any) => {
    refetch();
    // Show plan generation wizard for new client
    if (newClient && newClient.id) {
      setSelectedClientForPlan({
        id: newClient.id,
        name: `${newClient.first_name} ${newClient.last_name}`
      });
    }
  };

  const handleAddClientClick = () => {
    // This will be handled by the AddClientDialog component
    console.log("Add client clicked");
  };

  return (
    <div className="space-y-6">
      <ClientsHeader onClientAdded={handleClientAdded} />
      <ClientsSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Clients</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="reviews">Reviews Due</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <ClientsList 
            clients={filteredClients} 
            isLoading={isLoading}
            onAddClientClick={handleAddClientClick}
            onGeneratePlan={(client) => setSelectedClientForPlan({
              id: client.id,
              name: `${client.first_name} ${client.last_name}`
            })}
          />
        </TabsContent>
        <TabsContent value="active">
          <div className="mt-6 text-center py-10 text-gray-500">
            Select "Active" tab to see clients with active financial plans
          </div>
        </TabsContent>
        <TabsContent value="recent">
          <div className="mt-6 text-center py-10 text-gray-500">
            Select "Recently Added" tab to see your newest clients
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <div className="mt-6 text-center py-10 text-gray-500">
            Select "Reviews Due" tab to see clients with upcoming reviews
          </div>
        </TabsContent>
      </Tabs>

      {selectedClientForPlan && (
        <FinancialPlanWizard
          clientName={selectedClientForPlan.name}
          clientId={selectedClientForPlan.id}
          onClose={() => setSelectedClientForPlan(null)}
        />
      )}
    </div>
  );
};

export default Clients;
