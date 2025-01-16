import Link from "next/link";
import Image from "next/image";

type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  url: string;
  url_yt: string;
};

export default function SongDetails({ song }: { song: Song | null }) {
  return (
    <div className="bg-white shadow-md rounded-md p-6 flex flex-col items-center justify-center">
      {song ? (
        <>
          <div className="w-32 h-32 bg-gray-100 rounded-md overflow-hidden mb-4">
            <Image
              src="/wot.jpg"
              alt={`${song.album} cover`}
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{song.title}</h2>
          <p className="text-md text-gray-600">{song.artist}</p>
          <p className="text-sm text-gray-400 mb-4">{song.album}</p>

          {/* Audio dengan kunci unik */}
          {song ? (
            <audio controls className="w-full" key={song.id}>
              <source src={song.url} type="audio/mpeg" />
            </audio>
          ) : (
            <p className="text-gray-600">Audio not available</p>
          )}

          <Link
            href={song.url_yt}
            target="_blank"
            className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors"
          >
            Open in YouTube Music
          </Link>
        </>
      ) : (
        <p className="text-gray-600">Select a song to see details</p>
      )}
    </div>
  );
}
