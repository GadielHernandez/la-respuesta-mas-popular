export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: Record<string, never>
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

// Note: This file contains placeholder types
// When database tables are created, regenerate types using:
// npx supabase gen types typescript --project-id <project-id> > lib/supabase/types.ts
