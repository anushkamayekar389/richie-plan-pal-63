
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { type AdvancedOptionsData } from "../EnhancedPlanWizard";

interface AdvancedOptionsProps {
  options: AdvancedOptionsData;
  onChange: (options: AdvancedOptionsData) => void;
}

const stressTestOptions = [
  "Market Crash (-30% equity)",
  "Economic Recession",
  "Job Loss (6 months)",
  "Medical Emergency (₹10L)",
  "Interest Rate Spike (+3%)",
  "Currency Devaluation",
  "Inflation Surge (+5%)"
];

export function AdvancedOptions({ options, onChange }: AdvancedOptionsProps) {
  const updateOptions = (updates: Partial<AdvancedOptionsData>) => {
    onChange({ ...options, ...updates });
  };

  const toggleStressTest = (scenario: string) => {
    const newScenarios = options.stressTestScenarios.includes(scenario)
      ? options.stressTestScenarios.filter(s => s !== scenario)
      : [...options.stressTestScenarios, scenario];
    updateOptions({ stressTestScenarios: newScenarios });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Advanced Options</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monte Carlo Simulation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="iterations">Number of Iterations</Label>
              <Input
                id="iterations"
                type="number"
                min="100"
                max="10000"
                step="100"
                value={options.monteCarloIterations}
                onChange={(e) => updateOptions({ 
                  monteCarloIterations: parseInt(e.target.value) || 1000 
                })}
              />
              <p className="text-xs text-gray-500">
                Higher iterations provide more accurate probability estimates (recommended: 1000+)
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="compliance"
                checked={options.complianceChecks}
                onCheckedChange={(checked) => updateOptions({ 
                  complianceChecks: !!checked 
                })}
              />
              <Label htmlFor="compliance" className="text-sm">
                Include SEBI/FPSB compliance checks
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stress Test Scenarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-gray-600 mb-3">
                Select scenarios to test plan resilience:
              </p>
              {stressTestOptions.map((scenario) => (
                <div key={scenario} className="flex items-center space-x-2">
                  <Checkbox
                    id={scenario}
                    checked={options.stressTestScenarios.includes(scenario)}
                    onCheckedChange={() => toggleStressTest(scenario)}
                  />
                  <Label htmlFor={scenario} className="text-sm font-normal">
                    {scenario}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Selected Configuration Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium">Monte Carlo Iterations: </span>
              <Badge variant="outline">{options.monteCarloIterations.toLocaleString()}</Badge>
            </div>
            
            <div>
              <span className="text-sm font-medium">Compliance Checks: </span>
              <Badge variant={options.complianceChecks ? "default" : "secondary"}>
                {options.complianceChecks ? "Enabled" : "Disabled"}
              </Badge>
            </div>

            <div>
              <span className="text-sm font-medium">Stress Test Scenarios: </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {options.stressTestScenarios.map((scenario) => (
                  <Badge key={scenario} variant="outline" className="text-xs">
                    {scenario}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
