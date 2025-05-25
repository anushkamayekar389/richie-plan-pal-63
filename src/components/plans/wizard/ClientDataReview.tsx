
import { useEffect, useState } from "react";
import { type Client } from "@/hooks/use-clients";
import { toast } from "@/hooks/use-toast";
import { DataCompletionCard } from "./components/DataCompletionCard";
import { DataSectionCard } from "./components/DataSectionCard";
import { FinancialDataActions } from "./components/FinancialDataActions";
import { ClientDataLoading } from "./components/ClientDataLoading";
import { ClientDataHeader } from "./components/ClientDataHeader";
import { useDataCompleteness } from "./components/ClientDataCompleteness";
import { useClientDataFetching } from "./hooks/useClientDataFetching";
import { useFinancialDataMutation } from "./hooks/useFinancialDataMutation";
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

  // Use custom hooks for data fetching and mutations
  const { financialData, riskProfile, isLoading } = useClientDataFetching(client);
  const createFinancialDataMutation = useFinancialDataMutation(client.id);

  // Get data completeness structure
  const dataCompleteness = useDataCompleteness(client, financialData, riskProfile);

  useEffect(() => {
    if (isLoading) return;
    
    const score = calculateCompletionScore(client, financialData, riskProfile);
    setCompletionScore(score);
    
    const canProceed = canProceedWithPlan(client, score);
    onDataComplete(canProceed);
  }, [client, financialData, riskProfile, onDataComplete, isLoading]);

  const handleCreateFinancialData = () => {
    console.log('User requested to create financial data for client:', client.id);
    createFinancialDataMutation.mutate(client.id);
  };

  const handleProceedAnyway = () => {
    console.log('User chose to proceed without complete financial data');
    onDataComplete(true);
    toast({
      title: "Proceeding with available data",
      description: "The plan will be generated with your current information",
    });
  };

  // Handle loading states
  if (isLoading) {
    return <ClientDataLoading />;
  }

  const missingCriticalFields = getMissingCriticalFields(dataCompleteness);
  const missingImportantFields = getMissingImportantFields(dataCompleteness);

  return (
    <div className="space-y-6">
      <ClientDataHeader completionScore={completionScore} />

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
