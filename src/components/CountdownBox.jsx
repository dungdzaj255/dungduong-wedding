import React, { useState, useEffect } from 'react';

export default function CountdownBox({ targetDate = '2026-11-29T17:30:00+07:00' }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: 'NGÀY', value: timeLeft.days },
    { label: 'GIỜ', value: timeLeft.hours },
    { label: 'PHÚT', value: timeLeft.minutes },
    { label: 'GIÂY', value: timeLeft.seconds }
  ];

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        width: '100%',
        height: '100%'
      }}
    >
      {units.map((u, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: '100%',
            backgroundColor: '#5D041E',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 12px rgba(93, 4, 30, 0.25)',
            transition: 'transform 0.2s ease',
            padding: '6px 2px'
          }}
        >
          <span
            style={{
              fontSize: '26px',
              fontWeight: 700,
              fontFamily: 'Lora, serif',
              lineHeight: 1.1
            }}
          >
            {String(u.value).padStart(2, '0')}
          </span>
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '1px',
              fontFamily: 'Lora, serif',
              fontWeight: 500,
              opacity: 0.9,
              marginTop: '4px'
            }}
          >
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
