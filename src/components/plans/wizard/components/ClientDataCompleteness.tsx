
import { User, DollarSign, Target, Shield } from "lucide-react";
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

export function useDataCompleteness(client: Client, financialData: FinancialData | null, riskProfile: RiskProfile | null) {
  const dataCompleteness = [
    {
      category: "Personal Information",
      icon: User,
      items: [
        { label: "Name", value: `${client.first_name} ${client.last_name}`, complete: !!(client.first_name && client.last_name), critical: true },
        { label: "Email", value: client.email, complete: !!client.email, critical: true },
        { label: "Phone", value: client.phone || "Not provided", complete: !!client.phone, critical: false },
        { label: "Address", value: client.address || "Not provided", complete: !!client.address, critical: false }
      ]
    },
    {
      category: "Financial Information",
      icon: DollarSign,
      items: [
        { 
          label: "Monthly Income", 
          value: financialData?.monthly_income ? `₹${financialData.monthly_income.toLocaleString()}` : "Not provided", 
          complete: !!financialData?.monthly_income, 
          critical: true 
        },
        { 
          label: "Monthly Expenses", 
          value: financialData?.monthly_expenses ? `₹${financialData.monthly_expenses.toLocaleString()}` : "Not provided", 
          complete: !!financialData?.monthly_expenses, 
          critical: false 
        },
        { 
          label: "Total Assets", 
          value: financialData?.total_assets ? `₹${financialData.total_assets.toLocaleString()}` : "Not provided", 
          complete: !!financialData?.total_assets, 
          critical: false 
        },
        { 
          label: "Total Liabilities", 
          value: financialData?.total_liabilities ? `₹${financialData.total_liabilities.toLocaleString()}` : "₹0 (assumed)", 
          complete: true, 
          critical: false 
        }
      ]
    },
    {
      category: "Risk Profile",
      icon: Shield,
      items: [
        { label: "Risk Tolerance", value: riskProfile?.risk_profile || "Not assessed", complete: !!riskProfile?.risk_profile, critical: false },
        { label: "Investment Horizon", value: riskProfile?.investment_horizon || "Not specified", complete: !!riskProfile?.investment_horizon, critical: false },
        { label: "Risk Score", value: riskProfile?.risk_tolerance_score ? `${riskProfile.risk_tolerance_score}/10` : "Not scored", complete: !!riskProfile?.risk_tolerance_score, critical: false }
      ]
    },
    {
      category: "Planning Goals",
      icon: Target,
      items: [
        { label: "Goals Setup", value: "Ready for planning", complete: true, critical: false },
        { label: "Priority Focus", value: "To be defined in plan", complete: true, critical: false }
      ]
    }
  ];

  return dataCompleteness;
}
