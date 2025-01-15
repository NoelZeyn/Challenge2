type Song = {
    id: string;
    title: string;
    artist: string;
    album: string;
    url: string;
  };
  
  export default function SongList({
    songs,
    onSelectSong,
    selectedSongId,
  }: {
    songs: Song[];
    onSelectSong: (song: Song) => void;
    selectedSongId: string | undefined;
  }) {
    return (
      <div className="bg-white shadow-md rounded-md p-4 overflow-y-auto max-h-[60vh]">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Song List</h2>
        <ul>
          {songs.map((song) => (
            <li
              key={song.id}
              onClick={() => onSelectSong(song)}
              className={`p-3 rounded-md cursor-pointer transition-all ${
                selectedSongId === song.id
                  ? "bg-teal-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <h3 className="text-md font-semibold">{song.title}</h3>
              <p className="text-sm text-gray-600">{song.artist}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  