import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const longPressTimerRef = useRef<number | null>(null);

  const tracks = [
    { name: "Tujhe Dekha Toh", file: "/Tujhe Dekha Toh - 1.mp3" },
    { name: "Mehndi Laga Ke Rakhna", file: "/Mehndi Laga Ke Rakhna - 2.mp3" },
    { name: "Ho Gaya Hai Tujhko", file: "/Ho Gaya Hai Tujhko - 3.mp3" }
  ];

  // Initialize audio when component mounts or track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set volume and prepare audio
    audio.volume = 0.5;
    audio.load();

    // Handle when track ends
    const handleEnded = () => {
      const nextTrack = (currentTrack + 1) % tracks.length;
      setCurrentTrack(nextTrack);
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentTrack]);

  // Handle play/pause
  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Playback failed:', error);
      setIsPlaying(false);
    }
  };

  // Handle track selection
  const selectTrack = (trackIndex: number) => {
    setCurrentTrack(trackIndex);
    setIsPlaying(false);
    setShowPlaylist(false);
  };

  // Long press handlers
  const startLongPress = () => {
    longPressTimerRef.current = window.setTimeout(() => {
      setShowPlaylist(true);
    }, 800);
  };

  const endLongPress = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  // Handle click (only if not long press)
  const handleClick = () => {
    if (!showPlaylist) {
      togglePlayback();
    }
  };

  return (
    <>
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={handleClick}
          onMouseDown={startLongPress}
          onMouseUp={endLongPress}
          onMouseLeave={endLongPress}
          onTouchStart={startLongPress}
          onTouchEnd={endLongPress}
          className="p-4 rounded-full bg-romantic-rose/20 hover:bg-romantic-rose/30 transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm border border-romantic-rose/30"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-romantic-rose" />
          ) : (
            <Play className="w-6 h-6 text-romantic-rose" />
          )}
        </button>

        {showPlaylist && (
          <div className="absolute top-full right-0 mt-3 bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-xl min-w-[220px] py-2 z-[60]">
            <div className="px-4 py-2 text-xs text-muted-foreground font-semibold border-b border-border">
              Choose Song
            </div>
            {tracks.map((track, index) => (
              <button
                key={index}
                onClick={() => selectTrack(index)}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-accent/50 transition-colors ${
                  index === currentTrack ? 'bg-accent text-accent-foreground font-medium' : 'text-foreground'
                }`}
              >
                {track.name}
              </button>
            ))}
            <button
              onClick={() => setShowPlaylist(false)}
              className="w-full text-left px-4 py-2 text-xs text-muted-foreground hover:bg-accent/50 transition-colors border-t border-border mt-1"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Click outside to close playlist */}
      {showPlaylist && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowPlaylist(false)}
        />
      )}

      {/* Audio element */}
      <audio
        ref={audioRef}
        src={tracks[currentTrack].file}
        preload="auto"
      />
    </>
  );
};

export default MusicPlayer;