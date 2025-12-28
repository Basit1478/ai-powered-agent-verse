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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          clerk_user_id: string
          created_at: string
          email: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          clerk_user_id: string
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          clerk_user_id?: string
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      agent_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      chat_history: {
        Row: {
          agent_id: string
          content: string
          created_at: string
          files: Json | null
          id: string
          message_id: string
          role: string
          user_id: string
        }
        Insert: {
          agent_id: string
          content: string
          created_at?: string
          files?: Json | null
          id?: string
          message_id?: string
          role: string
          user_id: string
        }
        Update: {
          agent_id?: string
          content?: string
          created_at?: string
          files?: Json | null
          id?: string
          message_id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      complexity_levels: {
        Row: {
          created_at: string
          description: string | null
          id: string
          multiplier: number
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          multiplier?: number
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          multiplier?: number
          name?: string
        }
        Relationships: []
      }
      custom_agents: {
        Row: {
          calculated_price: number
          category_id: string | null
          complexity_id: string | null
          created_at: string
          id: string
          industry_id: string | null
          name: string
          platform_id: string | null
          selected_features: string[] | null
          status: Database["public"]["Enums"]["agent_status"] | null
          system_prompt: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          calculated_price?: number
          category_id?: string | null
          complexity_id?: string | null
          created_at?: string
          id?: string
          industry_id?: string | null
          name: string
          platform_id?: string | null
          selected_features?: string[] | null
          status?: Database["public"]["Enums"]["agent_status"] | null
          system_prompt?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          calculated_price?: number
          category_id?: string | null
          complexity_id?: string | null
          created_at?: string
          id?: string
          industry_id?: string | null
          name?: string
          platform_id?: string | null
          selected_features?: string[] | null
          status?: Database["public"]["Enums"]["agent_status"] | null
          system_prompt?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_agents_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "agent_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "custom_agents_complexity_id_fkey"
            columns: ["complexity_id"]
            isOneToOne: false
            referencedRelation: "complexity_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "custom_agents_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "custom_agents_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
        ]
      }
      features: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_premium: boolean | null
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name: string
          price?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_premium?: boolean | null
          name?: string
          price?: number
        }
        Relationships: []
      }
      file_uploads: {
        Row: {
          created_at: string
          file_size: number | null
          file_type: string | null
          filename: string
          id: string
          storage_path: string
          user_id: string
        }
        Insert: {
          created_at?: string
          file_size?: number | null
          file_type?: string | null
          filename: string
          id?: string
          storage_path: string
          user_id: string
        }
        Update: {
          created_at?: string
          file_size?: number | null
          file_type?: string | null
          filename?: string
          id?: string
          storage_path?: string
          user_id?: string
        }
        Relationships: []
      }
      industries: {
        Row: {
          created_at: string
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      marketplace_agents: {
        Row: {
          base_price: number
          capabilities: string[] | null
          category_id: string | null
          complexity_id: string | null
          created_at: string
          description: string | null
          features: string[] | null
          id: string
          industry_id: string | null
          is_featured: boolean | null
          name: string
          platform_id: string | null
          preview_image: string | null
          purchases_count: number | null
          status: Database["public"]["Enums"]["agent_status"] | null
          system_prompt: string | null
          updated_at: string
          use_cases: string[] | null
        }
        Insert: {
          base_price?: number
          capabilities?: string[] | null
          category_id?: string | null
          complexity_id?: string | null
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          industry_id?: string | null
          is_featured?: boolean | null
          name: string
          platform_id?: string | null
          preview_image?: string | null
          purchases_count?: number | null
          status?: Database["public"]["Enums"]["agent_status"] | null
          system_prompt?: string | null
          updated_at?: string
          use_cases?: string[] | null
        }
        Update: {
          base_price?: number
          capabilities?: string[] | null
          category_id?: string | null
          complexity_id?: string | null
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          industry_id?: string | null
          is_featured?: boolean | null
          name?: string
          platform_id?: string | null
          preview_image?: string | null
          purchases_count?: number | null
          status?: Database["public"]["Enums"]["agent_status"] | null
          system_prompt?: string | null
          updated_at?: string
          use_cases?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_agents_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "agent_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_agents_complexity_id_fkey"
            columns: ["complexity_id"]
            isOneToOne: false
            referencedRelation: "complexity_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_agents_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marketplace_agents_platform_id_fkey"
            columns: ["platform_id"]
            isOneToOne: false
            referencedRelation: "platforms"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          agent_id: string | null
          agent_type: string
          created_at: string
          id: string
          invoice_number: string | null
          metadata: Json | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          payment_reference: string | null
          status: Database["public"]["Enums"]["order_status"] | null
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          agent_id?: string | null
          agent_type: string
          created_at?: string
          id?: string
          invoice_number?: string | null
          metadata?: Json | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_reference?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          agent_id?: string | null
          agent_type?: string
          created_at?: string
          id?: string
          invoice_number?: string | null
          metadata?: Json | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_reference?: string | null
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      platforms: {
        Row: {
          base_price: number | null
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          base_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          base_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          conversations_used: number | null
          created_at: string
          credits: number | null
          email: string | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          last_reset_date: string | null
          plan: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          conversations_used?: number | null
          created_at?: string
          credits?: number | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          last_reset_date?: string | null
          plan?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          conversations_used?: number | null
          created_at?: string
          credits?: number | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          last_reset_date?: string | null
          plan?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      Startup: {
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
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_name: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name: string
          status: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_name?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      support_requests: {
        Row: {
          admin_response: string | null
          agent_id: string | null
          created_at: string
          id: string
          message: string
          priority: string | null
          status: string | null
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_response?: string | null
          agent_id?: string | null
          created_at?: string
          id?: string
          message: string
          priority?: string | null
          status?: string | null
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_response?: string | null
          agent_id?: string | null
          created_at?: string
          id?: string
          message?: string
          priority?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      survey_responses: {
        Row: {
          created_at: string
          id: string
          responses: Json
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          responses: Json
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          responses?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_agents: {
        Row: {
          agent_id: string | null
          agent_type: string
          api_key: string | null
          configuration: Json | null
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          order_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          agent_id?: string | null
          agent_type: string
          api_key?: string | null
          configuration?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          order_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          agent_id?: string | null
          agent_type?: string
          api_key?: string | null
          configuration?: Json | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          order_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_agents_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      voice_settings: {
        Row: {
          auto_speak: boolean | null
          created_at: string
          id: string
          language_code: string | null
          preferred_voice: string | null
          updated_at: string
          user_id: string
          voice_pitch: number | null
          voice_speed: number | null
        }
        Insert: {
          auto_speak?: boolean | null
          created_at?: string
          id?: string
          language_code?: string | null
          preferred_voice?: string | null
          updated_at?: string
          user_id: string
          voice_pitch?: number | null
          voice_speed?: number | null
        }
        Update: {
          auto_speak?: boolean | null
          created_at?: string
          id?: string
          language_code?: string | null
          preferred_voice?: string | null
          updated_at?: string
          user_id?: string
          voice_pitch?: number | null
          voice_speed?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_and_increment_conversation: {
        Args: { user_id_param: string }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      reset_monthly_conversations: { Args: never; Returns: undefined }
    }
    Enums: {
      agent_status: "draft" | "published" | "archived"
      app_role: "admin" | "moderator" | "user"
      order_status: "pending" | "paid" | "failed" | "refunded"
      payment_method: "card" | "jazzcash" | "easypaisa" | "bank_transfer"
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
    Enums: {
      agent_status: ["draft", "published", "archived"],
      app_role: ["admin", "moderator", "user"],
      order_status: ["pending", "paid", "failed", "refunded"],
      payment_method: ["card", "jazzcash", "easypaisa", "bank_transfer"],
    },
  },
} as const
