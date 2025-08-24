import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioFile = "/TujheDekhaToh.mp3";

  const handlePlayPause = () => {
    const audio = audioRef.current;
    
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Play failed:', error);
      });
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative">
        <button
          onClick={handlePlayPause}
          className="text-pink-400 hover:text-pink-300 transition-colors duration-200"
          type="button"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
      </div>

      <audio
        ref={audioRef}
        src={audioFile}
        preload="metadata"
        onEnded={() => setIsPlaying(false)}
        onError={(e) => console.error('Audio error:', e)}
      />
    </div>
  );
};

export default MusicPlayer;