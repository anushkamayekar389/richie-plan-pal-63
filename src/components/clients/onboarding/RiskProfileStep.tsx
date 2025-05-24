
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface RiskProfileStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const riskQuestions = [
  {
    id: 1,
    question: "What is your investment experience?",
    options: [
      { value: "beginner", label: "Beginner - Little to no experience", score: 1 },
      { value: "intermediate", label: "Intermediate - Some experience", score: 2 },
      { value: "experienced", label: "Experienced - Extensive knowledge", score: 3 }
    ]
  },
  {
    id: 2,
    question: "How would you react to a 20% drop in your portfolio value?",
    options: [
      { value: "sell_all", label: "Sell all investments immediately", score: 1 },
      { value: "sell_some", label: "Sell some investments", score: 2 },
      { value: "hold", label: "Hold and wait for recovery", score: 3 },
      { value: "buy_more", label: "Buy more at lower prices", score: 4 }
    ]
  },
  {
    id: 3,
    question: "What is your investment time horizon?",
    options: [
      { value: "short", label: "Less than 3 years", score: 1 },
      { value: "medium", label: "3-7 years", score: 2 },
      { value: "long", label: "7-15 years", score: 3 },
      { value: "very_long", label: "More than 15 years", score: 4 }
    ]
  },
  {
    id: 4,
    question: "Which statement best describes your income situation?",
    options: [
      { value: "fixed_tight", label: "Fixed income, budget is tight", score: 1 },
      { value: "fixed_comfortable", label: "Fixed income, comfortable", score: 2 },
      { value: "variable_stable", label: "Variable but stable income", score: 3 },
      { value: "high_disposable", label: "High income with disposable surplus", score: 4 }
    ]
  },
  {
    id: 5,
    question: "What percentage of your portfolio would you allocate to high-risk investments?",
    options: [
      { value: "none", label: "0% - Safety is priority", score: 1 },
      { value: "low", label: "10-25% - Conservative approach", score: 2 },
      { value: "moderate", label: "25-50% - Balanced approach", score: 3 },
      { value: "high", label: "50%+ - Aggressive growth", score: 4 }
    ]
  }
];

export function RiskProfileStep({ data, onDataChange }: RiskProfileStepProps) {
  const [answers, setAnswers] = useState(data.risk_answers || {});
  const [riskScore, setRiskScore] = useState(0);
  const [riskProfile, setRiskProfile] = useState("");

  useEffect(() => {
    calculateRiskProfile();
  }, [answers]);

  const handleAnswerChange = (questionId: number, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    onDataChange({ 
      ...data, 
      risk_answers: newAnswers 
    });
  };

  const calculateRiskProfile = () => {
    const totalScore = Object.values(answers).reduce((sum: number, answer: any) => {
      const question = riskQuestions.find(q => q.id.toString() === Object.keys(answers).find(key => answers[key] === answer));
      const option = question?.options.find(opt => opt.value === answer);
      return sum + (option?.score || 0);
    }, 0);

    setRiskScore(totalScore);

    let profile = "";
    if (totalScore <= 8) {
      profile = "Conservative";
    } else if (totalScore <= 12) {
      profile = "Moderate";
    } else if (totalScore <= 16) {
      profile = "Aggressive";
    } else {
      profile = "Very Aggressive";
    }

    setRiskProfile(profile);
    onDataChange({ 
      ...data, 
      risk_score: totalScore,
      risk_profile: profile.toLowerCase().replace(' ', '_')
    });
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Label className="text-lg font-medium">Risk Profile Assessment</Label>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p>This questionnaire helps determine your risk tolerance for investment recommendations</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="space-y-6">
          {riskQuestions.map((question) => (
            <Card key={question.id}>
              <CardHeader>
                <CardTitle className="text-base">{question.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={answers[question.id] || ""}
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                >
                  {question.options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={`q${question.id}_${option.value}`} />
                      <Label htmlFor={`q${question.id}_${option.value}`} className="font-normal">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
        </div>

        {riskScore > 0 && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-lg">Risk Profile Result</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold">{riskProfile}</div>
                <div className="text-gray-500">Score: {riskScore} / 20</div>
                <div className="text-sm text-gray-600 mt-4">
                  {riskProfile === "Conservative" && "You prefer stable, low-risk investments with predictable returns."}
                  {riskProfile === "Moderate" && "You're comfortable with some risk for potentially higher returns."}
                  {riskProfile === "Aggressive" && "You're willing to take significant risks for higher growth potential."}
                  {riskProfile === "Very Aggressive" && "You prefer high-risk, high-reward investment strategies."}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
}
