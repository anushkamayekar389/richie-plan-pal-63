
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Plus } from "lucide-react";

interface DataCompletionCardProps {
  completionScore: number;
  missingCriticalFields: any[];
  missingImportantFields: any[];
  onCreateFinancialData: () => void;
  onProceedAnyway: () => void;
  isCreatingFinancialData: boolean;
}

export function DataCompletionCard({
  completionScore,
  missingCriticalFields,
  missingImportantFields,
  onCreateFinancialData,
  onProceedAnyway,
  isCreatingFinancialData
}: DataCompletionCardProps) {
  if (completionScore < 30 && missingCriticalFields.length > 0) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <p className="text-sm font-medium text-red-800">
                Some essential information is missing
              </p>
            </div>
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
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={onCreateFinancialData}>
                <Plus className="w-3 h-3 mr-1" />
                Add Financial Data
              </Button>
              <Button size="sm" variant="destructive" onClick={onProceedAnyway}>
                Proceed Anyway
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (completionScore < 70) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Ready for basic plan generation. Additional data can improve plan quality.
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
    );
  }

  return (
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
  );
}
