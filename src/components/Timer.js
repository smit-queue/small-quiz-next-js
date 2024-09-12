'use client';
import { useState, useEffect } from 'react';

const Timer = ({ time, onTimeUp }) => {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    setSeconds(time);
  }, [time]);

  useEffect(() => {
    if (seconds === 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeUp]);

  return (
    <div className="timer flex p-1">
      <p className="font-bold  text-red-600">{seconds}</p>
      <span className="ml-1">seconds remaining</span>
      <div>
      </div>
    </div>
  );
};

export default Timer;
