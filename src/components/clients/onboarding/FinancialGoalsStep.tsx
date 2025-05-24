
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

interface FinancialGoalsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

export function FinancialGoalsStep({ data, onDataChange }: FinancialGoalsStepProps) {
  const [goals, setGoals] = useState(data.financial_goals || []);

  const handleChange = (field: string, value: any) => {
    const newData = { ...data, [field]: value };
    onDataChange(newData);
  };

  const addGoal = () => {
    const newGoal = {
      id: Date.now(),
      name: "",
      target_amount: "",
      timeline_years: "",
      priority: "medium",
      goal_type: ""
    };
    const newGoals = [...goals, newGoal];
    setGoals(newGoals);
    handleChange("financial_goals", newGoals);
  };

  const updateGoal = (id: number, field: string, value: any) => {
    const updatedGoals = goals.map((goal: any) => 
      goal.id === id ? { ...goal, [field]: value } : goal
    );
    setGoals(updatedGoals);
    handleChange("financial_goals", updatedGoals);
  };

  const removeGoal = (id: number) => {
    const filteredGoals = goals.filter((goal: any) => goal.id !== id);
    setGoals(filteredGoals);
    handleChange("financial_goals", filteredGoals);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Label className="text-lg font-medium">Financial Goals</Label>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Define specific financial objectives with timelines and priority levels</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Button onClick={addGoal} size="sm" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>
        </div>

        {goals.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-gray-500 text-center">No financial goals added yet. Click "Add Goal" to get started.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {goals.map((goal: any, index: number) => (
              <Card key={goal.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">Goal {index + 1}</CardTitle>
                    <Button 
                      onClick={() => removeGoal(goal.id)}
                      size="sm" 
                      variant="ghost"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Goal Name</Label>
                      <Input 
                        placeholder="e.g., Child's Education"
                        value={goal.name}
                        onChange={(e) => updateGoal(goal.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Goal Type</Label>
                      <Select 
                        value={goal.goal_type} 
                        onValueChange={(value) => updateGoal(goal.id, "goal_type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select goal type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="retirement">Retirement</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="home_purchase">Home Purchase</SelectItem>
                          <SelectItem value="vehicle">Vehicle Purchase</SelectItem>
                          <SelectItem value="vacation">Vacation</SelectItem>
                          <SelectItem value="emergency">Emergency Fund</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Target Amount (₹)</Label>
                      <Input 
                        type="number"
                        placeholder="1000000"
                        value={goal.target_amount}
                        onChange={(e) => updateGoal(goal.id, "target_amount", parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Timeline (Years)</Label>
                      <Input 
                        type="number"
                        placeholder="10"
                        value={goal.timeline_years}
                        onChange={(e) => updateGoal(goal.id, "timeline_years", parseInt(e.target.value) || 0)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select 
                        value={goal.priority} 
                        onValueChange={(value) => updateGoal(goal.id, "priority", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
