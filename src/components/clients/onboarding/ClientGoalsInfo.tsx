
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { ClientFormData } from "../EnhancedClientOnboarding";
import { Loader2 } from "lucide-react";

interface ClientGoalsInfoProps {
  formData: ClientFormData;
  updateFormData: (updates: Partial<ClientFormData>) => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const financialGoalsOptions = [
  { id: "retirement", label: "Retirement Planning" },
  { id: "child_education", label: "Child's Education" },
  { id: "home_purchase", label: "Home Purchase" },
  { id: "wealth_creation", label: "Wealth Creation" },
  { id: "tax_planning", label: "Tax Planning" },
  { id: "insurance", label: "Insurance Planning" },
  { id: "emergency_fund", label: "Emergency Fund" },
  { id: "debt_management", label: "Debt Management" },
];

export const ClientGoalsInfo = ({ 
  formData, 
  updateFormData, 
  onPrev, 
  onSubmit, 
  isSubmitting 
}: ClientGoalsInfoProps) => {
  const form = useForm({
    defaultValues: {
      financial_goals: formData.financial_goals,
      risk_tolerance: formData.risk_tolerance,
      investment_horizon: formData.investment_horizon,
      investment_knowledge: formData.investment_knowledge,
    },
  });

  const handleSubmit = (values: any) => {
    updateFormData(values);
    onSubmit();
  };

  const handleGoalChange = (goalId: string, checked: boolean) => {
    const currentGoals = form.getValues("financial_goals");
    let newGoals;
    
    if (checked) {
      newGoals = [...currentGoals, goalId];
    } else {
      newGoals = currentGoals.filter(goal => goal !== goalId);
    }
    
    form.setValue("financial_goals", newGoals);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Goals & Risk Profile</h3>
        <p className="text-sm text-gray-600">Complete the profile for personalized recommendations</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-3">Financial Goals</h4>
            <p className="text-sm text-purple-700 mb-4">Select all that apply to your client:</p>
            <div className="grid grid-cols-2 gap-3">
              {financialGoalsOptions.map((goal) => (
                <div key={goal.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal.id}
                    checked={form.watch("financial_goals").includes(goal.id)}
                    onCheckedChange={(checked) => handleGoalChange(goal.id, checked as boolean)}
                  />
                  <label htmlFor={goal.id} className="text-sm text-gray-700 cursor-pointer">
                    {goal.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-3">Risk Assessment</h4>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="risk_tolerance"
                rules={{ required: "Risk tolerance is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk Tolerance *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select risk tolerance" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="conservative">Conservative - Safety first</SelectItem>
                        <SelectItem value="moderate">Moderate - Balanced approach</SelectItem>
                        <SelectItem value="aggressive">Aggressive - Growth focused</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="investment_horizon"
                rules={{ required: "Investment horizon is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Horizon *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select investment timeline" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="short">Short term (1-3 years)</SelectItem>
                        <SelectItem value="medium">Medium term (3-7 years)</SelectItem>
                        <SelectItem value="long">Long term (7+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="investment_knowledge"
                rules={{ required: "Investment knowledge is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Knowledge *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select knowledge level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner - Limited knowledge</SelectItem>
                        <SelectItem value="intermediate">Intermediate - Some experience</SelectItem>
                        <SelectItem value="advanced">Advanced - Experienced investor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onPrev}>
              Previous
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Complete Onboarding
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
