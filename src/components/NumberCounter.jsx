import { useState, useEffect, useRef } from 'react';

const NumberCounter = ({ 
  from, 
  to, 
  speed = 3500,
  plus, 
  unit,
  refreshInterval = 50, 
  formatNumber = true 
}) => {
  const [currentNumber, setCurrentNumber] = useState(from);
  const requestRef = useRef();
  const startTimeRef = useRef(Date.now());

  const animate = () => {
    const elapsed = Date.now() - startTimeRef.current;
    const progress = Math.min(elapsed / speed, 1);
    
    const currentValue = from + (to - from) * progress;
    setCurrentNumber(Math.round(currentValue));

    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setCurrentNumber(to); // Ensure final value is exact
    }
  };

  useEffect(() => {
    startTimeRef.current = Date.now();
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [from, to, speed]);

  return (
    <span>
     {plus ? '+':''} {formatNumber 
        ? currentNumber.toLocaleString() 
        : currentNumber} {unit ? unit:''}
    </span>
  );
};

export default NumberCounter;