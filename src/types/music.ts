export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverArt: string;
  audioUrl: string;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  isShuffled: boolean;
  repeatMode: 'off' | 'all' | 'one';
}
