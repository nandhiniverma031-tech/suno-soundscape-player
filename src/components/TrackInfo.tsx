import { Track } from '@/types/music';
import { Music } from 'lucide-react';

interface TrackInfoProps {
  track: Track | null;
}

export const TrackInfo = ({ track }: TrackInfoProps) => {
  if (!track) {
    return (
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-lg bg-player-surface flex items-center justify-center">
          <Music className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">No track selected</div>
          <div className="text-xs text-muted-foreground">Select a song to play</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <img
        src={track.coverArt}
        alt={track.album}
        className="h-14 w-14 rounded-lg object-cover shadow-card"
      />
      <div className="min-w-0">
        <div className="text-sm font-medium truncate">{track.title}</div>
        <div className="text-xs text-muted-foreground truncate">{track.artist}</div>
      </div>
    </div>
  );
};
