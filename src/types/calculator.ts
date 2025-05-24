
export interface SIPCalculatorInput {
  monthlyInvestment: number;
  expectedReturn: number;
  investmentPeriod: number;
}

export interface SIPCalculatorResult {
  totalInvestment: number;
  totalValue: number;
  totalReturns: number;
}

export interface LumpsumCalculatorInput {
  initialAmount: number;
  expectedReturn: number;
  investmentPeriod: number;
}

export interface LumpsumCalculatorResult {
  initialAmount: number;
  maturityValue: number;
  totalReturns: number;
}

export interface EMICalculatorInput {
  loanAmount: number;
  interestRate: number;
  loanTenure: number;
}

export interface EMICalculatorResult {
  monthlyEMI: number;
  totalInterest: number;
  totalAmount: number;
}
