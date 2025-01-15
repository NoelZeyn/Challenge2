import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import SongList from "@/components/SongList";
import SongDetails from "@/components/SongDetails";

type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  url: string;
};

export default function SongFetcher() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase.from("songs").select("*");
      if (error) console.error(error);
      else setSongs(data as Song[]);
    };

    fetchSongs();
  }, []);

  return (
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Song List 30% */}
      <div className="md:col-span-4">
        <SongList songs={songs} onSelectSong={setSelectedSong} selectedSongId={selectedSong?.id} />
      </div>
      
      {/* Song Details 70% */}
      <div className="md:col-span-8">
        <SongDetails song={selectedSong} />
      </div>
    </div>
  );
}
