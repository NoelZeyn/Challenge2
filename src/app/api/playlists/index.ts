import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Mendapatkan semua playlist
export async function GET() {
  const { data, error } = await supabase.from('playlists').select(`
    id, name, user_id, songs (
      id, title, artist
    )
  `);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST: Menambahkan playlist baru
export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase.from('playlists').insert([body]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
