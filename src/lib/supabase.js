import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  throw new Error("Supabase env vars are missing");
}

// 서버에서만 쓸 클라이언트
export const supabaseServer = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false },
});
