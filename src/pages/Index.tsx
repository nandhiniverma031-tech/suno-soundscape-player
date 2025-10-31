import { useState, useRef, useEffect } from 'react';
import { Track, PlayerState } from '@/types/music';
import { musicLibrary } from '@/data/musicLibrary';
import { PlayerControls } from '@/components/PlayerControls';
import { ProgressBar } from '@/components/ProgressBar';
import { VolumeControl } from '@/components/VolumeControl';
import { TrackInfo } from '@/components/TrackInfo';
import { Playlist } from '@/components/Playlist';
import { Card } from '@/components/ui/card';
import heroBg from '@/assets/hero-bg.jpg';

const Index = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    volume: 70,
    isMuted: false,
    isShuffled: false,
    repeatMode: 'off',
  });

  // Update audio element when track changes
  useEffect(() => {
    if (audioRef.current && playerState.currentTrack) {
      audioRef.current.src = playerState.currentTrack.audioUrl;
      if (playerState.isPlaying) {
        audioRef.current.play();
      }
    }
  }, [playerState.currentTrack]);

  // Update audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (playerState.isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [playerState.isPlaying]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = playerState.isMuted ? 0 : playerState.volume / 100;
    }
  }, [playerState.volume, playerState.isMuted]);

  // Time update handler
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setPlayerState((prev) => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleEnded = () => {
      if (playerState.repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [playerState.repeatMode]);

  const handleTrackSelect = (track: Track) => {
    if (playerState.currentTrack?.id === track.id) {
      setPlayerState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
    } else {
      setPlayerState((prev) => ({ ...prev, currentTrack: track, isPlaying: true, currentTime: 0 }));
    }
  };

  const handlePlayPause = () => {
    if (!playerState.currentTrack && musicLibrary.length > 0) {
      handleTrackSelect(musicLibrary[0]);
    } else {
      setPlayerState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };

  const handleNext = () => {
    if (!playerState.currentTrack) return;
    const currentIndex = musicLibrary.findIndex((t) => t.id === playerState.currentTrack!.id);
    let nextIndex;
    
    if (playerState.isShuffled) {
      nextIndex = Math.floor(Math.random() * musicLibrary.length);
    } else {
      nextIndex = (currentIndex + 1) % musicLibrary.length;
    }
    
    handleTrackSelect(musicLibrary[nextIndex]);
  };

  const handlePrevious = () => {
    if (!playerState.currentTrack) return;
    const currentIndex = musicLibrary.findIndex((t) => t.id === playerState.currentTrack!.id);
    const prevIndex = (currentIndex - 1 + musicLibrary.length) % musicLibrary.length;
    handleTrackSelect(musicLibrary[prevIndex]);
  };

  const handleSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setPlayerState((prev) => ({ ...prev, currentTime: value }));
    }
  };

  const handleVolumeChange = (value: number) => {
    setPlayerState((prev) => ({ ...prev, volume: value, isMuted: value === 0 }));
  };

  const handleMuteToggle = () => {
    setPlayerState((prev) => ({ ...prev, isMuted: !prev.isMuted }));
  };

  const handleShuffle = () => {
    setPlayerState((prev) => ({ ...prev, isShuffled: !prev.isShuffled }));
  };

  const handleRepeat = () => {
    setPlayerState((prev) => ({
      ...prev,
      repeatMode: prev.repeatMode === 'off' ? 'all' : prev.repeatMode === 'all' ? 'one' : 'off',
    }));
  };

  return (
    <div className="min-h-screen bg-player-bg">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src={heroBg}
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
            Suno
          </h1>
          <p className="text-muted-foreground">Your personal music experience</p>
        </div>

        <div className="grid lg:grid-cols-[1fr,400px] gap-6 max-w-7xl mx-auto">
          {/* Main Player */}
          <div className="space-y-6">
            {/* Now Playing Card */}
            <Card className="p-8 bg-card/95 backdrop-blur-xl border-border shadow-card">
              <div className="flex flex-col items-center mb-8">
                {playerState.currentTrack ? (
                  <img
                    src={playerState.currentTrack.coverArt}
                    alt={playerState.currentTrack.album}
                    className="w-64 h-64 rounded-2xl object-cover shadow-glow mb-6"
                  />
                ) : (
                  <div className="w-64 h-64 rounded-2xl bg-player-surface flex items-center justify-center mb-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎵</div>
                      <div className="text-muted-foreground">No track playing</div>
                    </div>
                  </div>
                )}
                <div className="text-center mb-2">
                  <h2 className="text-2xl font-bold mb-1">
                    {playerState.currentTrack?.title || 'Select a Track'}
                  </h2>
                  <p className="text-muted-foreground">
                    {playerState.currentTrack?.artist || 'Artist'}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <ProgressBar
                  currentTime={playerState.currentTime}
                  duration={playerState.currentTrack?.duration || 0}
                  onSeek={handleSeek}
                />

                <PlayerControls
                  isPlaying={playerState.isPlaying}
                  isShuffled={playerState.isShuffled}
                  repeatMode={playerState.repeatMode}
                  onPlayPause={handlePlayPause}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                  onShuffle={handleShuffle}
                  onRepeat={handleRepeat}
                />
              </div>
            </Card>

            {/* Bottom Controls */}
            <Card className="p-4 bg-card/95 backdrop-blur-xl border-border">
              <div className="flex items-center justify-between">
                <TrackInfo track={playerState.currentTrack} />
                <VolumeControl
                  volume={playerState.volume}
                  isMuted={playerState.isMuted}
                  onVolumeChange={handleVolumeChange}
                  onMuteToggle={handleMuteToggle}
                />
              </div>
            </Card>
          </div>

          {/* Playlist */}
          <Playlist
            tracks={musicLibrary}
            currentTrack={playerState.currentTrack}
            isPlaying={playerState.isPlaying}
            onTrackSelect={handleTrackSelect}
          />
        </div>
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} />
    </div>
  );
};

export default Index;
