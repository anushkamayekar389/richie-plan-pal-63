
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { AlertCircle, Plus, Search, User, Users2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Clients = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-gray-500">Manage your client relationships and information</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>
                Enter the client's details to create a new profile.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="johndoe@example.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main Street, Mumbai" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Save Client</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="w-4 h-4 text-gray-400" />
        <Input 
          placeholder="Search clients..." 
          className="max-w-sm" 
        />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Clients</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="reviews">Reviews Due</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users2 className="w-5 h-5 mr-2" /> 
                All Clients
              </CardTitle>
              <CardDescription>
                Showing 28 clients in your portfolio
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Link to={`/clients/${index + 1}`} key={index} className="block">
                    <div className="rounded-lg border p-4 hover:border-primary transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {["Amit Shah", "Priya Patel", "Raj Mehta", "Neha Sharma", "Vikram Singh", "Kiran Joshi", "Meera Reddy", "Sanjay Gupta"][index]}
                            </p>
                            <p className="text-sm text-gray-500">Added {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index % 6]} 2023</p>
                          </div>
                        </div>
                        {index === 2 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertCircle className="w-4 h-4 text-yellow-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Review due</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                      <div className="mt-4 flex justify-between text-sm">
                        <div>
                          <p className="text-gray-500">Plans</p>
                          <p className="font-medium">{index + 1}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Last Review</p>
                          <p className="font-medium">{["1w", "2w", "3w", "1m", "2m", "3m"][index % 6]} ago</p>
                        </div>
                        <div>
                          <p className="text-gray-500">AUM</p>
                          <p className="font-medium">₹{((index + 1) * 5)}L</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="active">
          <div className="mt-6 text-center py-10 text-gray-500">
            Select "Active" tab to see clients with active financial plans
          </div>
        </TabsContent>
        <TabsContent value="recent">
          <div className="mt-6 text-center py-10 text-gray-500">
            Select "Recently Added" tab to see your newest clients
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <div className="mt-6 text-center py-10 text-gray-500">
            Select "Reviews Due" tab to see clients with upcoming reviews
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Clients;
