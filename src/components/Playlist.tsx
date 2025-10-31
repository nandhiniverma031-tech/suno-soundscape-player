import { Track } from '@/types/music';
import { Play, Pause } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PlaylistProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const Playlist = ({ tracks, currentTrack, isPlaying, onTrackSelect }: PlaylistProps) => {
  return (
    <div className="rounded-xl bg-player-surface border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Playlist</h2>
        <p className="text-sm text-muted-foreground">{tracks.length} songs</p>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="p-2">
          {tracks.map((track) => {
            const isCurrentTrack = currentTrack?.id === track.id;
            return (
              <button
                key={track.id}
                onClick={() => onTrackSelect(track)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isCurrentTrack
                    ? 'bg-player-hover'
                    : 'hover:bg-player-hover/50'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={track.coverArt}
                    alt={track.album}
                    className="h-12 w-12 rounded object-cover"
                  />
                  {isCurrentTrack && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded">
                      {isPlaying ? (
                        <Pause className="h-4 w-4 text-primary fill-current" />
                      ) : (
                        <Play className="h-4 w-4 text-primary fill-current" />
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div
                    className={`text-sm font-medium truncate ${
                      isCurrentTrack ? 'text-primary' : 'text-foreground'
                    }`}
                  >
                    {track.title}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {track.artist}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDuration(track.duration)}
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
