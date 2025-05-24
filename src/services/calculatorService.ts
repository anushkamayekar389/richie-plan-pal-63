
import { 
  SIPCalculatorInput, 
  SIPCalculatorResult,
  LumpsumCalculatorInput,
  LumpsumCalculatorResult,
  EMICalculatorInput,
  EMICalculatorResult
} from "@/types/calculator";

export class CalculatorService {
  static calculateSIP(input: SIPCalculatorInput): SIPCalculatorResult {
    const { monthlyInvestment, expectedReturn, investmentPeriod } = input;
    const monthlyRate = expectedReturn / 100 / 12;
    const totalMonths = investmentPeriod * 12;
    
    const totalValue = monthlyInvestment * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvestment = monthlyInvestment * totalMonths;
    const totalReturns = totalValue - totalInvestment;
    
    return {
      totalInvestment: Math.round(totalInvestment),
      totalValue: Math.round(totalValue),
      totalReturns: Math.round(totalReturns)
    };
  }

  static calculateLumpsum(input: LumpsumCalculatorInput): LumpsumCalculatorResult {
    const { initialAmount, expectedReturn, investmentPeriod } = input;
    const maturityValue = initialAmount * Math.pow(1 + expectedReturn / 100, investmentPeriod);
    const totalReturns = maturityValue - initialAmount;
    
    return {
      initialAmount,
      maturityValue: Math.round(maturityValue),
      totalReturns: Math.round(totalReturns)
    };
  }

  static calculateEMI(input: EMICalculatorInput): EMICalculatorResult {
    const { loanAmount, interestRate, loanTenure } = input;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = loanTenure * 12;
    
    const monthlyEMI = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
                       (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    const totalAmount = monthlyEMI * totalMonths;
    const totalInterest = totalAmount - loanAmount;
    
    return {
      monthlyEMI: Math.round(monthlyEMI),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    };
  }
}
