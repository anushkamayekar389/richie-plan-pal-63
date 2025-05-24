
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useClients } from "@/hooks/use-clients";
import { CreatePlanDialog } from "@/components/clients/CreatePlanDialog";
import { 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus,
  ArrowRight,
  TrendingUp,
  Target,
  Shield
} from "lucide-react";

interface PlanBuilderStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  icon: any;
}

interface ClientWithPlanStatus {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  planStatus: 'no-plan' | 'in-progress' | 'completed';
  financialDataComplete: boolean;
  riskProfileComplete: boolean;
  lastPlanDate?: string;
}

export const PlanBuilderDashboard = () => {
  const [createPlanOpen, setCreatePlanOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  
  const { data: clients = [], isLoading: clientsLoading } = useClients();

  // Fetch financial data and risk profiles for clients
  const { data: clientsWithStatus = [] } = useQuery({
    queryKey: ["clients-with-plan-status"],
    queryFn: async (): Promise<ClientWithPlanStatus[]> => {
      const clientsWithStatus = await Promise.all(
        clients.map(async (client) => {
          // Check financial data
          const { data: financialData } = await supabase
            .from("client_financial_data")
            .select("*")
            .eq("client_id", client.id)
            .single();

          // Check risk profile
          const { data: riskProfile } = await supabase
            .from("risk_profiles")
            .select("*")
            .eq("client_id", client.id)
            .single();

          return {
            ...client,
            financialDataComplete: !!financialData,
            riskProfileComplete: !!riskProfile,
            planStatus: (!financialData || !riskProfile) ? 'no-plan' : 'completed'
          };
        })
      );
      return clientsWithStatus;
    },
    enabled: clients.length > 0,
  });

  const planBuilderSteps: PlanBuilderStep[] = [
    {
      id: "client-onboarding",
      title: "Client Onboarding",
      description: "Collect client information and financial data",
      status: "completed",
      icon: Users
    },
    {
      id: "financial-analysis",
      title: "Financial Analysis",
      description: "Analyze client's financial position and goals",
      status: "in-progress",
      icon: TrendingUp
    },
    {
      id: "risk-assessment",
      title: "Risk Assessment",
      description: "Evaluate risk tolerance and investment profile",
      status: "pending",
      icon: Shield
    },
    {
      id: "plan-generation",
      title: "Plan Generation",
      description: "Generate AI-powered financial plan",
      status: "pending",
      icon: FileText
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'no-plan': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'no-plan': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleCreatePlan = (client: any) => {
    setSelectedClient(client);
    setCreatePlanOpen(true);
  };

  const readyForPlanClients = clientsWithStatus.filter(
    c => c.financialDataComplete && c.riskProfileComplete && c.planStatus !== 'completed'
  );

  const incompleteClients = clientsWithStatus.filter(
    c => !c.financialDataComplete || !c.riskProfileComplete
  );

  if (clientsLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plan Builder Dashboard</h1>
          <p className="text-gray-500">Manage your financial planning workflow from start to finish</p>
        </div>
        <Link to="/clients">
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Add New Client
          </Button>
        </Link>
      </div>

      {/* Workflow Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Financial Planning Workflow
          </CardTitle>
          <CardDescription>Track progress through the complete planning process</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {planBuilderSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <div className={`p-4 rounded-lg border ${
                  step.status === 'completed' ? 'bg-green-50 border-green-200' :
                  step.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
                  'bg-gray-50 border-gray-200'
                }`}>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-green-500 text-white' :
                      step.status === 'in-progress' ? 'bg-blue-500 text-white' :
                      'bg-gray-400 text-white'
                    }`}>
                      <step.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{step.description}</p>
                </div>
                {index < planBuilderSteps.length - 1 && (
                  <ArrowRight className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 text-gray-400 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientsWithStatus.length}</div>
            <p className="text-xs text-gray-500">Active in system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ready for Plans</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{readyForPlanClients.length}</div>
            <p className="text-xs text-gray-500">Complete profiles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Incomplete Profiles</CardTitle>
            <AlertCircle className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{incompleteClients.length}</div>
            <p className="text-xs text-gray-500">Need completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Plans Generated</CardTitle>
            <FileText className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">0</div>
            <p className="text-xs text-gray-500">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Client Management Tabs */}
      <Tabs defaultValue="ready">
        <TabsList>
          <TabsTrigger value="ready">Ready for Plans ({readyForPlanClients.length})</TabsTrigger>
          <TabsTrigger value="incomplete">Incomplete Profiles ({incompleteClients.length})</TabsTrigger>
          <TabsTrigger value="all">All Clients ({clientsWithStatus.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="ready" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Clients Ready for Plan Generation</CardTitle>
              <CardDescription>These clients have complete profiles and are ready for financial plan creation</CardDescription>
            </CardHeader>
            <CardContent>
              {readyForPlanClients.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No clients ready for plan generation</p>
                  <p className="text-sm">Complete client profiles to start generating plans</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {readyForPlanClients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{client.first_name} {client.last_name}</p>
                          <p className="text-sm text-gray-500">{client.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-green-100 text-green-800">Profile Complete</Badge>
                        <Button onClick={() => handleCreatePlan(client)}>
                          <FileText className="w-4 h-4 mr-2" />
                          Generate Plan
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incomplete" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Incomplete Client Profiles</CardTitle>
              <CardDescription>These clients need additional information before plan generation</CardDescription>
            </CardHeader>
            <CardContent>
              {incompleteClients.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>All client profiles are complete!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {incompleteClients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium">{client.first_name} {client.last_name}</p>
                          <p className="text-sm text-gray-500">{client.email}</p>
                          <div className="flex space-x-2 mt-1">
                            {!client.financialDataComplete && (
                              <Badge variant="outline" className="text-xs">Missing Financial Data</Badge>
                            )}
                            {!client.riskProfileComplete && (
                              <Badge variant="outline" className="text-xs">Missing Risk Profile</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Link to={`/clients/${client.id}`}>
                        <Button variant="outline">
                          Complete Profile
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Clients</CardTitle>
              <CardDescription>Complete overview of all clients in your system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientsWithStatus.map((client) => (
                  <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {getStatusIcon(client.planStatus)}
                      </div>
                      <div>
                        <p className="font-medium">{client.first_name} {client.last_name}</p>
                        <p className="text-sm text-gray-500">{client.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(client.planStatus)}>
                        {client.planStatus === 'completed' ? 'Profile Complete' :
                         client.planStatus === 'in-progress' ? 'In Progress' : 'Needs Completion'}
                      </Badge>
                      <Link to={`/clients/${client.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedClient && (
        <CreatePlanDialog 
          open={createPlanOpen} 
          onOpenChange={setCreatePlanOpen}
          client={selectedClient}
        />
      )}
    </div>
  );
};
