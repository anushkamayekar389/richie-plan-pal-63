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
      financial_data: {
        Row: {
          actual_savings: number
          created_at: string
          fixed_deposits: number
          id: string
          monthly_expenses: number
          monthly_income: number
          mutual_funds: number
          real_estate: number
          required_savings: number
          stocks: number
          updated_at: string
          user_id: string
        }
        Insert: {
          actual_savings?: number
          created_at?: string
          fixed_deposits?: number
          id?: string
          monthly_expenses?: number
          monthly_income?: number
          mutual_funds?: number
          real_estate?: number
          required_savings?: number
          stocks?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          actual_savings?: number
          created_at?: string
          fixed_deposits?: number
          id?: string
          monthly_expenses?: number
          monthly_income?: number
          mutual_funds?: number
          real_estate?: number
          required_savings?: number
          stocks?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      financial_insights: {
        Row: {
          created_at: string
          expense_to_income_ratio: number
          financial_health_score: number
          id: string
          insights: string
          investment_to_income_ratio: number
          monthly_expenses: number
          monthly_income: number
          mutual_funds_percentage: number | null
          real_estate_percentage: number | null
          recommendations: Json
          risk_details: string
          risk_level: string
          savings_rate: number
          stocks_percentage: number | null
          total_investments: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expense_to_income_ratio: number
          financial_health_score: number
          id?: string
          insights: string
          investment_to_income_ratio: number
          monthly_expenses: number
          monthly_income: number
          mutual_funds_percentage?: number | null
          real_estate_percentage?: number | null
          recommendations: Json
          risk_details: string
          risk_level: string
          savings_rate: number
          stocks_percentage?: number | null
          total_investments: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expense_to_income_ratio?: number
          financial_health_score?: number
          id?: string
          insights?: string
          investment_to_income_ratio?: number
          monthly_expenses?: number
          monthly_income?: number
          mutual_funds_percentage?: number | null
          real_estate_percentage?: number | null
          recommendations?: Json
          risk_details?: string
          risk_level?: string
          savings_rate?: number
          stocks_percentage?: number | null
          total_investments?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      "user details": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      user_concerns: {
        Row: {
          concern: string
          created_at: string
          id: string
          priority: string | null
          user_id: string
        }
        Insert: {
          concern: string
          created_at?: string
          id?: string
          priority?: string | null
          user_id: string
        }
        Update: {
          concern?: string
          created_at?: string
          id?: string
          priority?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_debts: {
        Row: {
          amount: number
          created_at: string
          due_date: string | null
          id: string
          interest_rate: number | null
          is_paid: boolean | null
          name: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          due_date?: string | null
          id?: string
          interest_rate?: number | null
          is_paid?: boolean | null
          name: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string | null
          id?: string
          interest_rate?: number | null
          is_paid?: boolean | null
          name?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_goals: {
        Row: {
          category: string | null
          created_at: string
          current_amount: number | null
          deadline: string | null
          description: string | null
          id: string
          is_completed: boolean | null
          target_amount: number | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          current_amount?: number | null
          deadline?: string | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          target_amount?: number | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          current_amount?: number | null
          deadline?: string | null
          description?: string | null
          id?: string
          is_completed?: boolean | null
          target_amount?: number | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_profile: {
        Args: Record<PropertyKey, never>
        Returns: {
          age: number | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          username: string | null
        }[]
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
