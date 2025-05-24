import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface InsuranceCoverageStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

export function InsuranceCoverageStep({ data, onDataChange }: InsuranceCoverageStepProps) {
  const handleChange = (field: string, value: any) => {
    const newData = { ...data, [field]: value };
    onDataChange(newData);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Life Insurance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Life Insurance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="has_life_insurance"
                  checked={data.has_life_insurance || false}
                  onCheckedChange={(checked) => handleChange("has_life_insurance", checked)}
                />
                <Label htmlFor="has_life_insurance">I have life insurance</Label>
              </div>

              {data.has_life_insurance && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="life_insurance_amount">Sum Assured (₹)</Label>
                    <Input 
                      id="life_insurance_amount"
                      type="number"
                      placeholder="1000000"
                      value={data.life_insurance_amount || ""}
                      onChange={(e) => handleChange("life_insurance_amount", parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Insurance Type</Label>
                    <Select value={data.life_insurance_type || ""} onValueChange={(value) => handleChange("life_insurance_type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="term">Term Insurance</SelectItem>
                        <SelectItem value="whole_life">Whole Life</SelectItem>
                        <SelectItem value="ulip">ULIP</SelectItem>
                        <SelectItem value="endowment">Endowment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="life_insurance_premium">Annual Premium (₹)</Label>
                    <Input 
                      id="life_insurance_premium"
                      type="number"
                      placeholder="12000"
                      value={data.life_insurance_premium || ""}
                      onChange={(e) => handleChange("life_insurance_premium", parseInt(e.target.value) || 0)}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Health Insurance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Health Insurance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="has_health_insurance"
                  checked={data.has_health_insurance || false}
                  onCheckedChange={(checked) => handleChange("has_health_insurance", checked)}
                />
                <Label htmlFor="has_health_insurance">I have health insurance</Label>
              </div>

              {data.has_health_insurance && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="health_insurance_amount">Coverage Amount (₹)</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total sum insured for medical expenses</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input 
                      id="health_insurance_amount"
                      type="number"
                      placeholder="500000"
                      value={data.health_insurance_amount || ""}
                      onChange={(e) => handleChange("health_insurance_amount", parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Coverage Type</Label>
                    <Select value={data.health_insurance_type || ""} onValueChange={(value) => handleChange("health_insurance_type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="family_floater">Family Floater</SelectItem>
                        <SelectItem value="group">Group/Employer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="health_insurance_premium">Annual Premium (₹)</Label>
                    <Input 
                      id="health_insurance_premium"
                      type="number"
                      placeholder="8000"
                      value={data.health_insurance_premium || ""}
                      onChange={(e) => handleChange("health_insurance_premium", parseInt(e.target.value) || 0)}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Other Insurance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Other Insurance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="has_vehicle_insurance"
                  checked={data.has_vehicle_insurance || false}
                  onCheckedChange={(checked) => handleChange("has_vehicle_insurance", checked)}
                />
                <Label htmlFor="has_vehicle_insurance">Vehicle Insurance</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="has_home_insurance"
                  checked={data.has_home_insurance || false}
                  onCheckedChange={(checked) => handleChange("has_home_insurance", checked)}
                />
                <Label htmlFor="has_home_insurance">Home Insurance</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="has_travel_insurance"
                  checked={data.has_travel_insurance || false}
                  onCheckedChange={(checked) => handleChange("has_travel_insurance", checked)}
                />
                <Label htmlFor="has_travel_insurance">Travel Insurance</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="has_disability_insurance"
                  checked={data.has_disability_insurance || false}
                  onCheckedChange={(checked) => handleChange("has_disability_insurance", checked)}
                />
                <Label htmlFor="has_disability_insurance">Disability Insurance</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
