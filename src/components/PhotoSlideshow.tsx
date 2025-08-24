import { useState, useEffect } from 'react';

const PhotoSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    const loadImages = async () => {
      // Try to load images, starting with more and falling back to fewer
      const tryImageCounts = [40, 30, 20, 10];
      let workingImages: string[] = [];
      
      for (const count of tryImageCounts) {
        const imageNumbers = Array.from({ length: count }, (_, i) => i + 1);
        const imagePaths = imageNumbers.map(num => 
          `/images/slideshow/img-${num.toString().padStart(3, '0')}.jpg`
        );
        
        // Test if images exist by trying to load the first few
        const testImage = new Image();
        try {
          await new Promise((resolve, reject) => {
            testImage.onload = resolve;
            testImage.onerror = reject;
            testImage.src = imagePaths[0];
          });
          workingImages = imagePaths;
          break;
        } catch {
          // Try next count
          continue;
        }
      }
      
      if (workingImages.length === 0) {
        // Fallback to placeholder
        workingImages = ['/placeholder.svg'];
      }
      
      // Shuffle the images randomly
      const shuffled = shuffleArray(workingImages);
      setShuffledImages(shuffled);
      setIsLoading(false);
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
        <div className="text-center text-muted-foreground">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-romantic-rose/20 flex items-center justify-center">
            <span className="text-3xl">📸</span>
          </div>
          <p className="text-lg font-elegant mb-2">
            loading our love story...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="slideshow-container">
      <div className="relative w-full h-80 md:h-96 lg:h-[500px] rounded-lg overflow-hidden">
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
              className="w-full h-full object-cover"
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
      
      <div className="text-center mt-6">
        <p className="text-lg font-elegant text-romantic-rose mb-1">
          our love story
        </p>
        <p className="text-sm text-muted-foreground">
          {shuffledImages.length} precious moments • randomized each visit
        </p>
      </div>
    </div>
  );
};

export default PhotoSlideshow;