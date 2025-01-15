import { createClient } from '@supabase/supabase-js';

const SUPABASE_URI = 'https://ixwifbqqxsyvmemapylm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4d2lmYnFxeHN5dm1lbWFweWxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MTg1NDEsImV4cCI6MjA1MjQ5NDU0MX0._zZmRkTSEvrlOZ9BZoGP4rhCLGwgdr0F0qfjcs5ieRE';

export const supabase = createClient(SUPABASE_URI, SUPABASE_KEY);
