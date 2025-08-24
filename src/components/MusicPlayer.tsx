import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    { name: "Tujhe Dekha Toh", file: "TujheDekhaToh1" },
    { name: "Mehndi Laga Ke Rakhna", file: "MehndiLagaKeRakhna2" },
    { name: "Ho Gaya Hai Tujhko", file: "HoGayaHaiTujhko3" }
  ];

  // Auto-load first song on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !isLoaded) {
      const audioSrc = `/${tracks[currentTrack].file}.mp3`;
      audio.src = audioSrc;
      audio.load();
      setIsLoaded(true);
      
      // Autoplay
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Autoplay blocked:', error);
      });
    }
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    
    if (!audio) {
      console.error('Audio element not found');
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Only load if not already loaded or different track
      if (!isLoaded || audio.src !== `${window.location.origin}/${tracks[currentTrack].file}.mp3`) {
        const audioSrc = `/${tracks[currentTrack].file}.mp3`;
        audio.src = audioSrc;
        audio.load();
        setIsLoaded(true);
      }
      
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Play failed:', error);
      });
    }
  };

  const selectTrack = (index: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      setCurrentTrack(index);
      setIsPlaying(false);
      
      // Load and play new track
      const audioSrc = `/${tracks[index].file}.mp3`;
      audio.src = audioSrc;
      audio.load();
      setIsLoaded(true);
      
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Play failed:', error);
      });
    }
    setShowPlaylist(false);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative">
        
        <button
          onClick={handlePlayPause}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowPlaylist(!showPlaylist);
          }}
          className="text-pink-400 hover:text-pink-300 transition-colors duration-200"
          type="button"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>

        {showPlaylist && (
          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 border rounded-lg shadow-xl min-w-[200px] py-1 z-[60]">
            <div className="px-3 py-2 text-xs text-gray-500 font-medium border-b">
              Choose Song
            </div>
            {tracks.map((track, index) => (
              <button
                key={index}
                onClick={() => selectTrack(index)}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  index === currentTrack ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
                }`}
                type="button"
              >
                {track.name}
              </button>
            ))}
            <button
              onClick={() => setShowPlaylist(false)}
              className="w-full text-left px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 border-t"
              type="button"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {showPlaylist && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowPlaylist(false)}
        />
      )}

      <audio
        ref={audioRef}
        preload="auto"
        onEnded={() => {
          setIsPlaying(false);
          const nextTrack = (currentTrack + 1) % tracks.length;
          setCurrentTrack(nextTrack);
          setIsLoaded(false);
        }}
        onError={(e) => {
          console.error('❌ Audio error:', e);
          console.error('❌ Failed to load:', `/${tracks[currentTrack].file}`);
        }}
        onLoadStart={() => console.log('📥 Audio load started')}
        onCanPlay={() => console.log('✅ Audio ready to play')}
        onPlay={() => console.log('▶️ Audio started playing')}
        onPause={() => console.log('⏸️ Audio paused')}
      />

      {/* Hidden audio elements to force deployment inclusion */}
      <audio style={{ display: "none" }} controls>
        <source src="/TujheDekhaToh1.mp3" type="audio/mpeg" />
      </audio>
      <audio style={{ display: "none" }} controls>
        <source src="/MehndiLagaKeRakhna2.mp3" type="audio/mpeg" />
      </audio>
      <audio style={{ display: "none" }} controls>
        <source src="/HoGayaHaiTujhko3.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default MusicPlayer;