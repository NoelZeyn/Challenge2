import { createClient } from '@supabase/supabase-js';

const SUPABASE_URI = process.env.NEXT_PUBLIC_SUPABASE_URI!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(SUPABASE_URI, SUPABASE_KEY);
