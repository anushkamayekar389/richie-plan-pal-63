
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Plus } from "lucide-react";

interface FinancialDataActionsProps {
  hasFinancialData: boolean;
  onCreateFinancialData: () => void;
  onProceedAnyway: () => void;
  isCreating: boolean;
}

export function FinancialDataActions({
  hasFinancialData,
  onCreateFinancialData,
  onProceedAnyway,
  isCreating
}: FinancialDataActionsProps) {
  if (!hasFinancialData) {
    return (
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <p className="text-sm font-medium text-blue-800">
                No detailed financial data found. Would you like to create a financial profile?
              </p>
            </div>
            <Button 
              size="sm" 
              onClick={onCreateFinancialData}
              disabled={isCreating}
            >
              <Plus className="w-3 h-3 mr-1" />
              {isCreating ? "Creating..." : "Create Financial Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gray-200">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Ready to proceed with current data?
          </p>
          <Button variant="outline" onClick={onProceedAnyway}>
            Proceed to Plan Generation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
