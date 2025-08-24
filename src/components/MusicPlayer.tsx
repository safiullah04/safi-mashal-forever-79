import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const tracks = [
    { name: "Tujhe Dekha Toh", file: "/Tujhe%20Dekha%20Toh%20-%201.mp3" },
    { name: "Mehndi Laga Ke Rakhna", file: "/Mehndi%20Laga%20Ke%20Rakhna%20-%202.mp3" },
    { name: "Ho Gaya Hai Tujhko", file: "/Ho%20Gaya%20Hai%20Tujhko%20-%203.mp3" }
  ];

  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlayPause = () => {
    console.log('Button clicked, isPlaying:', isPlaying);
    const audio = audioRef.current;
    if (!audio) {
      console.error('Audio element not found');
      return;
    }

    console.log('Audio src:', audio.src);
    console.log('Audio readyState:', audio.readyState);
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      console.log('Paused');
    } else {
      // Ensure the correct source is loaded
      audio.src = tracks[currentTrack].file;
      console.log('Setting src to:', tracks[currentTrack].file);
      
      audio.play()
        .then(() => {
          setIsPlaying(true);
          console.log('Playing successfully');
        })
        .catch((error) => {
          console.error('Play failed:', error);
          setIsPlaying(false);
          
          // Try to load the audio first
          audio.load();
          setTimeout(() => {
            audio.play()
              .then(() => {
                setIsPlaying(true);
                console.log('Playing after load');
              })
              .catch((err) => {
                console.error('Still failed after load:', err);
              });
          }, 100);
        });
    }
  };

  const selectTrack = (index: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setCurrentTrack(index);
    setIsPlaying(false);
    setShowPlaylist(false);
  };

  const handleTrackEnd = () => {
    setIsPlaying(false);
    const nextTrack = (currentTrack + 1) % tracks.length;
    setCurrentTrack(nextTrack);
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
          className="p-4 rounded-full bg-pink-500/20 hover:bg-pink-500/30 transition-all duration-200 shadow-lg border border-pink-500/40 cursor-pointer touch-manipulation"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-pink-400" />
          ) : (
            <Play className="w-6 h-6 text-pink-400" />
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
              >
                {track.name}
              </button>
            ))}
            <button
              onClick={() => setShowPlaylist(false)}
              className="w-full text-left px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 border-t"
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
        src={tracks[currentTrack].file}
        preload="auto"
        onEnded={handleTrackEnd}
        onError={(e) => console.error('Audio error:', e)}
        onLoadStart={() => console.log('Audio load started')}
        onCanPlay={() => console.log('Audio can play')}
      />
    </div>
  );
};

export default MusicPlayer;