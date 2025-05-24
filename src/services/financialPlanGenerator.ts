import { supabase } from "@/integrations/supabase/client";

export interface FinancialPlanInput {
  clientId: string;
  planName: string;
  planType: 'comprehensive' | 'retirement' | 'education' | 'tax' | 'insurance';
  template: 'standard' | 'detailed' | 'executive';
  timeHorizon: number; // years
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
}

export interface FinancialPlanSection {
  title: string;
  content: string;
  recommendations: string[];
  charts?: any[];
}

export interface GeneratedFinancialPlan {
  id: string;
  planName: string;
  clientName: string;
  generatedDate: string;
  sections: FinancialPlanSection[];
  summary: {
    currentNetWorth: number;
    projectedNetWorth: number;
    monthlyInvestment: number;
    riskScore: number;
  };
}

export class FinancialPlanGenerator {
  async generatePlan(input: FinancialPlanInput): Promise<GeneratedFinancialPlan> {
    console.log('Generating financial plan for:', input);
    
    try {
      // Fetch client data
      const clientData = await this.fetchClientData(input.clientId);
      const financialData = await this.fetchFinancialData(input.clientId);
      const riskProfile = await this.fetchRiskProfile(input.clientId);

      console.log('Client data:', clientData);
      console.log('Financial data:', financialData);
      console.log('Risk profile:', riskProfile);

      // Generate plan sections based on type and template
      const sections = await this.generatePlanSections(input, clientData, financialData, riskProfile);
      
      // Calculate summary metrics
      const summary = this.calculateSummary(financialData, riskProfile, input.timeHorizon);

      return {
        id: crypto.randomUUID(),
        planName: input.planName,
        clientName: `${clientData.first_name} ${clientData.last_name}`,
        generatedDate: new Date().toISOString(),
        sections,
        summary
      };
    } catch (error) {
      console.error('Error in generatePlan:', error);
      throw new Error(`Failed to generate financial plan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async fetchClientData(clientId: string) {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single();
      
      if (error) {
        console.error('Error fetching client data:', error);
        throw new Error(`Client not found: ${error.message}`);
      }
      
      if (!data) {
        throw new Error('Client data is empty');
      }
      
      return data;
    } catch (error) {
      console.error('fetchClientData error:', error);
      throw error;
    }
  }

  private async fetchFinancialData(clientId: string) {
    const { data, error } = await supabase
      .from('client_financial_data')
      .select('*')
      .eq('client_id', clientId)
      .single();
    
    if (error) {
      // Return default data if no financial data exists
      return {
        monthly_income: 50000,
        monthly_expenses: 30000,
        total_assets: 100000,
        total_liabilities: 50000,
        emergency_fund: 30000,
        additional_income: 0
      };
    }
    return data;
  }

  private async fetchRiskProfile(clientId: string) {
    const { data, error } = await supabase
      .from('risk_profiles')
      .select('*')
      .eq('client_id', clientId)
      .single();
    
    if (error) {
      // Return default risk profile
      return {
        risk_tolerance_score: 5,
        risk_profile: 'moderate',
        investment_horizon: '10-15 years'
      };
    }
    return data;
  }

  private async generatePlanSections(
    input: FinancialPlanInput, 
    clientData: any, 
    financialData: any, 
    riskProfile: any
  ): Promise<FinancialPlanSection[]> {
    const sections: FinancialPlanSection[] = [];

    // Executive Summary
    sections.push({
      title: "Executive Summary",
      content: `This comprehensive financial plan for ${clientData.first_name} ${clientData.last_name} outlines a strategic approach to achieving financial goals over the next ${input.timeHorizon} years. Based on current financial position and ${riskProfile.risk_profile} risk tolerance, we recommend a balanced investment strategy tailored to your specific needs.`,
      recommendations: [
        "Maintain emergency fund of 6 months expenses",
        `Follow ${riskProfile.risk_profile} investment allocation strategy`,
        "Review and adjust plan annually",
        "Monitor progress quarterly"
      ]
    });

    // Current Financial Position
    const netWorth = (financialData.total_assets || 0) - (financialData.total_liabilities || 0);
    const monthlyIncome = financialData.monthly_income || 50000;
    const monthlyExpenses = financialData.monthly_expenses || 30000;
    const monthlySurplus = monthlyIncome - monthlyExpenses;
    
    sections.push({
      title: "Current Financial Position",
      content: `Your current net worth stands at ₹${netWorth.toLocaleString()}. With a monthly income of ₹${monthlyIncome.toLocaleString()} and expenses of ₹${monthlyExpenses.toLocaleString()}, you have a monthly surplus of ₹${monthlySurplus.toLocaleString()} available for investments and savings.`,
      recommendations: [
        monthlySurplus > 0 ? "Leverage positive cash flow for systematic investments" : "Focus on expense optimization to improve cash flow",
        "Build emergency fund to recommended level of 6 months expenses",
        "Consider tax-efficient investment options like ELSS and PPF",
        "Review and optimize existing investments"
      ]
    });

    // Investment Strategy
    if (input.planType === 'comprehensive' || input.planType === 'retirement') {
      sections.push({
        title: "Investment Strategy",
        content: this.generateInvestmentStrategy(riskProfile, input.timeHorizon),
        recommendations: this.getInvestmentRecommendations(riskProfile.risk_profile)
      });
    }

    // Retirement Planning
    if (input.planType === 'comprehensive' || input.planType === 'retirement') {
      sections.push({
        title: "Retirement Planning",
        content: this.generateRetirementPlan(financialData, input.timeHorizon),
        recommendations: [
          "Maximize EPF contributions for tax benefits",
          "Consider NPS for additional retirement corpus",
          "Start SIP in equity mutual funds for long-term growth",
          "Review retirement corpus requirement annually"
        ]
      });
    }

    // Tax Planning
    if (input.planType === 'comprehensive' || input.planType === 'tax') {
      sections.push({
        title: "Tax Planning",
        content: "Strategic tax planning can significantly enhance your wealth accumulation. Utilize various deductions under Section 80C, 80D, and other applicable sections to optimize your tax liability while building wealth.",
        recommendations: [
          "Maximize Section 80C deductions (₹1.5 lakh limit)",
          "Invest in ELSS mutual funds for tax-saving with growth potential",
          "Consider health insurance for Section 80D benefits",
          "Plan capital gains harvesting for tax efficiency"
        ]
      });
    }

    // Insurance Planning
    if (input.planType === 'comprehensive' || input.planType === 'insurance') {
      sections.push({
        title: "Insurance Planning",
        content: this.generateInsurancePlan(financialData),
        recommendations: [
          "Maintain life insurance cover of 10-15x annual income",
          "Ensure adequate health insurance for family",
          "Consider term insurance for cost-effective coverage",
          "Review insurance needs with life stage changes"
        ]
      });
    }

    return sections;
  }

  private generateInvestmentStrategy(riskProfile: any, timeHorizon: number): string {
    const strategies = {
      conservative: "Focus on debt instruments with 20% equity allocation for long-term growth.",
      moderate: "Balanced approach with 60% equity and 40% debt allocation.",
      aggressive: "Growth-oriented strategy with 80% equity allocation for maximum returns."
    };
    
    return `Based on your ${riskProfile.risk_profile} risk profile and ${timeHorizon}-year investment horizon, we recommend: ${strategies[riskProfile.risk_profile as keyof typeof strategies]}`;
  }

  private getInvestmentRecommendations(riskProfile: string): string[] {
    const recommendations = {
      conservative: [
        "Government bonds and fixed deposits",
        "Conservative hybrid funds",
        "Regular review of debt portfolio"
      ],
      moderate: [
        "Large-cap and mid-cap equity funds",
        "Balanced hybrid funds",
        "Systematic Investment Plans (SIPs)"
      ],
      aggressive: [
        "Small-cap and mid-cap equity funds",
        "International equity exposure",
        "Direct equity investments"
      ]
    };
    
    return recommendations[riskProfile as keyof typeof recommendations] || recommendations.moderate;
  }

  private generateRetirementPlan(financialData: any, timeHorizon: number): string {
    const currentAge = 35; // Assumed
    const retirementAge = 60;
    const yearsToRetirement = retirementAge - currentAge;
    const requiredCorpus = financialData.monthly_expenses * 12 * 25; // 25x annual expenses
    
    return `To maintain current lifestyle post-retirement, you'll need approximately ₹${requiredCorpus.toLocaleString()}. With ${yearsToRetirement} years to retirement, a monthly SIP of ₹${Math.round(requiredCorpus / (yearsToRetirement * 12)).toLocaleString()} in equity-oriented funds is recommended.`;
  }

  private generateInsurancePlan(financialData: any): string {
    const recommendedLifeCover = financialData.monthly_income * 12 * 15;
    const recommendedHealthCover = 1000000; // 10 lakhs
    
    return `Recommended life insurance cover: ₹${recommendedLifeCover.toLocaleString()}. Health insurance coverage of ₹${recommendedHealthCover.toLocaleString()} for family is advisable to protect against medical emergencies.`;
  }

  private calculateSummary(financialData: any, riskProfile: any, timeHorizon: number) {
    const currentNetWorth = financialData.total_assets - financialData.total_liabilities;
    const monthlySurplus = financialData.monthly_income - financialData.monthly_expenses;
    const annualReturn = riskProfile.risk_profile === 'aggressive' ? 0.12 : 
                        riskProfile.risk_profile === 'moderate' ? 0.10 : 0.08;
    
    // Simple compound interest calculation
    const projectedNetWorth = currentNetWorth * Math.pow(1 + annualReturn, timeHorizon) + 
                             (monthlySurplus * 12 * (Math.pow(1 + annualReturn, timeHorizon) - 1) / annualReturn);

    return {
      currentNetWorth,
      projectedNetWorth: Math.round(projectedNetWorth),
      monthlyInvestment: monthlySurplus,
      riskScore: riskProfile.risk_tolerance_score || 5
    };
  }
}
