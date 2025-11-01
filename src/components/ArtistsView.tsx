import { Track } from '@/types/music';
import { musicLibrary } from '@/data/musicLibrary';
import { Play, Music2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ArtistsViewProps {
  onTrackSelect: (track: Track) => void;
}

export const ArtistsView = ({ onTrackSelect }: ArtistsViewProps) => {
  // Group tracks by artist
  const artists = musicLibrary.reduce((acc, track) => {
    if (!acc[track.artist]) {
      acc[track.artist] = {
        name: track.artist,
        coverArt: track.coverArt,
        tracks: [],
      };
    }
    acc[track.artist].tracks.push(track);
    return acc;
  }, {} as Record<string, { name: string; coverArt: string; tracks: Track[] }>);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {Object.values(artists).map((artist) => (
        <Card
          key={artist.name}
          className="group bg-card/30 backdrop-blur-2xl border border-white/10 p-4 cursor-pointer hover:bg-white/10 transition-all hover:shadow-glow"
          onClick={() => onTrackSelect(artist.tracks[0])}
        >
          <div className="relative mb-4">
            <div className="w-full aspect-square rounded-full overflow-hidden shadow-card">
              <img
                src={artist.coverArt}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-glow">
                <Play className="h-5 w-5 fill-current ml-0.5" />
              </div>
            </div>
          </div>
          <h3 className="font-semibold truncate mb-1 text-center">{artist.name}</h3>
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Music2 className="h-3 w-3" />
            <span>{artist.tracks.length} {artist.tracks.length === 1 ? 'song' : 'songs'}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};
