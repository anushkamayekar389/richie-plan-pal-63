
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface IncomeEmploymentStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

export function IncomeEmploymentStep({ data, onDataChange }: IncomeEmploymentStepProps) {
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
              <Label htmlFor="monthly_income">Monthly Income (₹)</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Gross monthly income before taxes and deductions</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input 
              id="monthly_income"
              type="number"
              placeholder="50000"
              value={data.monthly_income || ""}
              onChange={(e) => handleChange("monthly_income", parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="additional_income">Additional Income (₹)</Label>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Income from investments, rental, freelancing, etc.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input 
              id="additional_income"
              type="number"
              placeholder="10000"
              value={data.additional_income || ""}
              onChange={(e) => handleChange("additional_income", parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label>Employment Type</Label>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Type of employment affects tax planning and investment options</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select value={data.employment_type || ""} onValueChange={(value) => handleChange("employment_type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="salaried">Salaried Employee</SelectItem>
              <SelectItem value="self_employed">Self Employed</SelectItem>
              <SelectItem value="business_owner">Business Owner</SelectItem>
              <SelectItem value="professional">Professional (Doctor, Lawyer, etc.)</SelectItem>
              <SelectItem value="retired">Retired</SelectItem>
              <SelectItem value="unemployed">Unemployed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employer">Employer/Company Name</Label>
          <Input 
            id="employer"
            placeholder="ABC Technologies Pvt Ltd"
            value={data.employer || ""}
            onChange={(e) => handleChange("employer", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="monthly_expenses">Monthly Expenses (₹)</Label>
            <Input 
              id="monthly_expenses"
              type="number"
              placeholder="30000"
              value={data.monthly_expenses || ""}
              onChange={(e) => handleChange("monthly_expenses", parseInt(e.target.value) || 0)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years_of_experience">Years of Experience</Label>
            <Input 
              id="years_of_experience"
              type="number"
              placeholder="10"
              value={data.years_of_experience || ""}
              onChange={(e) => handleChange("years_of_experience", parseInt(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
