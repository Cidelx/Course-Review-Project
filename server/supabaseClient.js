import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

console.log("SUPABASE_URL VALUE:", supabaseUrl);
console.log("SUPABASE_KEY VALUE:", supabaseKey ? "***hidden***" : "undefined");

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials in environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
