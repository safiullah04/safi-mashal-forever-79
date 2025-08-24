import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const tracks = [
    { name: "Tujhe Dekha Toh", file: "/Tujhe Dekha Toh - 1.mp3" },
    { name: "Mehndi Laga Ke Rakhna", file: "/Mehndi Laga Ke Rakhna - 2.mp3" },
    { name: "Ho Gaya Hai Tujhko", file: "/Ho Gaya Hai Tujhko - 3.mp3" }
  ];

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create audio element if it doesn't exist
  const getAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(tracks[currentTrack].file);
      audioRef.current.volume = 0.5;
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        const nextTrack = (currentTrack + 1) % tracks.length;
        setCurrentTrack(nextTrack);
      });
    }
    return audioRef.current;
  };

  const handlePlayPause = () => {
    console.log('Button clicked!'); // Debug log
    const audio = getAudio();
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      console.log('Paused');
    } else {
      audio.src = tracks[currentTrack].file;
      audio.play()
        .then(() => {
          setIsPlaying(true);
          console.log('Playing');
        })
        .catch((error) => {
          console.error('Play failed:', error);
          setIsPlaying(false);
        });
    }
  };

  const selectTrack = (index: number) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setCurrentTrack(index);
    setIsPlaying(false);
    setShowPlaylist(false);
    // Reset audio for new track
    if (audioRef.current) {
      audioRef.current.src = tracks[index].file;
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      {/* Main Play Button */}
      <div className="relative">
        <button
          onClick={handlePlayPause}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowPlaylist(!showPlaylist);
          }}
          className="p-4 rounded-full bg-pink-500/20 hover:bg-pink-500/30 transition-all duration-200 shadow-lg border border-pink-500/40 cursor-pointer"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-pink-400" />
          ) : (
            <Play className="w-6 h-6 text-pink-400" />
          )}
        </button>

        {/* Playlist Dropdown */}
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

      {/* Click outside to close */}
      {showPlaylist && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowPlaylist(false)}
        />
      )}
    </div>
  );
};

export default MusicPlayer;