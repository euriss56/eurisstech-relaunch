import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

// Untyped client used for the billing tables (clients, invoices, invoice_items)
// while the generated database types are refreshed.
export const db = supabase as unknown as SupabaseClient;
