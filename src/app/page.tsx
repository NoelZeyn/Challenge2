"use client"
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import SongCard from '@/components/SongCard';

type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
};

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]); // Use Song[] instead of any[]

  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase.from('songs').select('*');
      if (error) console.error(error);
      else setSongs(data as Song[]); // Type assertion to Song[]
    };

    fetchSongs();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Songs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
