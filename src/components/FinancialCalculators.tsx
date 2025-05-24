
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, TrendingUp, CreditCard } from "lucide-react";
import { CalculatorService } from "@/services/calculatorService";
import {
  SIPCalculatorInput,
  SIPCalculatorResult,
  LumpsumCalculatorInput,
  LumpsumCalculatorResult,
  EMICalculatorInput,
  EMICalculatorResult
} from "@/types/calculator";

export function FinancialCalculators() {
  const [sipInput, setSipInput] = useState<SIPCalculatorInput>({
    monthlyInvestment: 5000,
    expectedReturn: 12,
    investmentPeriod: 10
  });
  const [sipResult, setSipResult] = useState<SIPCalculatorResult | null>(null);

  const [lumpsumInput, setLumpsumInput] = useState<LumpsumCalculatorInput>({
    initialAmount: 100000,
    expectedReturn: 12,
    investmentPeriod: 10
  });
  const [lumpsumResult, setLumpsumResult] = useState<LumpsumCalculatorResult | null>(null);

  const [emiInput, setEmiInput] = useState<EMICalculatorInput>({
    loanAmount: 1000000,
    interestRate: 9,
    loanTenure: 20
  });
  const [emiResult, setEmiResult] = useState<EMICalculatorResult | null>(null);

  const calculateSIP = () => {
    const result = CalculatorService.calculateSIP(sipInput);
    setSipResult(result);
  };

  const calculateLumpsum = () => {
    const result = CalculatorService.calculateLumpsum(lumpsumInput);
    setLumpsumResult(result);
  };

  const calculateEMI = () => {
    const result = CalculatorService.calculateEMI(emiInput);
    setEmiResult(result);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center">
          <Calculator className="w-6 h-6 mr-2" />
          Financial Calculators
        </h2>
        <p className="text-gray-500">Essential tools for financial planning and client consultations</p>
      </div>

      <Tabs defaultValue="sip" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sip">SIP Calculator</TabsTrigger>
          <TabsTrigger value="lumpsum">Lumpsum Calculator</TabsTrigger>
          <TabsTrigger value="emi">EMI Calculator</TabsTrigger>
        </TabsList>

        <TabsContent value="sip" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  SIP Calculator
                </CardTitle>
                <CardDescription>
                  Calculate returns for Systematic Investment Plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="monthlyInvestment">Monthly Investment (₹)</Label>
                  <Input
                    id="monthlyInvestment"
                    type="number"
                    value={sipInput.monthlyInvestment}
                    onChange={(e) => setSipInput({ ...sipInput, monthlyInvestment: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                  <Input
                    id="expectedReturn"
                    type="number"
                    value={sipInput.expectedReturn}
                    onChange={(e) => setSipInput({ ...sipInput, expectedReturn: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="investmentPeriod">Investment Period (Years)</Label>
                  <Input
                    id="investmentPeriod"
                    type="number"
                    value={sipInput.investmentPeriod}
                    onChange={(e) => setSipInput({ ...sipInput, investmentPeriod: Number(e.target.value) })}
                  />
                </div>
                <Button onClick={calculateSIP} className="w-full">
                  Calculate SIP Returns
                </Button>
              </CardContent>
            </Card>

            {sipResult && (
              <Card>
                <CardHeader>
                  <CardTitle>SIP Calculation Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          ₹{sipResult.totalInvestment.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Total Investment</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          ₹{sipResult.totalValue.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Maturity Value</div>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        ₹{sipResult.totalReturns.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Total Returns</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="lumpsum" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Lumpsum Calculator
                </CardTitle>
                <CardDescription>
                  Calculate returns for one-time investment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="initialAmount">Initial Investment (₹)</Label>
                  <Input
                    id="initialAmount"
                    type="number"
                    value={lumpsumInput.initialAmount}
                    onChange={(e) => setLumpsumInput({ ...lumpsumInput, initialAmount: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="expectedReturnLumpsum">Expected Annual Return (%)</Label>
                  <Input
                    id="expectedReturnLumpsum"
                    type="number"
                    value={lumpsumInput.expectedReturn}
                    onChange={(e) => setLumpsumInput({ ...lumpsumInput, expectedReturn: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="investmentPeriodLumpsum">Investment Period (Years)</Label>
                  <Input
                    id="investmentPeriodLumpsum"
                    type="number"
                    value={lumpsumInput.investmentPeriod}
                    onChange={(e) => setLumpsumInput({ ...lumpsumInput, investmentPeriod: Number(e.target.value) })}
                  />
                </div>
                <Button onClick={calculateLumpsum} className="w-full">
                  Calculate Lumpsum Returns
                </Button>
              </CardContent>
            </Card>

            {lumpsumResult && (
              <Card>
                <CardHeader>
                  <CardTitle>Lumpsum Calculation Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          ₹{lumpsumResult.initialAmount.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Initial Investment</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          ₹{lumpsumResult.maturityValue.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Maturity Value</div>
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        ₹{lumpsumResult.totalReturns.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Total Returns</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="emi" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-primary" />
                  EMI Calculator
                </CardTitle>
                <CardDescription>
                  Calculate Equated Monthly Installments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={emiInput.loanAmount}
                    onChange={(e) => setEmiInput({ ...emiInput, loanAmount: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    value={emiInput.interestRate}
                    onChange={(e) => setEmiInput({ ...emiInput, interestRate: Number(e.target.value) })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="loanTenure">Loan Tenure (Years)</Label>
                  <Input
                    id="loanTenure"
                    type="number"
                    value={emiInput.loanTenure}
                    onChange={(e) => setEmiInput({ ...emiInput, loanTenure: Number(e.target.value) })}
                  />
                </div>
                <Button onClick={calculateEMI} className="w-full">
                  Calculate EMI
                </Button>
              </CardContent>
            </Card>

            {emiResult && (
              <Card>
                <CardHeader>
                  <CardTitle>EMI Calculation Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        ₹{emiResult.monthlyEMI.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">Monthly EMI</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-yellow-600">
                          ₹{emiResult.totalInterest.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Total Interest</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-600">
                          ₹{emiResult.totalAmount.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Total Amount</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
