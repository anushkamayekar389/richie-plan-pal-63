
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, Share2, Sparkles } from "lucide-react";
import { type Client } from "@/hooks/use-clients";
import { type PlanConfigData, type AdvancedOptionsData } from "../EnhancedPlanWizard";
import { useFinancialPlanGenerator } from "@/hooks/use-financial-plan-generator";
import { FinancialPlanPreview } from "@/components/FinancialPlanPreview";

interface PlanGenerationProps {
  client: Client;
  config: PlanConfigData;
  advancedOptions: AdvancedOptionsData;
  onComplete: () => void;
}

export function PlanGeneration({ 
  client, 
  config, 
  advancedOptions, 
  onComplete 
}: PlanGenerationProps) {
  const [generationStep, setGenerationStep] = useState<string>("");
  const { generatePlan, isGenerating, generatedPlan } = useFinancialPlanGenerator();

  const handleGeneratePlan = async () => {
    const planInput = {
      clientId: client.id,
      planName: config.planName,
      planType: config.planType,
      template: config.template,
      timeHorizon: config.timeHorizon,
      riskTolerance: 'moderate' as const // This would come from client data
    };

    setGenerationStep("Analyzing client data...");
    
    try {
      await generatePlan(planInput);
    } catch (error) {
      console.error('Failed to generate plan:', error);
    }
  };

  const handleDownloadPDF = () => {
    console.log('Downloading comprehensive PDF...');
    // Enhanced PDF generation with all the advanced options
  };

  const handleSharePlan = () => {
    console.log('Sharing enhanced plan...');
    // Enhanced sharing functionality
  };

  if (generatedPlan) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Plan Generated Successfully</h3>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleSharePlan}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button size="sm" onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download Enhanced PDF
            </Button>
          </div>
        </div>

        <FinancialPlanPreview 
          plan={generatedPlan}
          onDownload={handleDownloadPDF}
          onShare={handleSharePlan}
        />

        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  Enhanced Financial Plan Generated
                </p>
                <p className="text-xs text-green-600">
                  Includes {config.primaryGoals.length} primary goals, 
                  {advancedOptions.stressTestScenarios.length} stress test scenarios, 
                  and {advancedOptions.monteCarloIterations.toLocaleString()} Monte Carlo simulations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Generate Comprehensive Financial Plan</h3>

      {!isGenerating ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Plan Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium">Client:</span>
                  <p className="text-sm">{client.first_name} {client.last_name}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Plan Type:</span>
                  <p className="text-sm capitalize">{config.planType}</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Time Horizon:</span>
                  <p className="text-sm">{config.timeHorizon} years</p>
                </div>
                <div>
                  <span className="text-sm font-medium">Template:</span>
                  <p className="text-sm capitalize">{config.template}</p>
                </div>
              </div>

              <div>
                <span className="text-sm font-medium">Primary Goals:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {config.primaryGoals.map((goal) => (
                    <Badge key={goal} variant="secondary" className="text-xs">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-medium">Advanced Features:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge variant="outline">
                    {advancedOptions.monteCarloIterations.toLocaleString()} Monte Carlo Simulations
                  </Badge>
                  <Badge variant="outline">
                    {advancedOptions.stressTestScenarios.length} Stress Tests
                  </Badge>
                  {advancedOptions.complianceChecks && (
                    <Badge variant="outline">SEBI/FPSB Compliant</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleGeneratePlan} className="w-full" size="lg">
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Enhanced Financial Plan
          </Button>
        </>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              </div>
              <div className="text-center">
                <h4 className="font-medium">Generating Your Comprehensive Financial Plan</h4>
                <p className="text-sm text-gray-500 mt-1">{generationStep}</p>
              </div>
              <Progress value={60} className="w-full" />
              <div className="text-xs text-gray-400 text-center">
                This may take a few moments as we analyze all your data and run simulations...
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
