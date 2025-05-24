
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, CheckCircle, User, DollarSign, Target, Shield, Edit, Loader, Info } from "lucide-react";
import { type Client } from "@/hooks/use-clients";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ClientDataReviewProps {
  client: Client;
  onDataComplete: (complete: boolean) => void;
}

export function ClientDataReview({ client, onDataComplete }: ClientDataReviewProps) {
  const [completionScore, setCompletionScore] = useState(0);
  const [showQuickEntry, setShowQuickEntry] = useState(false);
  const [quickEntryData, setQuickEntryData] = useState({
    monthly_income: '',
    monthly_expenses: '',
    total_assets: ''
  });

  const queryClient = useQueryClient();

  // Fetch client's financial data
  const { data: financialData, isLoading: financialLoading, error: financialError } = useQuery({
    queryKey: ['client-financial-data', client.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_financial_data')
        .select('*')
        .eq('client_id', client.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      return data;
    }
  });

  // Fetch client's risk profile
  const { data: riskProfile, isLoading: riskLoading, error: riskError } = useQuery({
    queryKey: ['risk-profile', client.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('risk_profiles')
        .select('*')
        .eq('client_id', client.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      return data;
    }
  });

  // Mutation to save quick entry data
  const saveFinancialDataMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from('client_financial_data')
        .upsert({
          client_id: client.id,
          monthly_income: Number(data.monthly_income) || 0,
          monthly_expenses: Number(data.monthly_expenses) || 0,
          total_assets: Number(data.total_assets) || 0,
          total_liabilities: 0,
          emergency_fund: 0
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-financial-data', client.id] });
      setShowQuickEntry(false);
      toast({
        title: "Financial data saved",
        description: "Client financial information has been updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error saving data",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    // Calculate completion score with lower threshold
    let score = 0;
    const checks = [
      { condition: !!client.first_name && !!client.last_name, weight: 20 },
      { condition: !!client.email, weight: 20 },
      { condition: !!financialData?.monthly_income, weight: 20 },
      { condition: !!financialData?.monthly_expenses, weight: 20 },
      { condition: !!financialData?.total_assets, weight: 20 }
    ];

    checks.forEach(check => {
      if (check.condition) score += check.weight;
    });

    setCompletionScore(score);
    onDataComplete(score >= 50); // Lowered threshold to 50%
  }, [client, financialData, riskProfile, onDataComplete]);

  const handleQuickEntry = () => {
    if (quickEntryData.monthly_income || quickEntryData.monthly_expenses || quickEntryData.total_assets) {
      saveFinancialDataMutation.mutate(quickEntryData);
    }
  };

  const isLoading = financialLoading || riskLoading;
  const hasErrors = financialError || riskError;

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
      category: "Planning Goals",
      icon: Target,
      items: [
        { label: "Goals Setup", value: "Ready for planning", complete: true },
        { label: "Priority Focus", value: "To be defined in plan", complete: true }
      ]
    }
  ];

  const missingData = dataCompleteness
    .flatMap(section => section.items.filter(item => !item.complete))
    .map(item => item.label);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center space-x-2">
          <Loader className="w-5 h-5 animate-spin" />
          <span>Loading client data...</span>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
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
              <Tooltip>
                <TooltipTrigger>
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Missing: {missingData.join(', ')}</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {hasErrors && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-800">
                  Error loading client data. Some information may not be available.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {completionScore < 50 && (
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Info className="w-4 h-4 text-yellow-600" />
                  <p className="text-sm text-yellow-800">
                    Additional client data will improve plan accuracy. You can proceed or add missing information below.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowQuickEntry(!showQuickEntry)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Quick Entry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {showQuickEntry && (
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Financial Data Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="monthly_income">Monthly Income (₹)</Label>
                  <Input
                    id="monthly_income"
                    type="number"
                    placeholder="50000"
                    value={quickEntryData.monthly_income}
                    onChange={(e) => setQuickEntryData(prev => ({ ...prev, monthly_income: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="monthly_expenses">Monthly Expenses (₹)</Label>
                  <Input
                    id="monthly_expenses"
                    type="number"
                    placeholder="30000"
                    value={quickEntryData.monthly_expenses}
                    onChange={(e) => setQuickEntryData(prev => ({ ...prev, monthly_expenses: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="total_assets">Total Assets (₹)</Label>
                  <Input
                    id="total_assets"
                    type="number"
                    placeholder="500000"
                    value={quickEntryData.total_assets}
                    onChange={(e) => setQuickEntryData(prev => ({ ...prev, total_assets: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowQuickEntry(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleQuickEntry}
                  disabled={saveFinancialDataMutation.isPending}
                >
                  {saveFinancialDataMutation.isPending ? (
                    <>
                      <Loader className="w-4 h-4 mr-1 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Data'
                  )}
                </Button>
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

        {completionScore < 50 && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="pt-4">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-blue-600" />
                <p className="text-sm text-blue-800">
                  <strong>Proceeding with {completionScore}% data completion:</strong> The financial plan will use default assumptions for missing data. You can always update client information later and regenerate the plan.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
}
