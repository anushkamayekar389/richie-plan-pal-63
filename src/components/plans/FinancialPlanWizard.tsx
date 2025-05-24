
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, FileText, Download, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useFinancialPlanGenerator } from "@/hooks/use-financial-plan-generator";
import { PlanCustomizationStep } from "./wizard/PlanCustomizationStep";
import { PlanExportStep } from "./wizard/PlanExportStep";

interface FinancialPlanWizardProps {
  clientName: string;
  clientId: string;
  onClose: () => void;
}

const wizardSteps = [
  { id: 1, title: "Generate Plan", description: "AI generates your financial plan" },
  { id: 2, title: "Customize", description: "Review and customize sections" },
  { id: 3, title: "Export & Brand", description: "Finalize and export plan" }
];

export function FinancialPlanWizard({ clientName, clientId, onClose }: FinancialPlanWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [planCustomizations, setPlanCustomizations] = useState<any>({});
  const { generatePlan, generatedPlan, isGenerating } = useFinancialPlanGenerator();

  const progress = (currentStep / wizardSteps.length) * 100;

  const handleGeneratePlan = async () => {
    const planInput = {
      clientId,
      planName: `Comprehensive Financial Plan - ${clientName}`,
      planType: 'comprehensive' as const,
      template: 'detailed' as const,
      timeHorizon: 10,
      riskTolerance: 'moderate' as const
    };

    try {
      await generatePlan(planInput);
      setCurrentStep(2);
    } catch (error) {
      console.error('Failed to generate plan:', error);
    }
  };

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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <FileText className="w-16 h-16 mx-auto text-primary" />
              <h3 className="text-xl font-semibold">Ready to Generate Financial Plan</h3>
              <p className="text-gray-600">
                Our AI will analyze {clientName}'s profile and create a comprehensive, 
                SEBI/FPSB-compliant financial plan including:
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {[
                "Net Worth Analysis",
                "Emergency Corpus",
                "Insurance Review",
                "Retirement Planning",
                "Cash Flow Forecast",
                "Goal Mapping",
                "Tax Efficiency",
                "Investment Strategy"
              ].map((feature) => (
                <Badge key={feature} variant="outline" className="p-2">
                  {feature}
                </Badge>
              ))}
            </div>

            <Button 
              onClick={handleGeneratePlan} 
              disabled={isGenerating}
              size="lg"
              className="w-full md:w-auto"
            >
              {isGenerating ? "Generating Plan..." : `Generate Plan for ${clientName}`}
            </Button>
          </div>
        );

      case 2:
        return generatedPlan ? (
          <PlanCustomizationStep 
            plan={generatedPlan}
            customizations={planCustomizations}
            onCustomizationChange={setPlanCustomizations}
          />
        ) : null;

      case 3:
        return generatedPlan ? (
          <PlanExportStep 
            plan={generatedPlan}
            customizations={planCustomizations}
            clientName={clientName}
          />
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardTitle>Financial Plan for {clientName}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Step {currentStep} of {wizardSteps.length}: {wizardSteps[currentStep - 1]?.title}</span>
            </div>
            <Progress value={progress} className="w-full" />
            <div className="flex justify-between text-xs text-gray-400">
              {wizardSteps.map((step) => (
                <span key={step.id} className={currentStep >= step.id ? "text-primary" : ""}>
                  {step.description}
                </span>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {renderCurrentStep()}
          
          {currentStep > 1 && (
            <div className="flex justify-between pt-6 border-t">
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
                <Button onClick={handleNext}>
                  Next
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
