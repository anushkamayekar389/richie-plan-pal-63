import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CalendarDays, FileText, BarChart4, AlertCircle, ArrowRight, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Rahul! Here's an overview of your financial advisory practice.</p>
        </div>
        <div className="flex space-x-3">
          <Link to="/plan-builder">
            <Button variant="outline">
              <Target className="w-4 h-4 mr-2" />
              Plan Builder
            </Button>
          </Link>
          <Link to="/financial-plans">
            <Button>Create New Financial Plan</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-gray-500">+3 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Plans Generated</CardTitle>
            <FileText className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-gray-500">+8 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Reviews Due</CardTitle>
            <CalendarDays className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">Next 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Credits Balance</CardTitle>
            <BarChart4 className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,990</div>
            <p className="text-xs text-gray-500">Buy more credits</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reviews</CardTitle>
              <CardDescription>Client reviews scheduled for the next 30 days</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-medium text-gray-500">Client</th>
                    <th className="p-4 text-left font-medium text-gray-500">Date</th>
                    <th className="p-4 text-left font-medium text-gray-500">Type</th>
                    <th className="p-4 text-left font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Amit Shah</td>
                    <td className="p-4">June 28, 2023</td>
                    <td className="p-4">Quarterly Review</td>
                    <td className="p-4">
                      <Button size="sm" variant="outline">Prepare</Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Priya Patel</td>
                    <td className="p-4">July 3, 2023</td>
                    <td className="p-4">Annual Review</td>
                    <td className="p-4">
                      <Button size="sm" variant="outline">Prepare</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">Raj Mehta</td>
                    <td className="p-4">July 15, 2023</td>
                    <td className="p-4">Investment Update</td>
                    <td className="p-4">
                      <Button size="sm" variant="outline">Prepare</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Financial Plans</CardTitle>
              <CardDescription>Latest plans generated for your clients</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-medium text-gray-500">Client</th>
                    <th className="p-4 text-left font-medium text-gray-500">Date</th>
                    <th className="p-4 text-left font-medium text-gray-500">Type</th>
                    <th className="p-4 text-left font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Vikram Singh</td>
                    <td className="p-4">June 20, 2023</td>
                    <td className="p-4">Retirement Plan</td>
                    <td className="p-4">
                      <Button size="sm" variant="outline">View</Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Neha Sharma</td>
                    <td className="p-4">June 18, 2023</td>
                    <td className="p-4">Tax Planning</td>
                    <td className="p-4">
                      <Button size="sm" variant="outline">View</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">Kiran Joshi</td>
                    <td className="p-4">June 15, 2023</td>
                    <td className="p-4">Education Fund</td>
                    <td className="p-4">
                      <Button size="sm" variant="outline">View</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="ml-auto">
                View All <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        </div>

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
      </div>
    </div>
  );
};

export default Dashboard;
