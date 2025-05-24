
import { type Client } from "@/hooks/use-clients";

interface FinancialData {
  monthly_income?: number;
  monthly_expenses?: number;
  total_assets?: number;
  total_liabilities?: number;
}

interface RiskProfile {
  risk_profile?: string;
  investment_horizon?: string;
  risk_tolerance_score?: number;
}

export function calculateCompletionScore(
  client: Client,
  financialData: FinancialData | null,
  riskProfile: RiskProfile | null
): number {
  let score = 0;
  const checks = [
    { condition: !!(client.first_name && client.last_name), weight: 20 },
    { condition: !!client.email, weight: 20 },
    { condition: !!client.phone, weight: 10 },
    { condition: !!client.address, weight: 10 },
    { condition: !!financialData?.monthly_income, weight: 25 },
    { condition: !!financialData?.monthly_expenses, weight: 10 },
    { condition: !!financialData?.total_assets, weight: 5 }
  ];

  checks.forEach(check => {
    if (check.condition) score += check.weight;
  });

  return score;
}

export function canProceedWithPlan(
  client: Client,
  completionScore: number
): boolean {
  const hasBasicData = !!(client.first_name && client.email);
  return Boolean(completionScore >= 30 || hasBasicData);
}

export function getMissingCriticalFields(dataCompleteness: any[]): any[] {
  return dataCompleteness.flatMap(section => 
    section.items.filter((item: any) => item.critical && !item.complete)
  );
}

export function getMissingImportantFields(dataCompleteness: any[]): any[] {
  return dataCompleteness.flatMap(section => 
    section.items.filter((item: any) => !item.critical && !item.complete)
  );
}
