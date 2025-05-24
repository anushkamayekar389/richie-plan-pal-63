
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ClientFormData } from "../EnhancedClientOnboarding";

interface ClientFinancialInfoProps {
  formData: ClientFormData;
  updateFormData: (updates: Partial<ClientFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ClientFinancialInfo = ({ formData, updateFormData, onNext, onPrev }: ClientFinancialInfoProps) => {
  const form = useForm({
    defaultValues: {
      monthly_income: formData.monthly_income,
      additional_income: formData.additional_income,
      monthly_expenses: formData.monthly_expenses,
      total_assets: formData.total_assets,
      total_liabilities: formData.total_liabilities,
      emergency_fund: formData.emergency_fund,
    },
  });

  const onSubmit = (values: any) => {
    updateFormData({
      monthly_income: Number(values.monthly_income),
      additional_income: Number(values.additional_income),
      monthly_expenses: Number(values.monthly_expenses),
      total_assets: Number(values.total_assets),
      total_liabilities: Number(values.total_liabilities),
      emergency_fund: Number(values.emergency_fund),
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Financial Information</h3>
        <p className="text-sm text-gray-600">Help us understand your client's financial situation</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-3">Income Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="monthly_income"
                rules={{ required: "Monthly income is required", min: { value: 0, message: "Must be positive" } }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Income (₹) *</FormLabel>
                    <FormControl>
                      <Input placeholder="50000" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additional_income"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Income (₹)</FormLabel>
                    <FormControl>
                      <Input placeholder="10000" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-medium text-red-900 mb-3">Expenses</h4>
            <FormField
              control={form.control}
              name="monthly_expenses"
              rules={{ required: "Monthly expenses is required", min: { value: 0, message: "Must be positive" } }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Expenses (₹) *</FormLabel>
                  <FormControl>
                    <Input placeholder="35000" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-3">Assets & Liabilities</h4>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="total_assets"
                rules={{ min: { value: 0, message: "Must be positive" } }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Assets (₹)</FormLabel>
                    <FormControl>
                      <Input placeholder="500000" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="total_liabilities"
                rules={{ min: { value: 0, message: "Must be positive" } }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Liabilities (₹)</FormLabel>
                    <FormControl>
                      <Input placeholder="200000" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-medium text-amber-900 mb-3">Emergency Fund</h4>
            <FormField
              control={form.control}
              name="emergency_fund"
              rules={{ min: { value: 0, message: "Must be positive" } }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Emergency Fund (₹)</FormLabel>
                  <FormControl>
                    <Input placeholder="100000" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onPrev}>
              Previous
            </Button>
            <Button type="submit">
              Next: Goals & Risk Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
