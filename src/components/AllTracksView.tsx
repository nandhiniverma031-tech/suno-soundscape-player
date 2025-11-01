import { Track } from '@/types/music';
import { musicLibrary } from '@/data/musicLibrary';
import { Play, Pause, Clock } from 'lucide-react';

interface AllTracksViewProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onTrackSelect: (track: Track) => void;
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const AllTracksView = ({ currentTrack, isPlaying, onTrackSelect }: AllTracksViewProps) => {
  return (
    <div className="rounded-xl bg-card/30 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-glow">
      {/* Header */}
      <div className="grid grid-cols-[40px,1fr,200px,80px] gap-4 p-4 border-b border-white/10 text-sm text-muted-foreground">
        <div className="text-center">#</div>
        <div>Title</div>
        <div>Album</div>
        <div className="flex items-center justify-end">
          <Clock className="h-4 w-4" />
        </div>
      </div>

      {/* Track List */}
      <div className="divide-y divide-white/5">
        {musicLibrary.map((track, index) => {
          const isCurrentTrack = currentTrack?.id === track.id;
          return (
            <button
              key={track.id}
              onClick={() => onTrackSelect(track)}
              className={`w-full grid grid-cols-[40px,1fr,200px,80px] gap-4 p-4 items-center transition-all ${
                isCurrentTrack
                  ? 'bg-white/10'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="text-center text-sm">
                {isCurrentTrack && isPlaying ? (
                  <div className="flex items-center justify-center">
                    <div className="flex gap-0.5 items-end h-4">
                      <div className="w-0.5 bg-primary animate-[bounce_0.8s_ease-in-out_infinite]" style={{ height: '8px' }} />
                      <div className="w-0.5 bg-primary animate-[bounce_0.8s_ease-in-out_infinite_0.2s]" style={{ height: '12px' }} />
                      <div className="w-0.5 bg-primary animate-[bounce_0.8s_ease-in-out_infinite_0.4s]" style={{ height: '6px' }} />
                    </div>
                  </div>
                ) : (
                  <span className={isCurrentTrack ? 'text-primary' : 'text-muted-foreground'}>
                    {index + 1}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={track.coverArt}
                  alt={track.album}
                  className="h-10 w-10 rounded object-cover flex-shrink-0"
                />
                <div className="min-w-0 text-left">
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
              </div>

              <div className="text-sm text-muted-foreground truncate">
                {track.album}
              </div>

              <div className="text-sm text-muted-foreground text-right">
                {formatDuration(track.duration)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
