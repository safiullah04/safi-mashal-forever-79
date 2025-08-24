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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        
        {/* Names Header */}
        <div className="text-center mb-12 fade-in">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-calligraphy text-romantic-rose mb-4 romantic-glow">
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
        
        {/* Engagement Photos Section */}
        <div className="w-full max-w-6xl mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-elegant text-romantic-rose mb-4">
              Our Journey Together
            </h3>
            <p className="text-muted-foreground font-elegant">
              Celebrating our love story through beautiful moments
            </p>
          </div>
          
          {/* Photo Gallery Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div 
                key={index}
                className="romantic-card rounded-2xl overflow-hidden aspect-square bg-romantic-cream/50 flex items-center justify-center floating"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center text-muted-foreground">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-romantic-rose/20 flex items-center justify-center">
                    <span className="text-2xl">💕</span>
                  </div>
                  <p className="text-sm font-elegant">
                    Engagement Photo {index}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Google Drive integration coming soon
                  </p>
                </div>
              </div>
            ))}
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