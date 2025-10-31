import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlayerControlsProps {
  isPlaying: boolean;
  isShuffled: boolean;
  repeatMode: 'off' | 'all' | 'one';
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
}

export const PlayerControls = ({
  isPlaying,
  isShuffled,
  repeatMode,
  onPlayPause,
  onPrevious,
  onNext,
  onShuffle,
  onRepeat,
}: PlayerControlsProps) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onShuffle}
        className={`transition-colors ${
          isShuffled ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        <Shuffle className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevious}
        className="text-foreground hover:text-primary"
      >
        <SkipBack className="h-5 w-5" />
      </Button>

      <Button
        size="icon"
        onClick={onPlayPause}
        className="h-12 w-12 rounded-full bg-gradient-primary shadow-glow hover:scale-105 transition-all"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 fill-current" />
        ) : (
          <Play className="h-5 w-5 fill-current ml-0.5" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onNext}
        className="text-foreground hover:text-primary"
      >
        <SkipForward className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onRepeat}
        className={`transition-colors ${
          repeatMode !== 'off' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {repeatMode === 'one' ? (
          <Repeat1 className="h-4 w-4" />
        ) : (
          <Repeat className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
