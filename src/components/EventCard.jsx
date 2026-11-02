import React from 'react';
import { MapPin, CalendarPlus } from 'lucide-react';

export default function EventCard({
  title,
  timeText,
  dateText = '29.11.2026',
  lunarDate = '(Tức ngày 21 tháng 10 năm Bính Ngọ)',
  venue = 'TẠI TRUNG TÂM VĂN HÓA XÃ NGŨ HIỆP',
  mapUrl = 'https://maps.app.goo.gl/N7hnAKUjhuyRwC6n7?g_st=ic',
  calendarStartDate,
  calendarEndDate
}) {
  const handleCalendar = (e) => {
    e.stopPropagation();
    // 29 Nov 2026: 20261129T100000Z (17:00 VN = 10:00 UTC)
    const start = calendarStartDate || '20261129T100000Z';
    const end = calendarEndDate || '20261129T140000Z';
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Đám cưới Đoàn Dũng & Thùy Dương - ${title}`
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      `Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi tại ${venue}.`
    )}&location=${encodeURIComponent(venue)}`;
    window.open(calUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="wedding-card"
      style={{
        margin: '0 auto 28px',
        padding: '36px 24px',
        color: '#ffffff',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle decorative background gradient / glow */}
      <div
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 60%)',
          pointerEvents: 'none'
        }}
      />

      {/* Event Title */}
      <h3
        style={{
          fontFamily: "'Lora', serif",
          fontSize: '20px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '12px'
        }}
      >
        {title}
      </h3>

      {/* Event Time */}
      <p
        style={{
          fontFamily: "'Lora', serif",
          fontSize: '15px',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          opacity: 0.95,
          marginBottom: '18px'
        }}
      >
        {timeText}
      </p>

      {/* Date Pill / Badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1.5px solid rgba(255, 255, 255, 0.85)',
          borderRadius: '10px',
          padding: '6px 28px',
          margin: '0 auto 14px',
          fontSize: '28px',
          fontWeight: 700,
          letterSpacing: '1.5px',
          lineHeight: 1.2
        }}
      >
        {dateText}
      </div>

      {/* Lunar Date */}
      <p
        style={{
          fontFamily: "'Lora', serif",
          fontSize: '14.5px',
          fontStyle: 'italic',
          opacity: 0.9,
          marginBottom: '18px'
        }}
      >
        {lunarDate}
      </p>

      {/* Venue */}
      <p
        style={{
          fontFamily: "'Lora', serif",
          fontSize: '17px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          lineHeight: 1.4,
          marginBottom: '24px',
          padding: '0 8px'
        }}
      >
        {venue}
      </p>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-pulse-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            border: '1.5px solid #ffffff',
            borderRadius: '100px',
            padding: '8px 24px',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '14.5px',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            backgroundColor: 'transparent',
            transition: 'all 0.2s ease'
          }}
        >
          <MapPin size={16} />
          <span>Xem chỉ đường</span>
        </a>

        <button
          onClick={handleCalendar}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '100px',
            padding: '8px 18px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '13.5px',
            fontWeight: 500,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title="Thêm vào Google Calendar"
        >
          <CalendarPlus size={15} />
          <span>Lưu lịch</span>
        </button>
      </div>
    </div>
  );
}
