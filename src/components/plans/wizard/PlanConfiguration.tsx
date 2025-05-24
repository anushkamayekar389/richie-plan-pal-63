
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type PlanConfigData } from "../EnhancedPlanWizard";

interface PlanConfigurationProps {
  config: PlanConfigData;
  onChange: (config: PlanConfigData) => void;
}

const goalOptions = [
  "Retirement Planning",
  "Children's Education",
  "Home Purchase",
  "Emergency Fund",
  "Tax Optimization",
  "Wealth Creation",
  "Insurance Planning",
  "Debt Management"
];

export function PlanConfiguration({ config, onChange }: PlanConfigurationProps) {
  const updateConfig = (updates: Partial<PlanConfigData>) => {
    onChange({ ...config, ...updates });
  };

  const toggleGoal = (goal: string) => {
    const newGoals = config.primaryGoals.includes(goal)
      ? config.primaryGoals.filter(g => g !== goal)
      : [...config.primaryGoals, goal];
    updateConfig({ primaryGoals: newGoals });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Plan Configuration</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plan-name">Plan Name</Label>
              <Input
                id="plan-name"
                value={config.planName}
                onChange={(e) => updateConfig({ planName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plan-type">Plan Type</Label>
              <Select
                value={config.planType}
                onValueChange={(value: any) => updateConfig({ planType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comprehensive">Comprehensive</SelectItem>
                  <SelectItem value="retirement">Retirement Focus</SelectItem>
                  <SelectItem value="education">Education Planning</SelectItem>
                  <SelectItem value="tax">Tax Optimization</SelectItem>
                  <SelectItem value="insurance">Insurance Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="template">Report Template</Label>
              <Select
                value={config.template}
                onValueChange={(value: any) => updateConfig({ template: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Report</SelectItem>
                  <SelectItem value="detailed">Detailed Analysis</SelectItem>
                  <SelectItem value="executive">Executive Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time-horizon">Time Horizon (Years)</Label>
              <Input
                id="time-horizon"
                type="number"
                min="1"
                max="50"
                value={config.timeHorizon}
                onChange={(e) => updateConfig({ timeHorizon: parseInt(e.target.value) || 10 })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Primary Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {goalOptions.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={config.primaryGoals.includes(goal)}
                    onCheckedChange={() => toggleGoal(goal)}
                  />
                  <Label htmlFor={goal} className="text-sm font-normal">
                    {goal}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Economic Assumptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="inflation">Inflation Rate (%)</Label>
              <Input
                id="inflation"
                type="number"
                step="0.1"
                value={config.inflationRate}
                onChange={(e) => updateConfig({ inflationRate: parseFloat(e.target.value) || 6 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="equity-return">Equity Returns (%)</Label>
              <Input
                id="equity-return"
                type="number"
                step="0.1"
                value={config.expectedReturns.equity}
                onChange={(e) => updateConfig({
                  expectedReturns: { ...config.expectedReturns, equity: parseFloat(e.target.value) || 12 }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="debt-return">Debt Returns (%)</Label>
              <Input
                id="debt-return"
                type="number"
                step="0.1"
                value={config.expectedReturns.debt}
                onChange={(e) => updateConfig({
                  expectedReturns: { ...config.expectedReturns, debt: parseFloat(e.target.value) || 7 }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gold-return">Gold Returns (%)</Label>
              <Input
                id="gold-return"
                type="number"
                step="0.1"
                value={config.expectedReturns.gold}
                onChange={(e) => updateConfig({
                  expectedReturns: { ...config.expectedReturns, gold: parseFloat(e.target.value) || 8 }
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tax Assumptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="income-tax">Income Tax Rate (%)</Label>
              <Input
                id="income-tax"
                type="number"
                step="0.1"
                value={config.taxAssumptions.incomeTaxRate}
                onChange={(e) => updateConfig({
                  taxAssumptions: { ...config.taxAssumptions, incomeTaxRate: parseFloat(e.target.value) || 30 }
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="capital-gains">Capital Gains Tax (%)</Label>
              <Input
                id="capital-gains"
                type="number"
                step="0.1"
                value={config.taxAssumptions.capitalGainsTax}
                onChange={(e) => updateConfig({
                  taxAssumptions: { ...config.taxAssumptions, capitalGainsTax: parseFloat(e.target.value) || 20 }
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
