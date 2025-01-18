import { useEffect, useState } from "react";
import SongList from "@/components/SongList";
import SongDetails from "@/components/SongDetails";

type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  url: string;
  url_yt: string;
};

export default function SongFetcher() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("/api/auth/songs");
        if (!response.ok) throw new Error("Failed to fetch songs");

        const result = await response.json();
        setSongs(result.data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-4">
        <SongList
          songs={songs}
          onSelectSong={setSelectedSong}
          selectedSongId={selectedSong?.id}
        />
      </div>
      
      {/* Song Details 70% */}
      <div className="md:col-span-8">
        <SongDetails song={selectedSong} />
      </div>
    </div>
  );
}
