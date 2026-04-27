export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      flight_searches: {
        Row: {
          adults: number
          children: number | null
          created_at: string
          currency_code: string | null
          departure_date: string
          destination_code: string | null
          id: string
          infants: number | null
          origin_code: string
          results_count: number | null
          return_date: string | null
          search_metadata: Json | null
          travel_class: string | null
          trip_type: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          adults?: number
          children?: number | null
          created_at?: string
          currency_code?: string | null
          departure_date: string
          destination_code?: string | null
          id?: string
          infants?: number | null
          origin_code: string
          results_count?: number | null
          return_date?: string | null
          search_metadata?: Json | null
          travel_class?: string | null
          trip_type: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          adults?: number
          children?: number | null
          created_at?: string
          currency_code?: string | null
          departure_date?: string
          destination_code?: string | null
          id?: string
          infants?: number | null
          origin_code?: string
          results_count?: number | null
          return_date?: string | null
          search_metadata?: Json | null
          travel_class?: string | null
          trip_type?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      multicity_legs: {
        Row: {
          created_at: string
          departure_date: string
          destination_code: string
          id: string
          leg_number: number
          origin_code: string
          search_id: string
        }
        Insert: {
          created_at?: string
          departure_date: string
          destination_code: string
          id?: string
          leg_number: number
          origin_code: string
          search_id: string
        }
        Update: {
          created_at?: string
          departure_date?: string
          destination_code?: string
          id?: string
          leg_number?: number
          origin_code?: string
          search_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "multicity_legs_search_id_fkey"
            columns: ["search_id"]
            isOneToOne: false
            referencedRelation: "flight_searches"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_flight_offers: {
        Row: {
          created_at: string
          id: string
          offer_data: Json
          price_amount: number | null
          price_currency: string | null
          search_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          offer_data: Json
          price_amount?: number | null
          price_currency?: string | null
          search_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          offer_data?: Json
          price_amount?: number | null
          price_currency?: string | null
          search_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_flight_offers_search_id_fkey"
            columns: ["search_id"]
            isOneToOne: false
            referencedRelation: "flight_searches"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
