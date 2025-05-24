
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function UpcomingReviews() {
  return (
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
  );
}
