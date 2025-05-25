export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      calendar_events: {
        Row: {
          client_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          event_date: string
          event_time: string | null
          id: string
          location: string | null
          title: string
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date: string
          event_time?: string | null
          id?: string
          location?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          event_date?: string
          event_time?: string | null
          id?: string
          location?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_financial_data: {
        Row: {
          additional_income: number
          client_id: string | null
          created_at: string | null
          emergency_fund: number
          id: string
          monthly_expenses: number
          monthly_income: number
          total_assets: number
          total_liabilities: number
          updated_at: string | null
        }
        Insert: {
          additional_income?: number
          client_id?: string | null
          created_at?: string | null
          emergency_fund?: number
          id?: string
          monthly_expenses?: number
          monthly_income?: number
          total_assets?: number
          total_liabilities?: number
          updated_at?: string | null
        }
        Update: {
          additional_income?: number
          client_id?: string | null
          created_at?: string | null
          emergency_fund?: number
          id?: string
          monthly_expenses?: number
          monthly_income?: number
          total_assets?: number
          total_liabilities?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_financial_data_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_onboarding_data: {
        Row: {
          auto_filled_fields: string[] | null
          client_id: string | null
          created_at: string
          data_quality_score: number | null
          id: string
          import_metadata: Json | null
          manual_overrides: string[] | null
          onboarding_data: Json
          source: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          auto_filled_fields?: string[] | null
          client_id?: string | null
          created_at?: string
          data_quality_score?: number | null
          id?: string
          import_metadata?: Json | null
          manual_overrides?: string[] | null
          onboarding_data: Json
          source?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          auto_filled_fields?: string[] | null
          client_id?: string | null
          created_at?: string
          data_quality_score?: number | null
          id?: string
          import_metadata?: Json | null
          manual_overrides?: string[] | null
          onboarding_data?: Json
          source?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_onboarding_data_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          age: number | null
          annual_income: number | null
          city: string | null
          created_at: string
          data_source: string | null
          date_of_birth: string | null
          dependents: number | null
          email: string
          employer: string | null
          first_name: string
          gender: string | null
          id: string
          investment_experience: string | null
          last_name: string
          occupation: string | null
          onboarding_completed: boolean | null
          pan_number: string | null
          phone: string | null
          pincode: string | null
          risk_tolerance: string | null
          state: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          age?: number | null
          annual_income?: number | null
          city?: string | null
          created_at?: string
          data_source?: string | null
          date_of_birth?: string | null
          dependents?: number | null
          email: string
          employer?: string | null
          first_name: string
          gender?: string | null
          id?: string
          investment_experience?: string | null
          last_name: string
          occupation?: string | null
          onboarding_completed?: boolean | null
          pan_number?: string | null
          phone?: string | null
          pincode?: string | null
          risk_tolerance?: string | null
          state?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          age?: number | null
          annual_income?: number | null
          city?: string | null
          created_at?: string
          data_source?: string | null
          date_of_birth?: string | null
          dependents?: number | null
          email?: string
          employer?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          investment_experience?: string | null
          last_name?: string
          occupation?: string | null
          onboarding_completed?: boolean | null
          pan_number?: string | null
          phone?: string | null
          pincode?: string | null
          risk_tolerance?: string | null
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      financial_plan_documents: {
        Row: {
          client_id: string | null
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_plan_documents_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_plans: {
        Row: {
          added_by: string
          client_id: string
          created_at: string
          id: string
          plan_data: Json
          plan_name: string
          status: string
          updated_at: string
        }
        Insert: {
          added_by?: string
          client_id: string
          created_at?: string
          id?: string
          plan_data: Json
          plan_name: string
          status?: string
          updated_at?: string
        }
        Update: {
          added_by?: string
          client_id?: string
          created_at?: string
          id?: string
          plan_data?: Json
          plan_name?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_plans_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      insurance_plans: {
        Row: {
          client_id: string
          cover_amount: number
          created_at: string
          features: Json | null
          id: string
          is_recommended: boolean | null
          name: string
          plan_type: string
          premium: number
          updated_at: string
        }
        Insert: {
          client_id: string
          cover_amount: number
          created_at?: string
          features?: Json | null
          id?: string
          is_recommended?: boolean | null
          name: string
          plan_type: string
          premium: number
          updated_at?: string
        }
        Update: {
          client_id?: string
          cover_amount?: number
          created_at?: string
          features?: Json | null
          id?: string
          is_recommended?: boolean | null
          name?: string
          plan_type?: string
          premium?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "insurance_plans_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      investment_plans: {
        Row: {
          allocation: Json
          client_id: string
          created_at: string
          expected_return: number | null
          id: string
          is_recommended: boolean | null
          name: string
          risk_level: string
          risk_profile_id: string
          updated_at: string
          value: number | null
        }
        Insert: {
          allocation: Json
          client_id: string
          created_at?: string
          expected_return?: number | null
          id?: string
          is_recommended?: boolean | null
          name: string
          risk_level: string
          risk_profile_id: string
          updated_at?: string
          value?: number | null
        }
        Update: {
          allocation?: Json
          client_id?: string
          created_at?: string
          expected_return?: number | null
          id?: string
          is_recommended?: boolean | null
          name?: string
          risk_level?: string
          risk_profile_id?: string
          updated_at?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "investment_plans_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investment_plans_risk_profile_id_fkey"
            columns: ["risk_profile_id"]
            isOneToOne: false
            referencedRelation: "risk_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          profile_picture: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          profile_picture?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          profile_picture?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      risk_profiles: {
        Row: {
          client_id: string
          created_at: string
          id: string
          investment_horizon: string
          investment_knowledge: string
          market_volatility: string
          portfolio_loss: string
          risk_profile: string
          risk_tolerance: string
          risk_tolerance_score: number
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          investment_horizon: string
          investment_knowledge: string
          market_volatility: string
          portfolio_loss: string
          risk_profile: string
          risk_tolerance: string
          risk_tolerance_score: number
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          investment_horizon?: string
          investment_knowledge?: string
          market_volatility?: string
          portfolio_loss?: string
          risk_profile?: string
          risk_tolerance?: string
          risk_tolerance_score?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "risk_profiles_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_client_financial_data: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_risk_profile: {
        Args: { score: number }
        Returns: string
      }
      update_investment_plan_values: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
