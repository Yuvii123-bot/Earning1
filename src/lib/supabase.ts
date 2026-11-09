import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://ylrhenrcbpidajhlxkuo.supabase.co";

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlscmhlbnJjYnBpZGFqaGx4a3VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQwNTcyMTUsImV4cCI6MjEwOTYzMzIxNX0.fy-M25GEPVmGj2Gdb5aNvwQ3zqp7dIMyCeTdxYz3O_4";

export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey);

export function getSupabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}
