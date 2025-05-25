
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export function useFinancialDataMutation(clientId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clientId: string) => {
      console.log('Starting financial data creation for client:', clientId);
      
      // First, verify the client exists
      console.log('Verifying client exists...');
      const { data: clientCheck, error: clientError } = await supabase
        .from('clients')
        .select('id, first_name, last_name')
        .eq('id', clientId)
        .single();

      if (clientError) {
        console.error('Client verification failed:', clientError);
        throw new Error(`Client verification failed: ${clientError.message}`);
      }

      if (!clientCheck) {
        console.error('Client not found:', clientId);
        throw new Error('Client not found');
      }

      console.log('Client verified:', clientCheck);

      // Check if financial data already exists
      console.log('Checking for existing financial data...');
      const { data: existingData, error: existingError } = await supabase
        .from('client_financial_data')
        .select('id')
        .eq('client_id', clientId)
        .single();

      if (existingError && existingError.code !== 'PGRST116') {
        console.error('Error checking existing financial data:', existingError);
        throw new Error(`Error checking existing data: ${existingError.message}`);
      }

      if (existingData) {
        console.log('Financial data already exists for this client');
        throw new Error('Financial data already exists for this client');
      }

      // Prepare and validate data
      const defaultData = {
        client_id: clientId,
        monthly_income: 50000,
        monthly_expenses: 30000,
        total_assets: 100000,
        total_liabilities: 20000,
        emergency_fund: 30000,
        additional_income: 0
      };

      console.log('Prepared financial data:', defaultData);

      // Validate required fields
      if (!defaultData.client_id) {
        throw new Error('Client ID is required');
      }

      if (typeof defaultData.monthly_income !== 'number' || defaultData.monthly_income < 0) {
        throw new Error('Valid monthly income is required');
      }

      console.log('Data validation passed, inserting into database...');

      // Insert the financial data
      const { data, error } = await supabase
        .from('client_financial_data')
        .insert(defaultData)
        .select()
        .single();

      if (error) {
        console.error('Database insertion error:', {
          error,
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        
        // Provide specific error messages based on error type
        if (error.code === '23503') {
          throw new Error('Client reference not found. Please ensure the client exists.');
        } else if (error.code === '23505') {
          throw new Error('Financial data already exists for this client.');
        } else if (error.code === '42501') {
          throw new Error('Permission denied. Please check your access rights.');
        } else {
          throw new Error(`Database error (${error.code}): ${error.message}`);
        }
      }

      console.log('Financial data created successfully:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('Financial data creation succeeded:', data);
      queryClient.invalidateQueries({ queryKey: ['client-financial-data', clientId] });
      toast({
        title: "Financial data created",
        description: "Default financial data has been created for this client",
      });
    },
    onError: (error) => {
      console.error('Financial data creation failed:', error);
      toast({
        title: "Error creating financial data",
        description: error instanceof Error ? error.message : "Failed to create financial data",
        variant: "destructive",
      });
    }
  });
}
