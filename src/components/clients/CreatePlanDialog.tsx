
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFinancialPlanGenerator } from "@/hooks/use-financial-plan-generator";
import { FinancialPlanInput } from "@/services/financialPlanGenerator";
import { type Client } from "@/hooks/use-clients";
import { FileText, Sparkles } from "lucide-react";

interface CreatePlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client;
}

export const CreatePlanDialog = ({ open, onOpenChange, client }: CreatePlanDialogProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<FinancialPlanInput>>({
    planName: "",
    clientId: client.id,
    planType: "comprehensive",
    template: "standard",
    timeHorizon: 10,
    riskTolerance: "moderate"
  });
  
  const { generatePlan, isGenerating } = useFinancialPlanGenerator();

  const handleGeneratePlan = async () => {
    if (!formData.planName) {
      return;
    }

    try {
      const plan = await generatePlan({
        ...formData,
        clientId: client.id,
      } as FinancialPlanInput);
      
      onOpenChange(false);
      // Navigate to financial plans page to view the generated plan
      navigate("/financial-plans");
    } catch (error) {
      console.error('Failed to generate plan:', error);
    }
  };

  const handleInputChange = (field: keyof FinancialPlanInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span>Create Financial Plan</span>
          </DialogTitle>
          <DialogDescription>
            Generate an AI-powered financial plan for {client.first_name} {client.last_name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="plan-name">Plan Name</Label>
            <Input 
              id="plan-name" 
              placeholder={`${client.first_name}'s Financial Plan`}
              value={formData.planName}
              onChange={(e) => handleInputChange('planName', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="plan-type">Plan Type</Label>
            <Select onValueChange={(value: any) => handleInputChange('planType', value)}>
              <SelectTrigger id="plan-type">
                <SelectValue placeholder="Select plan type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="comprehensive">Comprehensive Financial Plan</SelectItem>
                <SelectItem value="retirement">Retirement Planning</SelectItem>
                <SelectItem value="education">Education Planning</SelectItem>
                <SelectItem value="tax">Tax Planning</SelectItem>
                <SelectItem value="insurance">Insurance Planning</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <Select onValueChange={(value: any) => handleInputChange('template', value)}>
              <SelectTrigger id="template">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Report</SelectItem>
                <SelectItem value="detailed">Detailed Analysis</SelectItem>
                <SelectItem value="executive">Executive Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="time-horizon">Time Horizon (Years)</Label>
              <Input 
                id="time-horizon" 
                type="number"
                placeholder="10"
                value={formData.timeHorizon}
                onChange={(e) => handleInputChange('timeHorizon', parseInt(e.target.value) || 10)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
              <Select onValueChange={(value: any) => handleInputChange('riskTolerance', value)}>
                <SelectTrigger id="risk-tolerance">
                  <SelectValue placeholder="Risk level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conservative">Conservative</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleGeneratePlan} 
            disabled={isGenerating || !formData.planName}
            className="min-w-[140px]"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Generate Plan
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
