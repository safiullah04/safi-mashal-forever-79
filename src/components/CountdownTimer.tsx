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
        {isPastDate ? "Time together since our wedding..." : "Counting down to forever..."}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
        <div className="romantic-card rounded-2xl p-4 md:p-6 text-center floating" style={{ animationDelay: '0s' }}>
          <div className="text-3xl md:text-5xl font-bold text-romantic-rose mb-2">
            {timeLeft.days}
          </div>
          <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider font-elegant">
            {timeLeft.days === 1 ? 'Day' : 'Days'}
          </div>
        </div>
        
        <div className="romantic-card rounded-2xl p-4 md:p-6 text-center floating" style={{ animationDelay: '0.2s' }}>
          <div className="text-3xl md:text-5xl font-bold text-romantic-rose mb-2">
            {timeLeft.hours}
          </div>
          <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider font-elegant">
            {timeLeft.hours === 1 ? 'Hour' : 'Hours'}
          </div>
        </div>
        
        <div className="romantic-card rounded-2xl p-4 md:p-6 text-center floating" style={{ animationDelay: '0.4s' }}>
          <div className="text-3xl md:text-5xl font-bold text-romantic-rose mb-2">
            {timeLeft.minutes}
          </div>
          <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider font-elegant">
            {timeLeft.minutes === 1 ? 'Minute' : 'Minutes'}
          </div>
        </div>
        
        <div className="romantic-card rounded-2xl p-4 md:p-6 text-center floating" style={{ animationDelay: '0.6s' }}>
          <div className="text-3xl md:text-5xl font-bold text-romantic-rose mb-2">
            {timeLeft.seconds}
          </div>
          <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wider font-elegant">
            {timeLeft.seconds === 1 ? 'Second' : 'Seconds'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;