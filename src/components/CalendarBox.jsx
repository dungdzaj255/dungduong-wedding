import React from 'react';
import { Heart } from 'lucide-react';

export default function CalendarBox({ selectedDay = 29, month = 11, year = 2026 }) {
  // November 2026:
  // Nov 1 is Sunday.
  // Using Monday-first:
  // Mon: 2, 9, 16, 23, 30
  // Tue: 3, 10, 17, 24
  // Wed: 4, 11, 18, 25
  // Thu: 5, 12, 19, 26
  // Fri: 6, 13, 20, 27
  // Sat: 7, 14, 21, 28
  // Sun: 1, 8, 15, 22, 29

  const weekHeaders = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  
  // Cells for November 2026 (starts Sunday, so 6 empty slots before Nov 1):
  const cells = [
    null, null, null, null, null, null, 1,
    2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29,
    30, null, null, null, null, null, null
  ];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8px 12px',
        color: '#ffffff',
        fontFamily: 'Lora, serif',
        userSelect: 'none'
      }}
    >
      {/* Week Headers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          textAlign: 'center',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.5px',
          paddingBottom: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
          marginBottom: '6px'
        }}
      >
        {weekHeaders.map((h, i) => (
          <span
            key={i}
            style={{
              color: i === 6 ? '#ffc2c2' : '#ffffff',
              opacity: 0.95
            }}
          >
            {h}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          rowGap: '4px',
          textAlign: 'center',
          fontSize: '13px',
          fontWeight: 500
        }}
      >
        {cells.map((day, idx) => {
          if (!day) {
            return <div key={idx} style={{ height: '30px' }} />;
          }

          const isSelected = day === selectedDay;

          return (
            <div
              key={idx}
              style={{
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              {isSelected ? (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    color: '#5D041E',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 14px rgba(255, 255, 255, 0.7)',
                    position: 'relative'
                  }}
                >
                  <Heart
                    size={11}
                    fill="#5D041E"
                    color="#5D041E"
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-3px'
                    }}
                  />
                  <span>{day}</span>
                </div>
              ) : (
                <span
                  style={{
                    color: idx % 7 === 6 ? '#ffc2c2' : '#ffffff',
                    opacity: idx % 7 === 6 ? 0.95 : 0.9
                  }}
                >
                  {day}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
