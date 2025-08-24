import { useState, useEffect } from 'react';

const PhotoSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showImages, setShowImages] = useState(false);

  // Function to shuffle array randomly
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Load and shuffle images on component mount
  useEffect(() => {
    const loadImages = () => {
      // Load a smaller subset first for faster loading
      const imagePaths = [
        '/sm007.JPG', '/sm009.jpg', '/sm011.jpeg', '/sm012.jpg', '/sm013.jpeg', 
        '/sm017.jpeg', '/sm022.jpg', '/sm024.jpg', '/sm026.jpg', '/sm027.jpg', 
        '/sm028.jpg', '/sm035.jpg', '/sm039.jpg', '/sm041.jpg', '/sm046.jpg', 
        '/sm053.jpg', '/sm063.jpg', '/sm066.jpg', '/sm075.jpg', '/sm082.jpg', 
        '/sm086.jpg', '/sm088.jpg', '/sm100.jpg', '/sm119.jpg', '/sm125.jpg', 
        '/sm126.jpg', '/sm132.jpeg', '/sm143.jpg', '/sm148.jpg', '/sm153.jpg', 
        '/sm163.jpeg', '/sm184.jpg', '/sm204.jpg', '/sm211.jpg', '/sm214.jpg', 
        '/sm217.jpg', '/sm219.jpg', '/sm223.jpg', '/sm230.jpeg', '/sm231.jpg', 
        '/sm240.jpg', '/sm247.jpg', '/sm251.jpeg', '/sm268.jpeg', '/sm274.jpg', 
        '/sm287.jpg', '/sm293.jpg', '/sm294.jpg', '/sm295.jpg', '/sm300.jpg', '/sm301.jpg'
      ];
      
      // Preload first few images
      const preloadPromises = imagePaths.slice(0, 5).map(path => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve; // Don't fail on error, just continue
          img.src = path;
        });
      });
      
      // Start slideshow after first few images are loaded
      Promise.all(preloadPromises).then(() => {
        setShuffledImages(imagePaths); // No shuffling for faster loading
        setIsLoading(false);
        setShowImages(true);
      });
    };

    loadImages();
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    if (shuffledImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % shuffledImages.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [shuffledImages.length]);

  if (isLoading || shuffledImages.length === 0) {
    return (
      <div className="slideshow-container">
        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-romantic-rose/10 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-romantic-rose/20 flex items-center justify-center">
              <span className="text-3xl">📸</span>
            </div>
            <p className="text-lg font-elegant mb-2">
              loading our love story...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="slideshow-container w-full flex justify-center px-4">
      <div className="relative w-[85vw] h-[85vw] max-w-lg max-h-lg rounded-lg overflow-hidden">
        {shuffledImages.map((imagePath, index) => (
          <div
            key={imagePath}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={imagePath}
              alt={`Love story moment ${index + 1}`}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </div>
        ))}
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        
        {/* Progress indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {shuffledImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-romantic-rose scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoSlideshow;