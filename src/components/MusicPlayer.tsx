import { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play, ChevronDown } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    { name: "Tujhe Dekha Toh", file: "/Tujhe Dekha Toh - 1.mp3" },
    { name: "Mehndi Laga Ke Rakhna", file: "/Mehndi Laga Ke Rakhna - 2.mp3" },
    { name: "Ho Gaya Hai Tujhko", file: "/Ho Gaya Hai Tujhko - 3.mp3" }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      audio.src = tracks[currentTrack].file;
      setIsLoaded(false);
      
      const handleCanPlayThrough = () => {
        setIsLoaded(true);
        if (isPlaying) {
          audio.play().catch(console.error);
        }
      };

      const handleEnded = () => {
        // Move to next track or loop back to first
        const nextTrack = (currentTrack + 1) % tracks.length;
        setCurrentTrack(nextTrack);
        setIsPlaying(true);
      };

      const handlePause = () => {
        setIsPlaying(false);
      };

      const handlePlay = () => {
        setIsPlaying(true);
      };

      audio.addEventListener('canplaythrough', handleCanPlayThrough);
      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('pause', handlePause);
      audio.addEventListener('play', handlePlay);

      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('pause', handlePause);
        audio.removeEventListener('play', handlePlay);
      };
    }
  }, [currentTrack]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio && isLoaded) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseDown = () => {
    const timer = window.setTimeout(() => {
      setShowPlaylist(true);
    }, 500); // 500ms long press
    setLongPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
      if (!showPlaylist) {
        toggleMusic();
      }
    }
  };

  const selectTrack = (index: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setCurrentTrack(index);
    setShowPlaylist(false);
    setIsPlaying(true);
    setIsLoaded(false);
  };

  const handleTouchStart = () => {
    const timer = window.setTimeout(() => {
      setShowPlaylist(true);
    }, 500);
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    if (!showPlaylist) {
      toggleMusic();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="p-3 hover:scale-110 transition-transform duration-300 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-lg border border-border"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-romantic-rose/80" />
          ) : (
            <Play className="w-5 h-5 text-romantic-rose/80" />
          )}
          <ChevronDown className="w-3 h-3 text-romantic-rose/60" />
        </button>
        
        {showPlaylist && (
          <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-lg shadow-lg min-w-[200px] py-1 z-[60]">
            <div className="px-3 py-1 text-xs text-muted-foreground font-medium border-b border-border">
              Select Track
            </div>
            {tracks.map((track, index) => (
              <button
                key={index}
                onClick={() => selectTrack(index)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors ${
                  index === currentTrack ? 'bg-accent text-accent-foreground font-medium' : ''
                }`}
              >
                {track.name}
              </button>
            ))}
            <button
              onClick={() => setShowPlaylist(false)}
              className="w-full text-left px-3 py-1 text-xs text-muted-foreground hover:bg-accent transition-colors border-t border-border"
            >
              Close
            </button>
          </div>
        )}
      </div>
      
      <audio
        ref={audioRef}
        preload="auto"
      >
        <source src={tracks[currentTrack].file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MusicPlayer;