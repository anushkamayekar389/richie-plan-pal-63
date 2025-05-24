import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, User, DollarSign, Target, Shield } from "lucide-react";
import { type Client } from "@/hooks/use-clients";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { DataCompletionCard } from "./components/DataCompletionCard";
import { DataSectionCard } from "./components/DataSectionCard";
import { FinancialDataActions } from "./components/FinancialDataActions";
import { 
  calculateCompletionScore, 
  canProceedWithPlan, 
  getMissingCriticalFields, 
  getMissingImportantFields 
} from "./utils/ClientDataCalculations";

interface ClientDataReviewProps {
  client: Client;
  onDataComplete: (complete: boolean) => void;
}

export function ClientDataReview({ client, onDataComplete }: ClientDataReviewProps) {
  const [completionScore, setCompletionScore] = useState(0);
  const queryClient = useQueryClient();

  // Fetch client's financial data with improved error handling
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
    retry: 1
  });

  // Fetch client's risk profile
  const { data: riskProfile, isLoading: riskLoading } = useQuery({
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
          return null;
        }
        return data;
      } catch (error) {
        console.error('Error fetching risk profile:', error);
        return null;
      }
    },
    retry: 1
  });

  // Mutation to create financial data record
  const createFinancialDataMutation = useMutation({
    mutationFn: async (clientId: string) => {
      const defaultData = {
        client_id: clientId,
        monthly_income: 50000,
        monthly_expenses: 30000,
        total_assets: 100000,
        total_liabilities: 20000,
        emergency_fund: 30000,
        additional_income: 0
      };

      const { data, error } = await supabase
        .from('client_financial_data')
        .insert(defaultData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-financial-data', client.id] });
      toast({
        title: "Financial data created",
        description: "Default financial data has been created for this client",
      });
    },
    onError: (error) => {
      console.error('Error creating financial data:', error);
      toast({
        title: "Error",
        description: "Failed to create financial data",
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    if (financialLoading || riskLoading) return;
    
    const score = calculateCompletionScore(client, financialData, riskProfile);
    setCompletionScore(score);
    
    const canProceed = canProceedWithPlan(client, score);
    onDataComplete(canProceed);
  }, [client, financialData, riskProfile, onDataComplete, financialLoading, riskLoading]);

  const handleCreateFinancialData = () => {
    createFinancialDataMutation.mutate(client.id);
  };

  const handleProceedAnyway = () => {
    onDataComplete(true);
    toast({
      title: "Proceeding with available data",
      description: "The plan will be generated with your current information",
    });
  };

  // Handle loading states
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

  const missingCriticalFields = getMissingCriticalFields(dataCompleteness);
  const missingImportantFields = getMissingImportantFields(dataCompleteness);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Client Data Review</h3>
        <div className="flex items-center space-x-2">
          <Badge variant={completionScore >= 50 ? "default" : completionScore >= 30 ? "secondary" : "destructive"}>
            {completionScore}% Complete
          </Badge>
          {completionScore >= 50 ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : completionScore >= 30 ? (
            <CheckCircle className="w-5 h-5 text-yellow-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
        </div>
      </div>

      <FinancialDataActions
        hasFinancialData={!!financialData}
        onCreateFinancialData={handleCreateFinancialData}
        onProceedAnyway={handleProceedAnyway}
        isCreating={createFinancialDataMutation.isPending}
      />

      <DataCompletionCard
        completionScore={completionScore}
        missingCriticalFields={missingCriticalFields}
        missingImportantFields={missingImportantFields}
        onCreateFinancialData={handleCreateFinancialData}
        onProceedAnyway={handleProceedAnyway}
        isCreatingFinancialData={createFinancialDataMutation.isPending}
      />

      <div className="grid gap-4">
        {dataCompleteness.map((section, index) => (
          <DataSectionCard key={index} section={section} />
        ))}
      </div>
    </div>
  );
}
