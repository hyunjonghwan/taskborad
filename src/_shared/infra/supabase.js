import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const getSupabaseServer = () => {
  if (!supabaseUrl || !serviceKey) {
    return {
      client: null,
      error:
        "Supabase env vars are missing. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  return {
    client: createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false },
    }),
    error: null,
  };
};
