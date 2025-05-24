
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ClientOnboardingFlow } from "./ClientOnboardingFlow";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ClientsHeaderProps {
  onClientAdded: () => void;
}

export const ClientsHeader = ({ onClientAdded }: ClientsHeaderProps) => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleClientComplete = async (clientData: any) => {
    try {
      const { error } = await supabase.from("clients").insert([clientData]);
      
      if (error) throw error;
      
      toast({
        title: "Client added successfully",
        description: `${clientData.first_name} ${clientData.last_name} has been added to your clients`,
      });
      
      setShowOnboarding(false);
      onClientAdded();
    } catch (error: any) {
      toast({
        title: "Error adding client",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-gray-500">Manage your client relationships and profiles</p>
        </div>
        <Button onClick={() => setShowOnboarding(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add New Client
        </Button>
      </div>

      {showOnboarding && (
        <ClientOnboardingFlow
          onClose={() => setShowOnboarding(false)}
          onComplete={handleClientComplete}
        />
      )}
    </>
  );
};
