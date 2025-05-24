
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from "lucide-react";

interface DataItem {
  label: string;
  value: string;
  complete: boolean;
  critical: boolean;
}

interface DataSection {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  items: DataItem[];
}

interface DataSectionCardProps {
  section: DataSection;
}

export function DataSectionCard({ section }: DataSectionCardProps) {
  const Icon = section.icon;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-base">
          <Icon className="w-5 h-5" />
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
  );
}
