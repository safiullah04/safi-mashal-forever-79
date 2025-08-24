import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const audioFile = "TujheDekhaToh1.mp3";

  // Auto-load song on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !isLoaded) {
      const audioSrc = `/${audioFile}`;
      audio.src = audioSrc;
      audio.load();
      setIsLoaded(true);
      
      // Try autoplay
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Autoplay blocked:', error);
        });
      }
    }
  }, [isLoaded]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    
    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Force reload to ensure audio is properly loaded
      const audioSrc = `/${audioFile}`;
      
      audio.src = audioSrc;
      audio.load();
      
      // Wait for load then play
      const playAudio = () => {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.error('Play failed:', error);
        });
      };
      
      // If audio can play through, play immediately, otherwise wait for canplaythrough
      if (audio.readyState >= 4) {
        playAudio();
      } else {
        audio.addEventListener('canplaythrough', playAudio, { once: true });
      }
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
        preload="auto"
        onEnded={() => {
          setIsPlaying(false);
        }}
        onError={(e) => {
          console.error('Audio error:', e);
        }}
      />

      {/* Hidden audio element to force deployment inclusion */}
      <audio style={{ display: "none" }} controls>
        <source src="/TujheDekhaToh1.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default MusicPlayer;