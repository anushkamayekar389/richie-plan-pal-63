
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PersonalInfoStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

export function PersonalInfoStep({ data, onDataChange }: PersonalInfoStepProps) {
  const [dob, setDob] = useState<Date | undefined>(data.dob);

  const handleChange = (field: string, value: any) => {
    const newData = { ...data, [field]: value };
    onDataChange(newData);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="first_name">First Name</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Client's legal first name as per government documents</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input 
              id="first_name"
              placeholder="John"
              value={data.first_name || ""}
              onChange={(e) => handleChange("first_name", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Client's legal last name as per government documents</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input 
              id="last_name"
              placeholder="Doe"
              value={data.last_name || ""}
              onChange={(e) => handleChange("last_name", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label>Date of Birth</Label>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Required for age-based calculations and retirement planning</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dob && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dob ? format(dob, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dob}
                onSelect={(date) => {
                  setDob(date);
                  handleChange("dob", date);
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label>Marital Status</Label>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Affects tax planning and insurance recommendations</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={data.marital_status || ""} onValueChange={(value) => handleChange("marital_status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select marital status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
              <SelectItem value="divorced">Divorced</SelectItem>
              <SelectItem value="widowed">Widowed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone"
              placeholder="+91 98765 43210"
              value={data.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input 
            id="address"
            placeholder="123 Main Street, Mumbai, Maharashtra"
            value={data.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
      </div>
    </TooltipProvider>
  );
}
