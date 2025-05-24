
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, FileText, User, TrendingUp, Shield } from "lucide-react";
import { type Client } from "@/hooks/use-clients";

interface PlanGenerationFlowProps {
  client: Client;
  onCreatePlan: () => void;
}

export const PlanGenerationFlow = ({ client, onCreatePlan }: PlanGenerationFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Client Profile",
      description: "Review client information",
      icon: User,
      status: "completed"
    },
    {
      id: 2,
      title: "Financial Data",
      description: "Analyze financial position",
      icon: TrendingUp,
      status: "current"
    },
    {
      id: 3,
      title: "Risk Assessment",
      description: "Evaluate risk tolerance",
      icon: Shield,
      status: "pending"
    },
    {
      id: 4,
      title: "Plan Generation",
      description: "Create comprehensive plan",
      icon: FileText,
      status: "pending"
    }
  ];

  const clientDataAvailable = {
    basicInfo: true,
    financialData: false, // This would come from your client financial data
    riskProfile: false,
    goals: false
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-primary" />
            <span>Financial Plan Generation</span>
          </CardTitle>
          <CardDescription>
            AI-powered plan generation for {client.first_name} {client.last_name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  step.status === 'completed' ? 'bg-green-100 text-green-600' :
                  step.status === 'current' ? 'bg-blue-100 text-blue-600' :
                  'bg-gray-100 text-gray-400'
                }`}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : step.status === 'current' ? (
                    <Clock className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                </div>
                <h3 className="font-medium text-sm">{step.title}</h3>
                <p className="text-xs text-gray-500">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gray-200 transform translate-x-6" />
                )}
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="font-medium">Data Readiness Check</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Basic Information</span>
                <Badge variant={clientDataAvailable.basicInfo ? "default" : "secondary"}>
                  {clientDataAvailable.basicInfo ? "Complete" : "Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Financial Data</span>
                <Badge variant={clientDataAvailable.financialData ? "default" : "secondary"}>
                  {clientDataAvailable.financialData ? "Complete" : "Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Risk Profile</span>
                <Badge variant={clientDataAvailable.riskProfile ? "default" : "secondary"}>
                  {clientDataAvailable.riskProfile ? "Complete" : "Missing"}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Goals & Objectives</span>
                <Badge variant={clientDataAvailable.goals ? "default" : "secondary"}>
                  {clientDataAvailable.goals ? "Complete" : "Missing"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <Button variant="outline">
              Complete Client Profile
            </Button>
            <Button onClick={onCreatePlan}>
              Generate Financial Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
