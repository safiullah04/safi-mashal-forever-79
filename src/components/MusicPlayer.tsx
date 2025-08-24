import { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play, ChevronDown } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
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
      
      const handleEnded = () => {
        const nextTrack = (currentTrack + 1) % tracks.length;
        setCurrentTrack(nextTrack);
      };

      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, [currentTrack]);

  const toggleMusic = async () => {
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
      console.log('Audio play failed:', error);
      setIsPlaying(false);
    }
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setShowPlaylist(false);
    setIsPlaying(false);
    // Audio will reload with new src
  };

  const handleLongPress = () => {
    setShowPlaylist(true);
  };

  let pressTimer: number;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={toggleMusic}
          onMouseDown={() => {
            pressTimer = window.setTimeout(handleLongPress, 500);
          }}
          onMouseUp={() => {
            clearTimeout(pressTimer);
          }}
          onTouchStart={() => {
            pressTimer = window.setTimeout(handleLongPress, 500);
          }}
          onTouchEnd={() => {
            clearTimeout(pressTimer);
          }}
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
        src={tracks[currentTrack].file}
        preload="metadata"
      />
    </div>
  );
};

export default MusicPlayer;