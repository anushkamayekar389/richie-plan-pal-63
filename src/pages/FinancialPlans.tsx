
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  FileText,
  MoreHorizontal,
  Plus,
  Search,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useFinancialPlanGenerator } from "@/hooks/use-financial-plan-generator";
import { FinancialPlanPreview } from "@/components/FinancialPlanPreview";
import { FinancialPlanInput } from "@/services/financialPlanGenerator";

const FinancialPlans = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<FinancialPlanInput>>({
    planName: "",
    clientId: "",
    planType: "comprehensive",
    template: "standard",
    timeHorizon: 10,
    riskTolerance: "moderate"
  });
  
  const { generatePlan, isGenerating, generatedPlan, clearPlan } = useFinancialPlanGenerator();

  const handleGeneratePlan = async () => {
    if (!formData.planName || !formData.clientId) {
      return;
    }

    try {
      await generatePlan(formData as FinancialPlanInput);
      setOpen(false);
    } catch (error) {
      console.error('Failed to generate plan:', error);
    }
  };

  const handleDownloadPDF = () => {
    console.log('Downloading PDF...');
    // PDF generation logic will be implemented later
  };

  const handleSharePlan = () => {
    console.log('Sharing plan...');
    // Share functionality will be implemented later
  };

  if (generatedPlan) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Generated Financial Plan</h1>
            <p className="text-gray-500">Review and customize your financial plan</p>
          </div>
          <Button variant="outline" onClick={clearPlan}>
            Back to Plans
          </Button>
        </div>
        
        <FinancialPlanPreview 
          plan={generatedPlan}
          onDownload={handleDownloadPDF}
          onShare={handleSharePlan}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Plans</h1>
          <p className="text-gray-500">Create and manage financial plans for your clients</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Create New Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Financial Plan</DialogTitle>
              <DialogDescription>
                Fill in the details to generate a new financial plan.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="plan-name">Plan Name</Label>
                <Input 
                  id="plan-name" 
                  placeholder="Retirement Plan"
                  value={formData.planName}
                  onChange={(e) => setFormData({...formData, planName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select onValueChange={(value) => setFormData({...formData, clientId: value})}>
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client-1">Amit Shah</SelectItem>
                    <SelectItem value="client-2">Priya Patel</SelectItem>
                    <SelectItem value="client-3">Raj Mehta</SelectItem>
                    <SelectItem value="client-4">Neha Sharma</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan-type">Plan Type</Label>
                <Select onValueChange={(value: any) => setFormData({...formData, planType: value})}>
                  <SelectTrigger id="plan-type">
                    <SelectValue placeholder="Select plan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                    <SelectItem value="retirement">Retirement</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="tax">Tax Planning</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="template">Template</Label>
                <Select onValueChange={(value: any) => setFormData({...formData, template: value})}>
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                    <SelectItem value="executive">Executive Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time-horizon">Time Horizon (Years)</Label>
                <Input 
                  id="time-horizon" 
                  type="number"
                  placeholder="10"
                  value={formData.timeHorizon}
                  onChange={(e) => setFormData({...formData, timeHorizon: parseInt(e.target.value) || 10})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleGeneratePlan} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Plan"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="w-4 h-4 text-gray-400" />
        <Input 
          placeholder="Search financial plans..." 
          className="max-w-sm" 
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Plans</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Financial Plans</CardTitle>
              <CardDescription>Showing 15 financial plans</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-medium text-gray-500">Plan Name</th>
                    <th className="p-4 text-left font-medium text-gray-500">Client</th>
                    <th className="p-4 text-left font-medium text-gray-500">
                      <div className="flex items-center">
                        <span>Date</span>
                        <ArrowUpDown className="ml-1 w-3 h-3" />
                      </div>
                    </th>
                    <th className="p-4 text-left font-medium text-gray-500">Type</th>
                    <th className="p-4 text-left font-medium text-gray-500">Status</th>
                    <th className="p-4 text-right font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { 
                      name: "Retirement Plan", 
                      client: "Amit Shah", 
                      date: "June 10, 2023", 
                      type: "Comprehensive", 
                      status: "Active" 
                    },
                    { 
                      name: "Tax Planning", 
                      client: "Priya Patel", 
                      date: "June 8, 2023", 
                      type: "Focused", 
                      status: "Active" 
                    },
                    { 
                      name: "Education Fund", 
                      client: "Raj Mehta", 
                      date: "June 5, 2023", 
                      type: "Comprehensive", 
                      status: "Active" 
                    },
                    { 
                      name: "Insurance Review", 
                      client: "Neha Sharma", 
                      date: "May 29, 2023", 
                      type: "Focused", 
                      status: "Archived" 
                    },
                    { 
                      name: "Retirement Plan", 
                      client: "Vikram Singh", 
                      date: "May 25, 2023", 
                      type: "Comprehensive", 
                      status: "Active" 
                    },
                  ].map((plan, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4">
                        <Link to={`/financial-plans/${index + 1}`} className="font-medium text-blue-600 hover:underline">
                          {plan.name}
                        </Link>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <span>{plan.client}</span>
                        </div>
                      </td>
                      <td className="p-4">{plan.date}</td>
                      <td className="p-4">{plan.type}</td>
                      <td className="p-4">
                        <Badge variant="outline" className={
                          plan.status === "Active" 
                            ? "bg-green-100 text-green-800 hover:bg-green-100" 
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }>
                          {plan.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Link to={`/financial-plans/${index + 1}`} className="w-full">View Plan</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Download PDF</DropdownMenuItem>
                            <DropdownMenuItem>Share with Client</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              {plan.status === "Active" ? "Archive Plan" : "Restore Plan"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active">
          <div className="mt-6 text-center py-10 text-gray-500">
            Select "Active" tab to see currently active financial plans
          </div>
        </TabsContent>
        <TabsContent value="recent">
          <div className="mt-6 text-center py-10 text-gray-500">
            Select "Recent" tab to see your most recently created plans
          </div>
        </TabsContent>
        <TabsContent value="archived">
          <div className="mt-6 text-center py-10 text-gray-500">
            Select "Archived" tab to see archived financial plans
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialPlans;
