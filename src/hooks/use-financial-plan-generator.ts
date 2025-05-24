
import { useState } from "react";
import { FinancialPlanGenerator, FinancialPlanInput, GeneratedFinancialPlan } from "@/services/financialPlanGenerator";
import { toast } from "@/hooks/use-toast";

export function useFinancialPlanGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedFinancialPlan | null>(null);
  
  const generator = new FinancialPlanGenerator();

  const generatePlan = async (input: FinancialPlanInput) => {
    try {
      setIsGenerating(true);
      console.log('Starting plan generation with input:', input);
      
      const plan = await generator.generatePlan(input);
      
      setGeneratedPlan(plan);
      
      toast({
        title: "Financial Plan Generated",
        description: `Successfully generated ${input.planType} plan for ${plan.clientName}`,
      });
      
      return plan;
    } catch (error: any) {
      console.error('Error generating financial plan:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate financial plan",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const clearPlan = () => {
    setGeneratedPlan(null);
  };

  return {
    generatePlan,
    clearPlan,
    isGenerating,
    generatedPlan
  };
}
