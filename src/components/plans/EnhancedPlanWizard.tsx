
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { type Client } from "@/hooks/use-clients";
import { ClientDataReview } from "./wizard/ClientDataReview";
import { PlanConfiguration } from "./wizard/PlanConfiguration";
import { AdvancedOptions } from "./wizard/AdvancedOptions";
import { PlanGeneration } from "./wizard/PlanGeneration";

interface EnhancedPlanWizardProps {
  client: Client;
  onClose: () => void;
}

const wizardSteps = [
  { id: 1, title: "Review Client Data", description: "Verify and complete client information" },
  { id: 2, title: "Plan Configuration", description: "Set plan parameters and goals" },
  { id: 3, title: "Advanced Options", description: "Configure assumptions and scenarios" },
  { id: 4, title: "Generate Plan", description: "Create comprehensive financial plan" }
];

export interface PlanConfigData {
  planName: string;
  planType: 'comprehensive' | 'retirement' | 'education' | 'tax' | 'insurance';
  template: 'standard' | 'detailed' | 'executive';
  timeHorizon: number;
  primaryGoals: string[];
  inflationRate: number;
  expectedReturns: {
    equity: number;
    debt: number;
    gold: number;
    realEstate: number;
  };
  taxAssumptions: {
    incomeTaxRate: number;
    capitalGainsTax: number;
  };
}

export interface AdvancedOptionsData {
  monteCarloIterations: number;
  stressTestScenarios: string[];
  complianceChecks: boolean;
  customAssumptions: Record<string, any>;
}

export function EnhancedPlanWizard({ client, onClose }: EnhancedPlanWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [clientDataComplete, setClientDataComplete] = useState(false);
  const [planConfig, setPlanConfig] = useState<PlanConfigData>({
    planName: `Comprehensive Financial Plan - ${client.first_name} ${client.last_name}`,
    planType: 'comprehensive',
    template: 'detailed',
    timeHorizon: 10,
    primaryGoals: [],
    inflationRate: 6,
    expectedReturns: {
      equity: 12,
      debt: 7,
      gold: 8,
      realEstate: 10
    },
    taxAssumptions: {
      incomeTaxRate: 30,
      capitalGainsTax: 20
    }
  });
  const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptionsData>({
    monteCarloIterations: 1000,
    stressTestScenarios: ['Market Crash', 'Job Loss', 'Medical Emergency'],
    complianceChecks: true,
    customAssumptions: {}
  });

  const progress = (currentStep / wizardSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < wizardSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return clientDataComplete;
      case 2:
        return planConfig.planName && planConfig.primaryGoals.length > 0;
      case 3:
        return true;
      default:
        return true;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ClientDataReview
            client={client}
            onDataComplete={setClientDataComplete}
          />
        );
      case 2:
        return (
          <PlanConfiguration
            config={planConfig}
            onChange={setPlanConfig}
          />
        );
      case 3:
        return (
          <AdvancedOptions
            options={advancedOptions}
            onChange={setAdvancedOptions}
          />
        );
      case 4:
        return (
          <PlanGeneration
            client={client}
            config={planConfig}
            advancedOptions={advancedOptions}
            onComplete={onClose}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            Financial Plan for {client.first_name} {client.last_name}
          </h3>
          <p className="text-sm text-gray-500">
            Step {currentStep} of {wizardSteps.length}: {wizardSteps[currentStep - 1]?.title}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <Progress value={progress} className="w-full" />
        <div className="flex justify-between text-xs text-gray-400">
          {wizardSteps.map((step) => (
            <span key={step.id} className={currentStep >= step.id ? "text-primary" : ""}>
              {step.description}
            </span>
          ))}
        </div>
      </div>

      <div className="min-h-[400px]">
        {renderCurrentStep()}
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        {currentStep === wizardSteps.length ? (
          <Button onClick={onClose}>
            Complete
          </Button>
        ) : (
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
