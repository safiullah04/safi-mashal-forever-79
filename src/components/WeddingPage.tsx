import CountdownTimer from './CountdownTimer';
import MusicPlayer from './MusicPlayer';
import FloatingParticles from './FloatingParticles';
import PhotoSlideshow from './PhotoSlideshow';
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
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-calligraphy text-romantic-rose mb-4">
            <span className="text-outline-pink">safi</span> <span className="text-xl md:text-2xl lg:text-3xl">&lt;3</span> <span className="text-outline-pink">mashal</span>
          </h1>
          <div className="w-32 md:w-48 h-0.5 bg-gradient-to-r from-transparent via-romantic-gold to-transparent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl font-elegant text-muted-foreground tracking-wider">
            january 31, 2026
          </p>
        </div>
        
        {/* Countdown Timer */}
        <div className="w-full max-w-4xl mb-16">
          <CountdownTimer targetDate={weddingDate} />
        </div>
        
        {/* Slideshow Section */}
        <div className="w-full max-w-4xl mb-16">
          <PhotoSlideshow />
        </div>
        
        {/* Footer */}
        <div className="text-center fade-in">
          <p className="text-sm text-muted-foreground font-elegant mb-2">
            made with love ❤️
          </p>
        </div>
        
      </div>
    </div>
  );
};

export default WeddingPage;