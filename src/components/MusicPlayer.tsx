import { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Using a placeholder audio file - replace with "Tujhe Dekha To" from DDLJ
  // You'll need to:
  // 1. Obtain legal rights to use the song
  // 2. Convert to web-compatible format (MP3/OGG/WAV)
  // 3. Host the file or use a streaming service
  // 4. Replace the URL below with your audio file
  const musicUrl = "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"; // Placeholder - replace with actual song

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      
      const handleCanPlayThrough = () => {
        setIsLoaded(true);
        if (isPlaying) {
          audio.play().catch(console.error);
        }
      };

      const handleEnded = () => {
        audio.currentTime = 0;
        if (isPlaying) {
          audio.play().catch(console.error);
        }
      };

      audio.addEventListener('canplaythrough', handleCanPlayThrough);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio && isLoaded) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.currentTime = 0; // Reset to start as requested
        audio.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50" style={{ marginRight: '2rem' }}>
      <button
        onClick={toggleMusic}
        className="romantic-card p-3 rounded-full hover:scale-110 transition-transform duration-300 romantic-glow"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-romantic-rose" />
        ) : (
          <Play className="w-6 h-6 text-romantic-rose" />
        )}
      </button>
      
      <audio
        ref={audioRef}
        preload="auto"
        loop
      >
        <source src={musicUrl} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>
      
      {/* Music note indicator */}
      <div className="absolute -top-2 -right-2 animate-bounce">
        <Music className="w-4 h-4 text-romantic-gold" />
      </div>
    </div>
  );
};

export default MusicPlayer;