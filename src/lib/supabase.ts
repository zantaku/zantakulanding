import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Client
 * ------------------
 * SECURITY NOTES:
 * - The anon key is safe to use in the browser but is read-only by default
 * - NEVER use the service role key in the browser
 * - Ensure Row Level Security (RLS) is enabled in Supabase
 * - Create appropriate security policies in Supabase dashboard
 * 
 * For more information, see: https://supabase.com/docs/guides/auth/row-level-security
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 