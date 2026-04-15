import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_key';

// Keep this flexible: it initializes with placeholders or missing keys
// which can be replaced by real environment variables later.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
