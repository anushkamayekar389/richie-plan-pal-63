
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpDown,
  BarChart4,
  Check,
  CreditCard,
  Download,
  FileText,
  HelpCircle,
  PieChart,
  Send,
  Share2,
  Trash,
  User,
} from "lucide-react";

const FinancialPlanDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [planName] = useState("Retirement Plan");
  const [clientName] = useState("Amit Shah");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{planName}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500">{clientName}</span>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
              <span className="text-gray-500">Created on June 10, 2023</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button>
            <Send className="w-4 h-4 mr-2" />
            Send to Client
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="summary">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="details">Plan Details</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">Amit Shah</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">42 years</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Retirement Age</p>
                  <p className="font-medium">60 years</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Risk Profile</p>
                  <p className="font-medium">Moderate</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart4 className="w-5 h-5 mr-2" />
                  Plan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Plan Type</p>
                  <p className="font-medium">Comprehensive</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Created On</p>
                  <p className="font-medium">June 10, 2023</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="font-medium">June 10, 2023</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Next Review</p>
                  <p className="font-medium">September 10, 2023</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
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
                  <p className="text-sm text-gray-500">Monthly Surplus</p>
                  <p className="font-medium">₹75,000</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Plan Goals</CardTitle>
              <CardDescription>Key financial goals identified in this plan</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 text-left font-medium text-gray-500">Goal</th>
                    <th className="p-4 text-left font-medium text-gray-500">Target Amount</th>
                    <th className="p-4 text-left font-medium text-gray-500">
                      <div className="flex items-center">
                        <span>Timeline</span>
                        <ArrowUpDown className="ml-1 w-3 h-3" />
                      </div>
                    </th>
                    <th className="p-4 text-left font-medium text-gray-500">Progress</th>
                    <th className="p-4 text-left font-medium text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Retirement Corpus</td>
                    <td className="p-4">₹5,00,00,000</td>
                    <td className="p-4">18 years</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-primary rounded-full" style={{ width: "45%" }}></div>
                        </div>
                        <span className="text-sm">45%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">On Track</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Children's Education</td>
                    <td className="p-4">₹80,00,000</td>
                    <td className="p-4">5 years</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-primary rounded-full" style={{ width: "60%" }}></div>
                        </div>
                        <span className="text-sm">60%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">On Track</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Vacation Home</td>
                    <td className="p-4">₹1,20,00,000</td>
                    <td className="p-4">10 years</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                        <span className="text-sm">25%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Needs Attention</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4">Emergency Fund</td>
                    <td className="p-4">₹15,00,000</td>
                    <td className="p-4">1 year</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-primary rounded-full" style={{ width: "90%" }}></div>
                        </div>
                        <span className="text-sm">90%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">On Track</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Key recommendations for achieving financial goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Increase Retirement Contributions</span>
                </div>
                <p className="text-gray-700">
                  Increase monthly SIP in equity mutual funds from ₹50,000 to ₹75,000 to meet 
                  retirement corpus goal. Focus on diversified equity funds with consistent performance.
                </p>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Enhance Insurance Coverage</span>
                </div>
                <p className="text-gray-700">
                  Current term insurance of ₹1 crore is insufficient. Recommend increasing term 
                  cover to ₹2.5 crores to adequately protect family's financial future.
                </p>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Tax Optimization Strategy</span>
                </div>
                <p className="text-gray-700">
                  Restructure investments to optimize for tax efficiency. Consider ELSS funds for 
                  Section 80C benefits and municipal bonds for tax-free income.
                </p>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Debt Reduction Plan</span>
                </div>
                <p className="text-gray-700">
                  Develop a structured plan to reduce high-interest debt. Consider consolidating 
                  personal loans and prioritizing payments based on interest rates.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          <div className="mt-6 text-center py-10 text-gray-500">
            The Plan Details tab would contain the complete financial plan document.
          </div>
        </TabsContent>

        <TabsContent value="investments">
          <div className="mt-6 text-center py-10 text-gray-500">
            The Investments tab would show detailed investment recommendations.
          </div>
        </TabsContent>

        <TabsContent value="insurance">
          <div className="mt-6 text-center py-10 text-gray-500">
            The Insurance tab would show insurance coverage and recommendations.
          </div>
        </TabsContent>

        <TabsContent value="comments">
          <div className="mt-6 text-center py-10 text-gray-500">
            The Comments tab would show discussion between advisors about this plan.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialPlanDetail;
