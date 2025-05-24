
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, User, DollarSign, Target, Shield } from "lucide-react";
import { type Client } from "@/hooks/use-clients";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ClientDataReviewProps {
  client: Client;
  onDataComplete: (complete: boolean) => void;
}

export function ClientDataReview({ client, onDataComplete }: ClientDataReviewProps) {
  const [completionScore, setCompletionScore] = useState(0);

  // Fetch client's financial data
  const { data: financialData } = useQuery({
    queryKey: ['client-financial-data', client.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('client_financial_data')
        .select('*')
        .eq('client_id', client.id)
        .single();
      return data;
    }
  });

  // Fetch client's risk profile
  const { data: riskProfile } = useQuery({
    queryKey: ['risk-profile', client.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('risk_profiles')
        .select('*')
        .eq('client_id', client.id)
        .single();
      return data;
    }
  });

  // Fetch client's goals
  const { data: goals } = useQuery({
    queryKey: ['client-goals', client.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('financial_goals')
        .select('*')
        .eq('client_id', client.id);
      return data || [];
    }
  });

  useEffect(() => {
    // Calculate completion score
    let score = 0;
    const checks = [
      { condition: !!client.first_name && !!client.last_name, weight: 10 },
      { condition: !!client.email, weight: 10 },
      { condition: !!financialData?.monthly_income, weight: 20 },
      { condition: !!financialData?.monthly_expenses, weight: 20 },
      { condition: !!financialData?.total_assets, weight: 15 },
      { condition: !!riskProfile?.risk_tolerance_score, weight: 15 },
      { condition: goals && goals.length > 0, weight: 10 }
    ];

    checks.forEach(check => {
      if (check.condition) score += check.weight;
    });

    setCompletionScore(score);
    onDataComplete(score >= 80); // Require 80% completion
  }, [client, financialData, riskProfile, goals, onDataComplete]);

  const dataCompleteness = [
    {
      category: "Personal Information",
      icon: User,
      items: [
        { label: "Name", value: `${client.first_name} ${client.last_name}`, complete: !!(client.first_name && client.last_name) },
        { label: "Email", value: client.email, complete: !!client.email },
        { label: "Phone", value: client.phone || "Not provided", complete: !!client.phone },
        { label: "Address", value: client.address || "Not provided", complete: !!client.address }
      ]
    },
    {
      category: "Financial Information",
      icon: DollarSign,
      items: [
        { label: "Monthly Income", value: financialData?.monthly_income ? `₹${financialData.monthly_income.toLocaleString()}` : "Not provided", complete: !!financialData?.monthly_income },
        { label: "Monthly Expenses", value: financialData?.monthly_expenses ? `₹${financialData.monthly_expenses.toLocaleString()}` : "Not provided", complete: !!financialData?.monthly_expenses },
        { label: "Total Assets", value: financialData?.total_assets ? `₹${financialData.total_assets.toLocaleString()}` : "Not provided", complete: !!financialData?.total_assets },
        { label: "Total Liabilities", value: financialData?.total_liabilities ? `₹${financialData.total_liabilities.toLocaleString()}` : "₹0", complete: true }
      ]
    },
    {
      category: "Risk Profile",
      icon: Shield,
      items: [
        { label: "Risk Tolerance", value: riskProfile?.risk_profile || "Not assessed", complete: !!riskProfile?.risk_profile },
        { label: "Investment Horizon", value: riskProfile?.investment_horizon || "Not specified", complete: !!riskProfile?.investment_horizon },
        { label: "Risk Score", value: riskProfile?.risk_tolerance_score ? `${riskProfile.risk_tolerance_score}/10` : "Not scored", complete: !!riskProfile?.risk_tolerance_score }
      ]
    },
    {
      category: "Financial Goals",
      icon: Target,
      items: [
        { label: "Goals Defined", value: goals ? `${goals.length} goals` : "No goals", complete: goals && goals.length > 0 },
        { label: "Priority Goals", value: goals?.filter(g => g.priority === 'high').length || 0, complete: true }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Client Data Review</h3>
        <div className="flex items-center space-x-2">
          <Badge variant={completionScore >= 80 ? "default" : "destructive"}>
            {completionScore}% Complete
          </Badge>
          {completionScore >= 80 ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-yellow-500" />
          )}
        </div>
      </div>

      {completionScore < 80 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Additional client data is needed for a comprehensive financial plan. 
                Consider updating the client profile before proceeding.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {dataCompleteness.map((section, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <section.icon className="w-5 h-5" />
                <span>{section.category}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.label}:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{item.value}</span>
                      {item.complete ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
