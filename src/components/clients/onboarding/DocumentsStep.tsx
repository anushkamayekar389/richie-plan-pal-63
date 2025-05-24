
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface DocumentsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

export function DocumentsStep({ data, onDataChange }: DocumentsStepProps) {
  const handleChange = (field: string, value: any) => {
    const newData = { ...data, [field]: value };
    onDataChange(newData);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Identity Documents (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="pan_number">PAN Number</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Required for tax planning and investment recommendations</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input 
                id="pan_number"
                placeholder="ABCDE1234F"
                value={data.pan_number || ""}
                onChange={(e) => handleChange("pan_number", e.target.value.toUpperCase())}
                maxLength={10}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="aadhaar_number">Aadhaar Number</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Used for KYC compliance and government scheme eligibility</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input 
                id="aadhaar_number"
                placeholder="1234 5678 9012"
                value={data.aadhaar_number || ""}
                onChange={(e) => handleChange("aadhaar_number", e.target.value)}
                maxLength={14}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="voter_id">Voter ID (Optional)</Label>
              <Input 
                id="voter_id"
                placeholder="ABC1234567"
                value={data.voter_id || ""}
                onChange={(e) => handleChange("voter_id", e.target.value.toUpperCase())}
                maxLength={10}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="passport_number">Passport Number (Optional)</Label>
              <Input 
                id="passport_number"
                placeholder="A1234567"
                value={data.passport_number || ""}
                onChange={(e) => handleChange("passport_number", e.target.value.toUpperCase())}
                maxLength={8}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bank_account">Primary Bank Account Number</Label>
              <Input 
                id="bank_account"
                placeholder="123456789012"
                value={data.bank_account || ""}
                onChange={(e) => handleChange("bank_account", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank_name">Bank Name</Label>
              <Input 
                id="bank_name"
                placeholder="State Bank of India"
                value={data.bank_name || ""}
                onChange={(e) => handleChange("bank_name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch_name">Branch Name</Label>
              <Input 
                id="branch_name"
                placeholder="Mumbai Main Branch"
                value={data.branch_name || ""}
                onChange={(e) => handleChange("branch_name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ifsc_code">IFSC Code</Label>
              <Input 
                id="ifsc_code"
                placeholder="SBIN0000123"
                value={data.ifsc_code || ""}
                onChange={(e) => handleChange("ifsc_code", e.target.value.toUpperCase())}
                maxLength={11}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
