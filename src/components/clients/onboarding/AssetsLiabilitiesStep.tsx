
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface AssetsLiabilitiesStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

export function AssetsLiabilitiesStep({ data, onDataChange }: AssetsLiabilitiesStepProps) {
  const handleChange = (field: string, value: any) => {
    const newData = { ...data, [field]: value };
    onDataChange(newData);
  };

  const calculateNetWorth = () => {
    const totalAssets = (data.savings_account || 0) + (data.fd_rd || 0) + (data.mutual_funds || 0) + 
                       (data.stocks || 0) + (data.pf_ppf || 0) + (data.real_estate || 0) + (data.gold || 0) + (data.other_assets || 0);
    const totalLiabilities = (data.home_loan || 0) + (data.personal_loan || 0) + (data.car_loan || 0) + 
                            (data.credit_card || 0) + (data.other_loans || 0);
    return totalAssets - totalLiabilities;
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assets */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-green-600">Assets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="savings_account">Savings Account (₹)</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Total balance in all savings accounts</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input 
                  id="savings_account"
                  type="number"
                  placeholder="100000"
                  value={data.savings_account || ""}
                  onChange={(e) => handleChange("savings_account", parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fd_rd">Fixed Deposits & RD (₹)</Label>
                <Input 
                  id="fd_rd"
                  type="number"
                  placeholder="200000"
                  value={data.fd_rd || ""}
                  onChange={(e) => handleChange("fd_rd", parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mutual_funds">Mutual Funds (₹)</Label>
                <Input 
                  id="mutual_funds"
                  type="number"
                  placeholder="150000"
                  value={data.mutual_funds || ""}
                  onChange={(e) => handleChange("mutual_funds", parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stocks">Stocks & Securities (₹)</Label>
                <Input 
                  id="stocks"
                  type="number"
                  placeholder="100000"
                  value={data.stocks || ""}
                  onChange={(e) => handleChange("stocks", parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pf_ppf">PF/PPF/NPS (₹)</Label>
                <Input 
                  id="pf_ppf"
                  type="number"
                  placeholder="300000"
                  value={data.pf_ppf || ""}
                  onChange={(e) => handleChange("pf_ppf", parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="real_estate">Real Estate (₹)</Label>
                <Input 
                  id="real_estate"
                  type="number"
                  placeholder="2000000"
                  value={data.real_estate || ""}
                  onChange={(e) => handleChange("real_estate", parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gold">Gold & Jewelry (₹)</Label>
                <Input 
                  id="gold"
                  type="number"
                  placeholder="50000"
                  value={data.gold || ""}
                  onChange={(e) => handleChange("gold", parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="other_assets">Other Assets (₹)</Label>
                <Input 
                  id="other_assets"
                  type="number"
                  placeholder="25000"
                  value={data.other_assets || ""}
                  onChange={(e) => handleChange("other_assets", parseInt(e.target.value) || 0)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Liabilities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-red-600">Liabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="home_loan">Home Loan Outstanding (₹)</Label>
                <Input 
                  id="home_loan"
                  type="number"
                  placeholder="1500000"
                  value={data.home_loan || ""}
                  onChange={(e) => handleChange("home_loan", parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="personal_loan">Personal Loan (₹)</Label>
                <Input 
                  id="personal_loan"
                  type="number"
                  placeholder="100000"
                  value={data.personal_loan || ""}
                  onChange={(e) => handleChange("personal_loan", parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="car_loan">Car Loan (₹)</Label>
                <Input 
                  id="car_loan"
                  type="number"
                  placeholder="200000"
                  value={data.car_loan || ""}
                  onChange={(e) => handleChange("car_loan", parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="credit_card">Credit Card Dues (₹)</Label>
                <Input 
                  id="credit_card"
                  type="number"
                  placeholder="25000"
                  value={data.credit_card || ""}
                  onChange={(e) => handleChange("credit_card", parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="other_loans">Other Loans (₹)</Label>
                <Input 
                  id="other_loans"
                  type="number"
                  placeholder="50000"
                  value={data.other_loans || ""}
                  onChange={(e) => handleChange("other_loans", parseInt(e.target.value) || 0)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Net Worth Summary */}
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="text-lg">Net Worth Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-center">
              ₹{calculateNetWorth().toLocaleString()}
            </div>
            <p className="text-center text-gray-500 mt-2">Current Net Worth</p>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
