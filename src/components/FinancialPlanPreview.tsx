
import { GeneratedFinancialPlan } from "@/services/financialPlanGenerator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Download, Share2, TrendingUp } from "lucide-react";

interface FinancialPlanPreviewProps {
  plan: GeneratedFinancialPlan;
  onDownload?: () => void;
  onShare?: () => void;
}

export function FinancialPlanPreview({ plan, onDownload, onShare }: FinancialPlanPreviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-primary" />
              <CardTitle>{plan.planName}</CardTitle>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={onShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm" onClick={onDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
          <CardDescription>
            Generated for {plan.clientName} on {new Date(plan.generatedDate).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                ₹{plan.summary.currentNetWorth.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Current Net Worth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                ₹{plan.summary.projectedNetWorth.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Projected Net Worth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                ₹{plan.summary.monthlyInvestment.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Monthly Investment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {plan.summary.riskScore}/10
              </div>
              <div className="text-sm text-gray-500">Risk Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {plan.sections.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>{section.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{section.content}</p>
            {section.recommendations.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Recommendations:</h4>
                <ul className="space-y-1">
                  {section.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Badge variant="outline" className="mt-0.5">•</Badge>
                      <span className="text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
