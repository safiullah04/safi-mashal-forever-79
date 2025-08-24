import CountdownTimer from './CountdownTimer';
import MusicPlayer from './MusicPlayer';
import FloatingParticles from './FloatingParticles';
import romanticBackground from '../assets/romantic-background.jpg';

const WeddingPage = () => {
  // Wedding date: January 31, 2026 at 1:00 PM
  const weddingDate = new Date('2026-01-31T13:00:00');

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${romanticBackground})`,
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-romantic opacity-80" />
      
      {/* Floating Particles */}
      <FloatingParticles />
      
      {/* Music Player */}
      <MusicPlayer />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8" style={{ zIndex: 10 }}>
        
        {/* Names Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-calligraphy text-romantic-rose mb-4 text-glow">
            Safi & Mashal
          </h1>
          <div className="w-32 md:w-48 h-0.5 bg-gradient-to-r from-transparent via-romantic-gold to-transparent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl font-elegant text-muted-foreground tracking-wider">
            January 31, 2026 • 1:00 PM
          </p>
        </div>
        
        {/* Countdown Timer */}
        <div className="w-full max-w-4xl mb-16">
          <CountdownTimer targetDate={weddingDate} />
        </div>
        
        {/* Slideshow Section */}
        <div className="w-full max-w-4xl mb-16">
          <div className="slideshow-container">
            <div className="text-center text-muted-foreground">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-romantic-rose/20 flex items-center justify-center">
                <span className="text-3xl">📸</span>
              </div>
              <p className="text-lg font-elegant mb-2">
                Our Love Story Slideshow
              </p>
              <p className="text-sm text-muted-foreground">
                Coming soon: Engagement photos with smooth transitions
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center fade-in">
          <p className="text-sm text-muted-foreground font-elegant mb-2">
            With love and excitement for our future together
          </p>
          <div className="flex items-center justify-center space-x-2 text-romantic-gold">
            <span>✨</span>
            <span className="font-calligraphy text-lg">Forever & Always</span>
            <span>✨</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default WeddingPage;