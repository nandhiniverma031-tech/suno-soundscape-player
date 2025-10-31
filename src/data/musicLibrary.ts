import { Track } from '@/types/music';
import album1 from '@/assets/album1.jpg';
import album2 from '@/assets/album2.jpg';
import album3 from '@/assets/album3.jpg';

export const musicLibrary: Track[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    artist: 'Synthwave Collective',
    album: 'Digital Horizons',
    duration: 245,
    coverArt: album1,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Golden Hour',
    artist: 'The Sunset Band',
    album: 'Vintage Vibes',
    duration: 198,
    coverArt: album2,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Midnight City',
    artist: 'Lo-Fi Dreams',
    album: 'Night Lights',
    duration: 212,
    coverArt: album3,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: '4',
    title: 'Electric Pulse',
    artist: 'Synthwave Collective',
    album: 'Digital Horizons',
    duration: 223,
    coverArt: album1,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: '5',
    title: 'Summer Breeze',
    artist: 'The Sunset Band',
    album: 'Vintage Vibes',
    duration: 189,
    coverArt: album2,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
  {
    id: '6',
    title: 'Neon Nights',
    artist: 'Lo-Fi Dreams',
    album: 'Night Lights',
    duration: 201,
    coverArt: album3,
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  },
];
