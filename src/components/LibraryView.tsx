import { Track } from '@/types/music';
import { musicLibrary } from '@/data/musicLibrary';
import { Play } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface LibraryViewProps {
  onTrackSelect: (track: Track) => void;
}

export const LibraryView = ({ onTrackSelect }: LibraryViewProps) => {
  // Group tracks by album
  const albums = musicLibrary.reduce((acc, track) => {
    if (!acc[track.album]) {
      acc[track.album] = {
        name: track.album,
        artist: track.artist,
        coverArt: track.coverArt,
        tracks: [],
      };
    }
    acc[track.album].tracks.push(track);
    return acc;
  }, {} as Record<string, { name: string; artist: string; coverArt: string; tracks: Track[] }>);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Object.values(albums).map((album) => (
        <Card
          key={album.name}
          className="group bg-card/95 backdrop-blur-xl border-border p-4 cursor-pointer hover:bg-player-hover transition-all hover:shadow-glow"
          onClick={() => onTrackSelect(album.tracks[0])}
        >
          <div className="relative mb-4">
            <img
              src={album.coverArt}
              alt={album.name}
              className="w-full aspect-square rounded-lg object-cover shadow-card"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-glow">
                <Play className="h-5 w-5 fill-current ml-0.5" />
              </div>
            </div>
          </div>
          <h3 className="font-semibold truncate mb-1">{album.name}</h3>
          <p className="text-sm text-muted-foreground truncate">{album.artist}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {album.tracks.length} {album.tracks.length === 1 ? 'song' : 'songs'}
          </p>
        </Card>
      ))}
    </div>
  );
};
