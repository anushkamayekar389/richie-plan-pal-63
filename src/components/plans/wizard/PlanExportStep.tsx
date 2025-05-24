
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Download, 
  Mail, 
  Eye, 
  Upload,
  Building,
  Signature,
  FileText
} from "lucide-react";
import { GeneratedFinancialPlan } from "@/services/financialPlanGenerator";

interface PlanExportStepProps {
  plan: GeneratedFinancialPlan;
  customizations: any;
  clientName: string;
}

export function PlanExportStep({ plan, customizations, clientName }: PlanExportStepProps) {
  const [firmDetails, setFirmDetails] = useState({
    name: "Your Financial Advisory Firm",
    logo: "",
    address: "",
    phone: "",
    email: "",
    license: ""
  });
  const [advisorDetails, setAdvisorDetails] = useState({
    name: "Your Name",
    designation: "Financial Advisor",
    signature: "",
    credentials: ""
  });

  const handleDownloadPDF = () => {
    console.log("Downloading PDF with firm branding:", firmDetails);
    // PDF generation logic will be implemented
  };

  const handleEmailShare = () => {
    console.log("Sending email to client:", clientName);
    // Email sharing logic will be implemented
  };

  const handlePreview = () => {
    console.log("Opening white-labeled preview");
    // Preview logic will be implemented
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Brand & Export Your Plan</h3>
        <p className="text-gray-600">Add your firm's branding and export the plan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Firm Branding */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="w-5 h-5" />
              <span>Firm Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="firm_name">Firm Name</Label>
              <Input
                id="firm_name"
                value={firmDetails.name}
                onChange={(e) => setFirmDetails({...firmDetails, name: e.target.value})}
                placeholder="Your Financial Advisory Firm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="firm_logo">Logo Upload</Label>
              <div className="flex items-center space-x-2">
                <Input id="firm_logo" type="file" accept="image/*" />
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="firm_address">Address</Label>
              <Textarea
                id="firm_address"
                value={firmDetails.address}
                onChange={(e) => setFirmDetails({...firmDetails, address: e.target.value})}
                placeholder="123 Business Street, Mumbai, Maharashtra"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="space-y-2">
                <Label htmlFor="firm_phone">Phone</Label>
                <Input
                  id="firm_phone"
                  value={firmDetails.phone}
                  onChange={(e) => setFirmDetails({...firmDetails, phone: e.target.value})}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="firm_email">Email</Label>
                <Input
                  id="firm_email"
                  type="email"
                  value={firmDetails.email}
                  onChange={(e) => setFirmDetails({...firmDetails, email: e.target.value})}
                  placeholder="contact@yourfirm.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="firm_license">SEBI License / Registration</Label>
              <Input
                id="firm_license"
                value={firmDetails.license}
                onChange={(e) => setFirmDetails({...firmDetails, license: e.target.value})}
                placeholder="INP000012345"
              />
            </div>
          </CardContent>
        </Card>

        {/* Advisor Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Signature className="w-5 h-5" />
              <span>Advisor Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="advisor_name">Advisor Name</Label>
              <Input
                id="advisor_name"
                value={advisorDetails.name}
                onChange={(e) => setAdvisorDetails({...advisorDetails, name: e.target.value})}
                placeholder="Your Full Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="advisor_designation">Designation</Label>
              <Input
                id="advisor_designation"
                value={advisorDetails.designation}
                onChange={(e) => setAdvisorDetails({...advisorDetails, designation: e.target.value})}
                placeholder="Senior Financial Advisor"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="advisor_credentials">Credentials</Label>
              <Input
                id="advisor_credentials"
                value={advisorDetails.credentials}
                onChange={(e) => setAdvisorDetails({...advisorDetails, credentials: e.target.value})}
                placeholder="CFP, FRM, CFA"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="advisor_signature">Digital Signature</Label>
              <div className="flex items-center space-x-2">
                <Input id="advisor_signature" type="file" accept="image/*" />
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Plan Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                ₹{plan.summary.currentNetWorth.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Current Net Worth</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                ₹{plan.summary.projectedNetWorth.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Projected Net Worth</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                ₹{plan.summary.monthlyInvestment.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">Monthly Investment</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {plan.summary.riskScore}/10
              </div>
              <div className="text-sm text-gray-500">Risk Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handlePreview} variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview Plan
            </Button>
            <Button onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={handleEmailShare} variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Email to Client
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
