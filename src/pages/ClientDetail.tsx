
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart4,
  CalendarDays,
  Edit2,
  FileText,
  Mail,
  Phone,
  PieChart,
  PlusCircle,
  Shield,
  User,
} from "lucide-react";

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [clientName] = useState("Amit Shah");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{clientName}</h1>
            <div className="flex items-center space-x-4 text-gray-500">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                <span>amit.shah@example.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            <CalendarDays className="w-4 h-4 mr-2" />
            Schedule Review
          </Button>
          <Button>
            <FileText className="w-4 h-4 mr-2" />
            Create Plan
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial-plans">Financial Plans</TabsTrigger>
          <TabsTrigger value="risk-profile">Risk Profile</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </CardTitle>
                <Button variant="ghost" size="sm" className="absolute right-4 top-4">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">Amit Shah</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">amit.shah@example.com</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">+91 98765 43210</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">123 Seaward Street, Mumbai, Maharashtra</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">42 years</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart4 className="w-5 h-5 mr-2" />
                  Financial Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Total Assets</p>
                  <p className="font-medium">₹1,25,00,000</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Total Liabilities</p>
                  <p className="font-medium">₹35,00,000</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Net Worth</p>
                  <p className="font-medium">₹90,00,000</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Monthly Income</p>
                  <p className="font-medium">₹2,50,000</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Monthly Expenses</p>
                  <p className="font-medium">₹1,75,000</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Risk Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Risk Tolerance</p>
                  <div className="flex items-center">
                    <Badge className="bg-amber-500">Moderate</Badge>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Investment Knowledge</p>
                  <p className="font-medium">Intermediate</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Investment Horizon</p>
                  <p className="font-medium">10-15 years</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Market Volatility Tolerance</p>
                  <p className="font-medium">Medium</p>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm">
                    Update Risk Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Financial Plans</CardTitle>
              <CardDescription>Latest plans generated for {clientName}</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-medium text-gray-500">Plan Name</th>
                    <th className="p-4 text-left font-medium text-gray-500">Date Created</th>
                    <th className="p-4 text-left font-medium text-gray-500">Type</th>
                    <th className="p-4 text-left font-medium text-gray-500">Status</th>
                    <th className="p-4 text-left font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Retirement Plan</td>
                    <td className="p-4">June 10, 2023</td>
                    <td className="p-4">Comprehensive</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </td>
                    <td className="p-4">
                      <Button size="sm" variant="outline">View</Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Tax Planning</td>
                    <td className="p-4">March 15, 2023</td>
                    <td className="p-4">Focused</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Archived</Badge>
                    </td>
                    <td className="p-4">
                      <Button size="sm" variant="outline">View</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reviews</CardTitle>
              <CardDescription>Scheduled reviews and checkpoints</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-medium text-gray-500">Review Type</th>
                    <th className="p-4 text-left font-medium text-gray-500">Date</th>
                    <th className="p-4 text-left font-medium text-gray-500">Status</th>
                    <th className="p-4 text-left font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4">Quarterly Review</td>
                    <td className="p-4">June 28, 2023</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Upcoming</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Prepare</Button>
                        <Button size="sm" variant="outline">Reschedule</Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial-plans">
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Financial Plans</CardTitle>
                <CardDescription>All financial plans created for {clientName}</CardDescription>
              </div>
              <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                Create New Plan
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-medium text-gray-500">Plan Name</th>
                    <th className="p-4 text-left font-medium text-gray-500">Date Created</th>
                    <th className="p-4 text-left font-medium text-gray-500">Type</th>
                    <th className="p-4 text-left font-medium text-gray-500">Status</th>
                    <th className="p-4 text-left font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Retirement Plan</td>
                    <td className="p-4">June 10, 2023</td>
                    <td className="p-4">Comprehensive</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Tax Planning</td>
                    <td className="p-4">March 15, 2023</td>
                    <td className="p-4">Focused</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Archived</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">Insurance Review</td>
                    <td className="p-4">January 5, 2023</td>
                    <td className="p-4">Focused</td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Archived</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-profile">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Risk Profile Assessment</CardTitle>
              <CardDescription>Detailed risk profile for {clientName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Risk Tolerance Score</h3>
                    <div className="mt-2 h-4 rounded-full bg-gray-100">
                      <div className="h-full rounded-full bg-amber-500" style={{ width: '65%' }}></div>
                    </div>
                    <div className="mt-1 flex justify-between text-sm">
                      <span>Conservative</span>
                      <span>Moderate</span>
                      <span>Aggressive</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium">Risk Profile: Moderate</p>
                    <p className="text-sm text-gray-500">
                      This client has a moderate risk tolerance, seeking a balance between capital 
                      preservation and growth. They can withstand some market fluctuations for 
                      potentially higher returns.
                    </p>
                  </div>
                </div>

                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Risk Tolerance</p>
                      <p className="font-medium">Moderate</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Investment Knowledge</p>
                      <p className="font-medium">Intermediate</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Investment Horizon</p>
                      <p className="font-medium">10-15 years</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Market Volatility Tolerance</p>
                      <p className="font-medium">Medium</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500">Portfolio Loss Scenario</p>
                      <p className="font-medium">Comfortable with 15-20% temporary loss</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recommended Asset Allocation</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">50%</p>
                        <p className="font-medium">Equity</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-amber-600">30%</p>
                        <p className="font-medium">Fixed Income</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">20%</p>
                        <p className="font-medium">Alternative Assets</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button>Generate Investment Plan</Button>
                <Button variant="outline">Update Risk Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Important documents related to {clientName}</CardDescription>
              </div>
              <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-medium text-gray-500">Document Name</th>
                    <th className="p-4 text-left font-medium text-gray-500">Date Uploaded</th>
                    <th className="p-4 text-left font-medium text-gray-500">Type</th>
                    <th className="p-4 text-left font-medium text-gray-500">Size</th>
                    <th className="p-4 text-left font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Financial Plan - Jun 2023.pdf</td>
                    <td className="p-4">June 10, 2023</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1 text-red-500" />
                        <span>PDF</span>
                      </div>
                    </td>
                    <td className="p-4">2.4 MB</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Investment Portfolio.xlsx</td>
                    <td className="p-4">May 15, 2023</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1 text-green-600" />
                        <span>Excel</span>
                      </div>
                    </td>
                    <td className="p-4">1.8 MB</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">KYC Documents.zip</td>
                    <td className="p-4">April 22, 2023</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <FileText className="w-4 h-4 mr-1 text-blue-600" />
                        <span>Archive</span>
                      </div>
                    </td>
                    <td className="p-4">8.7 MB</td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes">
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Notes</CardTitle>
                <CardDescription>Private notes about {clientName}</CardDescription>
              </div>
              <Button>
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex justify-between">
                    <p className="font-medium">Annual Review Notes</p>
                    <p className="text-sm text-gray-500">June 10, 2023</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Client is concerned about taxation on LTCG for equity investments. 
                    Discussed restructuring some investments to optimize for tax efficiency. 
                    Need to follow up with specific recommendations in next meeting.
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex justify-between">
                    <p className="font-medium">Investment Preferences</p>
                    <p className="text-sm text-gray-500">May 5, 2023</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Client expressed interest in ESG investing options. Prepare a list of suitable 
                    mutual funds and ETFs that align with their risk profile and ESG preferences.
                  </p>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex justify-between">
                    <p className="font-medium">Family Information</p>
                    <p className="text-sm text-gray-500">April 15, 2023</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-700">
                    Client has two children (ages 12 and 15). Education planning is a priority. 
                    Spouse works in IT sector with stable income. Need to factor in children's 
                    higher education costs in financial plan.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetail;
