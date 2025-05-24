
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CalendarDays, FileText, AlertCircle, ArrowRight } from "lucide-react";

export function DashboardReminders() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reminders</CardTitle>
          <CardDescription>Important tasks and follow-ups</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-primary" />
              <span className="font-medium">Client Review</span>
            </div>
            <p className="mt-1 text-sm">Quarterly review for Amit Shah on June 28</p>
          </div>
          
          <div className="rounded-md border p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-medium">Document Update</span>
            </div>
            <p className="mt-1 text-sm">Update KYC for Raj Mehta</p>
          </div>
          
          <div className="rounded-md border p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">Plan Expiring</span>
            </div>
            <p className="mt-1 text-sm">Priya Patel's financial plan expires next month</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="sm" className="ml-auto">
            All Reminders <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      <Alert>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Credit Balance Low</AlertTitle>
        <AlertDescription>
          You have 10 plan credits remaining. Consider purchasing more credits to avoid interruptions.
        </AlertDescription>
        <Button size="sm" variant="outline" className="mt-2">
          Buy Credits
        </Button>
      </Alert>
    </div>
  );
}
