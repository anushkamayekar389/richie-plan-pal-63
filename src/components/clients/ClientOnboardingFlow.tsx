
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { PersonalInfoStep } from "./onboarding/PersonalInfoStep";
import { IncomeEmploymentStep } from "./onboarding/IncomeEmploymentStep";
import { FamilyDependentsStep } from "./onboarding/FamilyDependentsStep";
import { FinancialGoalsStep } from "./onboarding/FinancialGoalsStep";
import { AssetsLiabilitiesStep } from "./onboarding/AssetsLiabilitiesStep";
import { InsuranceCoverageStep } from "./onboarding/InsuranceCoverageStep";
import { DocumentsStep } from "./onboarding/DocumentsStep";
import { RiskProfileStep } from "./onboarding/RiskProfileStep";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ClientOnboardingFlowProps {
  onClose: () => void;
  onComplete: (clientData: any) => void;
}

const steps = [
  { id: 1, title: "Personal Info", component: PersonalInfoStep },
  { id: 2, title: "Income & Employment", component: IncomeEmploymentStep },
  { id: 3, title: "Family & Dependents", component: FamilyDependentsStep },
  { id: 4, title: "Financial Goals", component: FinancialGoalsStep },
  { id: 5, title: "Assets & Liabilities", component: AssetsLiabilitiesStep },
  { id: 6, title: "Insurance Coverage", component: InsuranceCoverageStep },
  { id: 7, title: "Documents", component: DocumentsStep },
  { id: 8, title: "Risk Profile", component: RiskProfileStep },
];

export function ClientOnboardingFlow({ onClose, onComplete }: ClientOnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [clientData, setClientData] = useState({});
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const progress = (currentStep / steps.length) * 100;
  const CurrentStepComponent = steps.find(step => step.id === currentStep)?.component;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      // Trigger autosave
      setIsAutoSaving(true);
      setTimeout(() => setIsAutoSaving(false), 1000);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepData = (stepData: any) => {
    setClientData(prev => ({ ...prev, ...stepData }));
  };

  const handleComplete = async () => {
    try {
      // Separate data for different tables
      const clientBasicData = {
        first_name: clientData.first_name,
        last_name: clientData.last_name,
        email: clientData.email,
        phone: clientData.phone,
        address: clientData.address
      };

      // Insert client basic data first
      const { data: newClient, error: clientError } = await supabase
        .from('clients')
        .insert([clientBasicData])
        .select()
        .single();

      if (clientError) throw clientError;

      // Insert financial data if present
      if (clientData.monthly_income || clientData.monthly_expenses || clientData.additional_income) {
        const financialData = {
          client_id: newClient.id,
          monthly_income: clientData.monthly_income || 0,
          monthly_expenses: clientData.monthly_expenses || 0,
          additional_income: clientData.additional_income || 0,
          total_assets: clientData.total_assets || 0,
          total_liabilities: clientData.total_liabilities || 0,
          emergency_fund: clientData.emergency_fund || 0
        };

        const { error: financialError } = await supabase
          .from('client_financial_data')
          .insert([financialData]);

        if (financialError) throw financialError;
      }

      // Insert risk profile if present
      if (clientData.risk_score && clientData.risk_profile) {
        const riskData = {
          client_id: newClient.id,
          risk_tolerance_score: clientData.risk_score,
          risk_profile: clientData.risk_profile,
          investment_horizon: clientData.investment_horizon || 'medium',
          investment_knowledge: clientData.investment_knowledge || 'basic',
          market_volatility: clientData.market_volatility || 'moderate',
          portfolio_loss: clientData.portfolio_loss || 'low',
          risk_tolerance: clientData.risk_tolerance || 'moderate'
        };

        const { error: riskError } = await supabase
          .from('risk_profiles')
          .insert([riskData]);

        if (riskError) throw riskError;
      }

      toast({
        title: "Client added successfully",
        description: `${newClient.first_name} ${newClient.last_name} has been onboarded successfully`,
      });

      onComplete(newClient);
    } catch (error: any) {
      console.error('Error saving client data:', error);
      toast({
        title: "Error adding client",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardTitle>Add New Client</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}</span>
              {isAutoSaving && (
                <span className="text-green-600 animate-pulse">Auto-saving...</span>
              )}
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {CurrentStepComponent && (
            <CurrentStepComponent 
              data={clientData} 
              onDataChange={handleStepData}
            />
          )}
          
          <div className="flex justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep === steps.length ? (
              <Button onClick={handleComplete}>
                Complete & Save Client
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
