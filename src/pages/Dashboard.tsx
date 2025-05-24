
import { Button } from "@/components/ui/button";
import { useFinancialPlanGenerator } from "@/hooks/use-financial-plan-generator";
import { FinancialPlanPreview } from "@/components/FinancialPlanPreview";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { UpcomingReviews } from "@/components/dashboard/UpcomingReviews";
import { RecentPlans } from "@/components/dashboard/RecentPlans";
import { DashboardReminders } from "@/components/dashboard/DashboardReminders";
import { CreatePlanDialog } from "@/components/dashboard/CreatePlanDialog";

const Dashboard = () => {
  const { generatedPlan, clearPlan } = useFinancialPlanGenerator();

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
            Back to Dashboard
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
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Rahul! Here's an overview of your financial advisory practice.</p>
        </div>
        <CreatePlanDialog />
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <UpcomingReviews />
          <RecentPlans />
        </div>
        <DashboardReminders />
      </div>
    </div>
  );
};

export default Dashboard;
