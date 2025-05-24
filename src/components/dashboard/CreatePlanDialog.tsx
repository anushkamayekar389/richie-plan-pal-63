
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useClients } from "@/hooks/use-clients";
import { EnhancedPlanWizard } from "@/components/plans/EnhancedPlanWizard";

export function CreatePlanDialog() {
  const [open, setOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  
  const { data: clients = [] } = useClients();

  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId);
  };

  const selectedClient = clients.find(client => client.id === selectedClientId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Financial Plan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Create Comprehensive Financial Plan</DialogTitle>
          <DialogDescription>
            Generate a detailed, SEBI/FPSB-compliant financial plan using complete client data.
          </DialogDescription>
        </DialogHeader>
        
        {!selectedClientId ? (
          <div className="space-y-4 py-4">
            <h3 className="font-medium">Select Client</h3>
            <div className="grid gap-3 max-h-[400px] overflow-y-auto">
              {clients.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No clients found. Add clients first to create financial plans.
                </div>
              ) : (
                clients.map((client) => (
                  <Button
                    key={client.id}
                    variant="outline"
                    className="justify-start h-auto p-4"
                    onClick={() => handleClientSelect(client.id)}
                  >
                    <div className="text-left">
                      <div className="font-medium">
                        {client.first_name} {client.last_name}
                      </div>
                      <div className="text-sm text-gray-500">{client.email}</div>
                    </div>
                  </Button>
                ))
              )}
            </div>
          </div>
        ) : (
          <EnhancedPlanWizard
            client={selectedClient!}
            onClose={() => {
              setOpen(false);
              setSelectedClientId("");
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
