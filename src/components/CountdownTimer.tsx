import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isPastDate, setIsPastDate] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference <= 0) {
        // Switch to count-up mode
        setIsPastDate(true);
        const timePassed = now - target;
        
        return {
          days: Math.floor(timePassed / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timePassed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((timePassed % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((timePassed % (1000 * 60)) / 1000)
        };
      } else {
        // Count-down mode
        setIsPastDate(false);
        
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      }
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Calculate initial time
    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="text-center fade-in">
      <h2 className="text-2xl md:text-3xl font-elegant text-romantic-rose mb-8">
        {isPastDate ? "time together since our wedding..." : "counting down to forever..."}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
        <div className="romantic-card rounded-2xl p-4 md:p-6 text-center floating" style={{ animationDelay: '0s' }}>
          <div className="text-4xl md:text-6xl lg:text-7xl font-black text-romantic-rose mb-2">
            {timeLeft.days}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground/70 uppercase tracking-widest font-elegant font-light">
            {timeLeft.days === 1 ? 'day' : 'days'}
          </div>
        </div>
        
        <div className="romantic-card rounded-2xl p-4 md:p-6 text-center floating" style={{ animationDelay: '0.2s' }}>
          <div className="text-4xl md:text-6xl lg:text-7xl font-black text-romantic-rose mb-2">
            {timeLeft.hours}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground/70 uppercase tracking-widest font-elegant font-light">
            {timeLeft.hours === 1 ? 'hour' : 'hours'}
          </div>
        </div>
        
        <div className="romantic-card rounded-2xl p-4 md:p-6 text-center floating" style={{ animationDelay: '0.4s' }}>
          <div className="text-4xl md:text-6xl lg:text-7xl font-black text-romantic-rose mb-2">
            {timeLeft.minutes}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground/70 uppercase tracking-widest font-elegant font-light">
            {timeLeft.minutes === 1 ? 'minute' : 'minutes'}
          </div>
        </div>
        
        <div className="romantic-card rounded-2xl p-4 md:p-6 text-center floating" style={{ animationDelay: '0.6s' }}>
          <div className="text-4xl md:text-6xl lg:text-7xl font-black text-romantic-rose mb-2">
            {timeLeft.seconds}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground/70 uppercase tracking-widest font-elegant font-light">
            {timeLeft.seconds === 1 ? 'second' : 'seconds'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;