import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Mendapatkan semua lagu
export async function GET() {
  const { data, error } = await supabase.from('songs').select('*');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: Menambahkan lagu baru
export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase.from('songs').insert([body]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
