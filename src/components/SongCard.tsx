type Song = {
    id: string;
    title: string;
    artist: string;
    album: string;
  };
  
  export default function SongCard({ song }: { song: Song }) {
    return (
      <div className="bg-white shadow-md p-4 rounded-md">
        <h2 className="text-xl font-bold">{song.title}</h2>
        <p className="text-gray-600">{song.artist}</p>
        <p className="text-gray-400">{song.album}</p>
      </div>
    );
  }
  