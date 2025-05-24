
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, User, DollarSign, Target, Shield, Plus } from "lucide-react";
import { type Client } from "@/hooks/use-clients";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ClientDataReviewProps {
  client: Client;
  onDataComplete: (complete: boolean) => void;
}

export function ClientDataReview({ client, onDataComplete }: ClientDataReviewProps) {
  const [completionScore, setCompletionScore] = useState(0);

  // Fetch client's financial data with error handling
  const { data: financialData, isLoading: financialLoading, error: financialError } = useQuery({
    queryKey: ['client-financial-data', client.id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('client_financial_data')
          .select('*')
          .eq('client_id', client.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Financial data query error:', error);
          throw error;
        }
        return data;
      } catch (error) {
        console.error('Error fetching financial data:', error);
        return null;
      }
    },
    retry: 2
  });

  // Fetch client's risk profile with error handling
  const { data: riskProfile, isLoading: riskLoading, error: riskError } = useQuery({
    queryKey: ['risk-profile', client.id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('risk_profiles')
          .select('*')
          .eq('client_id', client.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Risk profile query error:', error);
          throw error;
        }
        return data;
      } catch (error) {
        console.error('Error fetching risk profile:', error);
        return null;
      }
    },
    retry: 2
  });

  useEffect(() => {
    // Calculate completion score with more comprehensive checks
    let score = 0;
    const checks = [
      { condition: !!(client.first_name && client.last_name), weight: 10, label: "Full Name" },
      { condition: !!client.email, weight: 10, label: "Email" },
      { condition: !!client.phone, weight: 5, label: "Phone" },
      { condition: !!client.address, weight: 5, label: "Address" },
      { condition: !!financialData?.monthly_income, weight: 20, label: "Monthly Income" },
      { condition: !!financialData?.monthly_expenses, weight: 20, label: "Monthly Expenses" },
      { condition: !!financialData?.total_assets, weight: 15, label: "Total Assets" },
      { condition: !!financialData?.total_liabilities, weight: 10, label: "Total Liabilities" },
      { condition: !!riskProfile?.risk_profile, weight: 5, label: "Risk Profile" }
    ];

    checks.forEach(check => {
      if (check.condition) score += check.weight;
    });

    console.log('Completion score calculation:', { score, checks, client, financialData, riskProfile });
    setCompletionScore(score);
    
    // Lower threshold to 50% and allow progression with basic data
    const canProceed = score >= 50 || (client.first_name && client.email && (financialData?.monthly_income || financialData?.total_assets));
    onDataComplete(canProceed);
  }, [client, financialData, riskProfile, onDataComplete]);

  const handleAddMissingData = () => {
    toast({
      title: "Quick Data Entry",
      description: "You can add missing financial data from the client profile page",
    });
  };

  const handleProceedAnyway = () => {
    console.log('User chose to proceed with limited data');
    onDataComplete(true);
    toast({
      title: "Proceeding with available data",
      description: "The plan will be generated with your current information",
    });
  };

  // Handle loading and error states
  if (financialLoading || riskLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Loading client data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (financialError || riskError) {
    console.error('Data loading errors:', { financialError, riskError });
  }

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
        { label: "Monthly Income", value: financialData?.monthly_income ? `₹${financialData.monthly_income.toLocaleString()}` : "Not provided", complete: !!financialData?.monthly_income, critical: true },
        { label: "Monthly Expenses", value: financialData?.monthly_expenses ? `₹${financialData.monthly_expenses.toLocaleString()}` : "Not provided", complete: !!financialData?.monthly_expenses, critical: true },
        { label: "Total Assets", value: financialData?.total_assets ? `₹${financialData.total_assets.toLocaleString()}` : "Not provided", complete: !!financialData?.total_assets, critical: false },
        { label: "Total Liabilities", value: financialData?.total_liabilities ? `₹${financialData.total_liabilities.toLocaleString()}` : "₹0", complete: true, critical: false }
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

  const missingCriticalFields = dataCompleteness.flatMap(section => 
    section.items.filter(item => item.critical && !item.complete)
  );

  const missingImportantFields = dataCompleteness.flatMap(section => 
    section.items.filter(item => !item.critical && !item.complete)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Client Data Review</h3>
        <div className="flex items-center space-x-2">
          <Badge variant={completionScore >= 50 ? "default" : "destructive"}>
            {completionScore}% Complete
          </Badge>
          {completionScore >= 50 ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-yellow-500" />
          )}
        </div>
      </div>

      {completionScore < 50 ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm font-medium text-red-800">
                  Critical data missing for financial plan generation
                </p>
              </div>
              {missingCriticalFields.length > 0 && (
                <div>
                  <p className="text-xs text-red-700 mb-1">Missing critical fields:</p>
                  <div className="flex flex-wrap gap-1">
                    {missingCriticalFields.map((field, index) => (
                      <Badge key={index} variant="destructive" className="text-xs">
                        {field.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={handleAddMissingData}>
                  <Plus className="w-3 h-3 mr-1" />
                  Add Missing Data
                </Button>
                <Button size="sm" variant="destructive" onClick={handleProceedAnyway}>
                  Proceed Anyway
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : completionScore < 80 ? (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-yellow-600" />
                <p className="text-sm text-yellow-800">
                  Sufficient data available for plan generation. Additional data can improve plan quality.
                </p>
              </div>
              {missingImportantFields.length > 0 && (
                <div>
                  <p className="text-xs text-yellow-700 mb-1">Optional fields that could enhance your plan:</p>
                  <div className="flex flex-wrap gap-1">
                    {missingImportantFields.slice(0, 3).map((field, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {field.label}
                      </Badge>
                    ))}
                    {missingImportantFields.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{missingImportantFields.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-800">
                Excellent! Your client data is comprehensive and ready for detailed financial planning.
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
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{item.label}:</span>
                      {item.critical && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          Critical
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{item.value}</span>
                      {item.complete ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className={`w-4 h-4 ${item.critical ? 'text-red-500' : 'text-yellow-500'}`} />
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
