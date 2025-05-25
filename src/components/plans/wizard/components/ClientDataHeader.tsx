
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle } from "lucide-react";

interface ClientDataHeaderProps {
  completionScore: number;
}

export function ClientDataHeader({ completionScore }: ClientDataHeaderProps) {
  return (
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
  );
}
