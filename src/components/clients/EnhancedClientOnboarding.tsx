
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
import { Plus } from "lucide-react";
import { ClientBasicInfo } from "./onboarding/ClientBasicInfo";
import { ClientFinancialInfo } from "./onboarding/ClientFinancialInfo";
import { ClientGoalsInfo } from "./onboarding/ClientGoalsInfo";
import { OnboardingProgress } from "./onboarding/OnboardingProgress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface EnhancedClientOnboardingProps {
  onClientAdded: () => void;
}

export interface ClientFormData {
  // Basic Info
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  pan?: string;
  aadhaar?: string;
  
  // Financial Info
  monthly_income: number;
  additional_income: number;
  monthly_expenses: number;
  total_assets: number;
  total_liabilities: number;
  emergency_fund: number;
  
  // Goals & Risk Profile
  financial_goals: string[];
  risk_tolerance: string;
  investment_horizon: string;
  investment_knowledge: string;
}

export const EnhancedClientOnboarding = ({ onClientAdded }: EnhancedClientOnboardingProps) => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<ClientFormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    pan: "",
    aadhaar: "",
    monthly_income: 0,
    additional_income: 0,
    monthly_expenses: 0,
    total_assets: 0,
    total_liabilities: 0,
    emergency_fund: 0,
    financial_goals: [],
    risk_tolerance: "",
    investment_horizon: "",
    investment_knowledge: "",
  });

  const updateFormData = (updates: Partial<ClientFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Create client record
      const { data: clientData, error: clientError } = await supabase
        .from("clients")
        .insert([{
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        }])
        .select()
        .single();

      if (clientError) throw clientError;

      // Create financial data record
      const { error: financialError } = await supabase
        .from("client_financial_data")
        .insert([{
          client_id: clientData.id,
          monthly_income: formData.monthly_income,
          additional_income: formData.additional_income,
          monthly_expenses: formData.monthly_expenses,
          total_assets: formData.total_assets,
          total_liabilities: formData.total_liabilities,
          emergency_fund: formData.emergency_fund,
        }]);

      if (financialError) throw financialError;

      // Create risk profile
      const riskScore = calculateRiskScore(formData);
      const { error: riskError } = await supabase
        .from("risk_profiles")
        .insert([{
          client_id: clientData.id,
          risk_tolerance: formData.risk_tolerance,
          investment_horizon: formData.investment_horizon,
          investment_knowledge: formData.investment_knowledge,
          market_volatility: "moderate", // Default for now
          portfolio_loss: "10-20%", // Default for now
          risk_tolerance_score: riskScore,
          risk_profile: getRiskProfile(riskScore),
        }]);

      if (riskError) throw riskError;

      toast({
        title: "Client onboarded successfully",
        description: `${formData.first_name} ${formData.last_name} has been added with complete financial profile`,
      });

      // Reset form and close dialog
      setOpen(false);
      setCurrentStep(1);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        pan: "",
        aadhaar: "",
        monthly_income: 0,
        additional_income: 0,
        monthly_expenses: 0,
        total_assets: 0,
        total_liabilities: 0,
        emergency_fund: 0,
        financial_goals: [],
        risk_tolerance: "",
        investment_horizon: "",
        investment_knowledge: "",
      });
      
      onClientAdded();
    } catch (error: any) {
      toast({
        title: "Error onboarding client",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateRiskScore = (data: ClientFormData): number => {
    let score = 0;
    
    // Risk tolerance scoring
    switch (data.risk_tolerance) {
      case "conservative": score += 1; break;
      case "moderate": score += 2; break;
      case "aggressive": score += 3; break;
    }
    
    // Investment horizon scoring
    switch (data.investment_horizon) {
      case "short": score += 1; break;
      case "medium": score += 2; break;
      case "long": score += 3; break;
    }
    
    // Investment knowledge scoring
    switch (data.investment_knowledge) {
      case "beginner": score += 1; break;
      case "intermediate": score += 2; break;
      case "advanced": score += 3; break;
    }
    
    return score;
  };

  const getRiskProfile = (score: number): string => {
    if (score <= 4) return "Conservative";
    if (score <= 7) return "Moderate";
    return "Aggressive";
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ClientBasicInfo
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <ClientFinancialInfo
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <ClientGoalsInfo
            formData={formData}
            updateFormData={updateFormData}
            onPrev={prevStep}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Add New Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Complete client onboarding with financial profile for AI-powered plan generation
          </DialogDescription>
        </DialogHeader>
        
        <OnboardingProgress currentStep={currentStep} totalSteps={3} />
        
        <div className="mt-6">
          {renderCurrentStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
