
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type Client } from "@/hooks/use-clients";

export function useClientDataFetching(client: Client) {
  // Fetch client's financial data with improved error handling
  const { data: financialData, isLoading: financialLoading, error: financialError } = useQuery({
    queryKey: ['client-financial-data', client.id],
    queryFn: async () => {
      try {
        console.log('Fetching financial data for client:', client.id);
        const { data, error } = await supabase
          .from('client_financial_data')
          .select('*')
          .eq('client_id', client.id)
          .maybeSingle();
        
        if (error) {
          console.error('Financial data query error:', error);
          throw error;
        }
        console.log('Financial data fetched successfully:', data);
        return data;
      } catch (error) {
        console.error('Error fetching financial data:', error);
        return null;
      }
    },
    retry: 1
  });

  // Fetch client's risk profile
  const { data: riskProfile, isLoading: riskLoading } = useQuery({
    queryKey: ['risk-profile', client.id],
    queryFn: async () => {
      try {
        console.log('Fetching risk profile for client:', client.id);
        const { data, error } = await supabase
          .from('risk_profiles')
          .select('*')
          .eq('client_id', client.id)
          .maybeSingle();
        
        if (error) {
          console.error('Risk profile query error:', error);
          return null;
        }
        console.log('Risk profile fetched successfully:', data);
        return data;
      } catch (error) {
        console.error('Error fetching risk profile:', error);
        return null;
      }
    },
    retry: 1
  });

  return {
    financialData,
    financialLoading,
    financialError,
    riskProfile,
    riskLoading,
    isLoading: financialLoading || riskLoading
  };
}
