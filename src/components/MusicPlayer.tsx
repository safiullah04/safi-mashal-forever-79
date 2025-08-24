import { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    { name: "Tujhe Dekha Toh", file: "TujheDekhaToh1" },
    { name: "Mehndi Laga Ke Rakhna", file: "MehndiLagaKeRakhna2" },
    { name: "Ho Gaya Hai Tujhko", file: "HoGayaHaiTujhko3" }
  ];

  const handlePlayPause = async () => {
    console.log('🎵 Button clicked - Current state:', isPlaying);
    const audio = audioRef.current;
    
    if (!audio) {
      console.error('❌ Audio element not found');
      return;
    }

    // Test multiple formats
    const formats = ['mp3', 'wav', 'ogg'];
    let workingUrl = null;
    
    for (const format of formats) {
      const testUrl = `/${tracks[currentTrack].file}.${format}`;
      console.log('🔍 Testing file URL:', testUrl);
      
      try {
        const response = await fetch(testUrl, { method: 'HEAD' });
        console.log(`📁 File check response for ${format}:`, response.status);
        if (response.ok) {
          workingUrl = testUrl;
          break;
        }
      } catch (fetchError) {
        console.log(`❌ ${format} format not found:`, fetchError);
      }
    }
    
    if (!workingUrl) {
      console.error('❌ No supported audio format found');
      alert(`No supported audio format found for: ${tracks[currentTrack].name}`);
      return;
    }

    try {
      if (isPlaying) {
        console.log('⏸️ Attempting to pause...');
        audio.pause();
        setIsPlaying(false);
        console.log('✅ Paused successfully');
      } else {
        console.log('▶️ Attempting to play...');
        console.log('🎵 Current track:', tracks[currentTrack].name);
        console.log('📁 File path:', workingUrl);
        
        // Set audio source and load
        audio.src = workingUrl;
        audio.load();
        
        // Try to play directly - simpler approach
        try {
          await audio.play();
          setIsPlaying(true);
          console.log('✅ Playing successfully');
        } catch (playError) {
          console.error('❌ Direct play failed:', playError);
          setIsPlaying(false);
          alert(`Play failed: ${playError.message}`);
        }
      }
    } catch (error) {
      console.error('❌ Audio play/pause failed:', error);
      setIsPlaying(false);
      alert(`Play failed: ${error.message}`);
    }
  };

  const selectTrack = (index: number) => {
    console.log('🎵 Selecting track:', tracks[index].name);
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
    }
    setCurrentTrack(index);
    setIsPlaying(false);
    setShowPlaylist(false);
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative">
        {/* Debug info for testing */}
        <div className="absolute -top-8 right-0 text-xs text-white bg-black px-2 py-1 rounded">
          {isPlaying ? 'PLAYING' : 'PAUSED'} | Track {currentTrack + 1}
        </div>
        
        <button
          onClick={handlePlayPause}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowPlaylist(!showPlaylist);
          }}
          className="p-4 rounded-full bg-pink-500/20 hover:bg-pink-500/30 transition-all duration-200 shadow-lg border border-pink-500/40 cursor-pointer touch-manipulation active:scale-95"
          type="button"
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
          console.log('🎵 Track ended');
          setIsPlaying(false);
          const nextTrack = (currentTrack + 1) % tracks.length;
          setCurrentTrack(nextTrack);
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