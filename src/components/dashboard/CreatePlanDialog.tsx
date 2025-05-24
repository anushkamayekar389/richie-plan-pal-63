
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFinancialPlanGenerator } from "@/hooks/use-financial-plan-generator";
import { useClients } from "@/hooks/use-clients";
import { FinancialPlanInput } from "@/services/financialPlanGenerator";
import { toast } from "@/hooks/use-toast";

export function CreatePlanDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<FinancialPlanInput>>({
    planName: "",
    clientId: "",
    planType: "comprehensive",
    template: "standard",
    timeHorizon: 10,
    riskTolerance: "moderate"
  });
  
  const { generatePlan, isGenerating } = useFinancialPlanGenerator();
  const { data: clients = [], isLoading: clientsLoading } = useClients();

  const handleGeneratePlan = async () => {
    if (!formData.planName || !formData.clientId) {
      toast({
        title: "Missing Information",
        description: "Please select a client and enter a plan name",
        variant: "destructive",
      });
      return;
    }

    // Find the selected client
    const selectedClient = clients.find(client => client.id === formData.clientId);
    if (!selectedClient) {
      toast({
        title: "Client Not Found",
        description: "Please select a valid client",
        variant: "destructive",
      });
      return;
    }

    try {
      await generatePlan(formData as FinancialPlanInput);
      setOpen(false);
      // Reset form
      setFormData({
        planName: "",
        clientId: "",
        planType: "comprehensive",
        template: "standard",
        timeHorizon: 10,
        riskTolerance: "moderate"
      });
    } catch (error) {
      console.error('Failed to generate plan:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Financial Plan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Financial Plan</DialogTitle>
          <DialogDescription>
            Fill in the details to generate a new financial plan.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="plan-name">Plan Name</Label>
            <Input 
              id="plan-name" 
              placeholder="Retirement Plan"
              value={formData.planName}
              onChange={(e) => setFormData({...formData, planName: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client">Client</Label>
            <Select 
              onValueChange={(value) => setFormData({...formData, clientId: value})}
              value={formData.clientId}
            >
              <SelectTrigger id="client">
                <SelectValue placeholder={clientsLoading ? "Loading clients..." : "Select client"} />
              </SelectTrigger>
              <SelectContent>
                {clients.length === 0 ? (
                  <SelectItem value="no-clients" disabled>
                    No clients found - Add clients first
                  </SelectItem>
                ) : (
                  clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.first_name} {client.last_name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="plan-type">Plan Type</Label>
            <Select onValueChange={(value: any) => setFormData({...formData, planType: value})}>
              <SelectTrigger id="plan-type">
                <SelectValue placeholder="Select plan type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comprehensive">Comprehensive</SelectItem>
                <SelectItem value="retirement">Retirement</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="tax">Tax Planning</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <Select onValueChange={(value: any) => setFormData({...formData, template: value})}>
              <SelectTrigger id="template">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="detailed">Detailed</SelectItem>
                <SelectItem value="executive">Executive Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time-horizon">Time Horizon (Years)</Label>
            <Input 
              id="time-horizon" 
              type="number"
              placeholder="10"
              value={formData.timeHorizon}
              onChange={(e) => setFormData({...formData, timeHorizon: parseInt(e.target.value) || 10})}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleGeneratePlan} 
            disabled={isGenerating || !formData.clientId || !formData.planName}
          >
            {isGenerating ? "Generating..." : "Generate Plan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
