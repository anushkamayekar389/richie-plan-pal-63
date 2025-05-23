
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, FileText, Pencil } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ClientDetail = () => {
  const { id } = useParams();

  const { data: client, isLoading } = useQuery({
    queryKey: ["client", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-gray-500">Loading client data...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500 mb-4">Client not found</p>
        <Link to="/clients">
          <Button>
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Clients
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/clients">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{client.first_name} {client.last_name}</h1>
            <p className="text-gray-500">Client since {format(new Date(client.created_at), 'MMMM yyyy')}</p>
          </div>
        </div>
        <Button>
          <Pencil className="w-4 h-4 mr-2" /> Edit Client
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{client.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p>{client.phone || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p>{client.address || "—"}</p>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2">
          <Tabs defaultValue="plans">
            <TabsList>
              <TabsTrigger value="plans">Financial Plans</TabsTrigger>
              <TabsTrigger value="investments">Investments</TabsTrigger>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
            </TabsList>
            <TabsContent value="plans" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Financial Plans</CardTitle>
                  <Button size="sm">
                    <FileText className="w-4 h-4 mr-2" /> Create New Plan
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-center py-8">
                    No financial plans created for this client yet.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="investments" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-center py-8">
                    No investment data available for this client.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="insurance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Insurance Policies</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 text-center py-8">
                    No insurance policies found for this client.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;
