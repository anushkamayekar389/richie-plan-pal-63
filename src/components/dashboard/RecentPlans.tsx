
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function RecentPlans() {
  return (
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
  );
}
