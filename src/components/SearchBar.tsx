import { useState, useEffect, useMemo } from 'react';
import { Search, X, Music, User, Disc } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Track } from '@/types/music';
import { musicLibrary } from '@/data/musicLibrary';

interface SearchResult {
  type: 'track' | 'artist' | 'album';
  item: Track | string;
  tracks?: Track[];
}

interface SearchBarProps {
  onTrackSelect: (track: Track) => void;
  onClose?: () => void;
}

export const SearchBar = ({ onTrackSelect, onClose }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search tracks
    const matchingTracks = musicLibrary.filter(
      (track) =>
        track.title.toLowerCase().includes(lowerQuery) ||
        track.artist.toLowerCase().includes(lowerQuery) ||
        track.album.toLowerCase().includes(lowerQuery)
    );

    matchingTracks.forEach((track) => {
      results.push({ type: 'track', item: track });
    });

    // Get unique artists
    const uniqueArtists = [...new Set(musicLibrary.map((t) => t.artist))];
    const matchingArtists = uniqueArtists.filter((artist) =>
      artist.toLowerCase().includes(lowerQuery)
    );

    matchingArtists.forEach((artist) => {
      const artistTracks = musicLibrary.filter((t) => t.artist === artist);
      if (!results.some((r) => r.type === 'artist' && r.item === artist)) {
        results.push({ type: 'artist', item: artist, tracks: artistTracks });
      }
    });

    // Get unique albums
    const uniqueAlbums = [...new Set(musicLibrary.map((t) => t.album))];
    const matchingAlbums = uniqueAlbums.filter((album) =>
      album.toLowerCase().includes(lowerQuery)
    );

    matchingAlbums.forEach((album) => {
      const albumTracks = musicLibrary.filter((t) => t.album === album);
      if (!results.some((r) => r.type === 'album' && r.item === album)) {
        results.push({ type: 'album', item: album, tracks: albumTracks });
      }
    });

    return results;
  }, [query]);

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'track') {
      onTrackSelect(result.item as Track);
    } else if (result.tracks && result.tracks.length > 0) {
      onTrackSelect(result.tracks[0]);
    }
    handleClear();
    onClose?.();
  };

  useEffect(() => {
    setIsOpen(query.length > 0);
  }, [query]);

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'track':
        return <Music className="h-4 w-4 text-primary" />;
      case 'artist':
        return <User className="h-4 w-4 text-player-accent" />;
      case 'album':
        return <Disc className="h-4 w-4 text-player-glow" />;
    }
  };

  const getResultLabel = (result: SearchResult) => {
    if (result.type === 'track') {
      const track = result.item as Track;
      return {
        primary: track.title,
        secondary: `${track.artist} • ${track.album}`,
        cover: track.coverArt,
      };
    } else if (result.type === 'artist') {
      const artistTracks = result.tracks || [];
      return {
        primary: result.item as string,
        secondary: `${artistTracks.length} tracks`,
        cover: artistTracks[0]?.coverArt,
      };
    } else {
      const albumTracks = result.tracks || [];
      return {
        primary: result.item as string,
        secondary: `${albumTracks[0]?.artist} • ${albumTracks.length} tracks`,
        cover: albumTracks[0]?.coverArt,
      };
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search tracks, artists, albums..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10 bg-card/30 backdrop-blur-xl border-white/10 focus:border-primary/50 focus:ring-primary/20"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && searchResults.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-glow z-50 max-h-96 overflow-y-auto custom-scrollbar">
          <div className="p-2 space-y-1">
            {searchResults.map((result, index) => {
              const label = getResultLabel(result);
              return (
                <button
                  key={`${result.type}-${index}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left"
                >
                  {label.cover ? (
                    <img
                      src={label.cover}
                      alt={label.primary}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-player-surface flex items-center justify-center">
                      {getResultIcon(result.type)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getResultIcon(result.type)}
                      <span className="font-medium truncate">{label.primary}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {label.secondary}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground capitalize px-2 py-1 bg-white/5 rounded-full">
                    {result.type}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query && searchResults.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-card/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-glow z-50 p-6 text-center">
          <Search className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-muted-foreground">No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
};
