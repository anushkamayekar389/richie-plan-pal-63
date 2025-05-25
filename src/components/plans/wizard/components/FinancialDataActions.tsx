
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Plus, CheckCircle } from "lucide-react";

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
            <div className="text-xs text-blue-600 bg-blue-100 p-2 rounded">
              This will create default financial data that you can customize later.
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                onClick={onCreateFinancialData}
                disabled={isCreating}
              >
                <Plus className="w-3 h-3 mr-1" />
                {isCreating ? "Creating..." : "Create Financial Profile"}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onProceedAnyway}
                disabled={isCreating}
              >
                Proceed Without
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 bg-green-50">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              Financial data is available
            </p>
          </div>
          <Button variant="outline" onClick={onProceedAnyway}>
            Proceed to Plan Generation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
