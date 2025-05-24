
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

  const handleComplete = () => {
    onComplete(clientData);
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
