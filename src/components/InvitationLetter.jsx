import React from 'react';
import ParentsInfo from './ParentsInfo';
import EventCard from './EventCard';

export default function InvitationLetter() {
  return (
    <section
      className="animate-fade-in-up"
      style={{
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        padding: '36px 16px 48px',
        backgroundColor: '#ffffff',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.05)',
        borderRadius: '24px',
        position: 'relative'
      }}
    >
      {/* Decorative Top Accent line/ornament */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '28px'
        }}
      >
        <div style={{ height: '1px', width: '48px', background: 'linear-gradient(90deg, transparent, #5D041E)' }} />
        <span style={{ color: '#5D041E', fontSize: '18px' }}>❦</span>
        <div style={{ height: '1px', width: '48px', background: 'linear-gradient(90deg, #5D041E, transparent)' }} />
      </div>

      {/* Main Invitation Greeting Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2
          style={{
            fontFamily: "'Lora', serif",
            fontSize: '19px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            color: '#000624',
            lineHeight: 1.55,
            padding: '0 8px'
          }}
        >
          TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH ĐẾN<br />
          CHUNG VUI CÙNG GIA ĐÌNH CHÚNG TÔI
        </h2>
      </div>

      {/* Parents Section */}
      <ParentsInfo />

      {/* Calligraphy Names */}
      <div
        style={{
          textAlign: 'center',
          margin: '20px 0 32px'
        }}
      >
        <div
          className="font-bucthu"
          style={{
            fontSize: '52px',
            lineHeight: '1.25',
            color: '#000624',
            textShadow: '0 1px 2px rgba(0, 6, 36, 0.08)'
          }}
        >
          <p>Đoàn Dũng</p>
          <p style={{ fontSize: '38px', margin: '4px 0', color: '#5D041E' }}>&amp;</p>
          <p>Thùy Dương</p>
        </div>
      </div>

      {/* Event Card 1: Bữa Tiệc Chung Vui */}
      <EventCard
        title="BỮA TIỆC CHUNG VUI"
        timeText="ĐƯỢC TỔ CHỨC VÀO LÚC 17:00 - CHỦ NHẬT"
        dateText="29.11.2026"
        lunarDate="(Tức ngày 21 tháng 10 năm Bính Ngọ)"
        venue="TẠI TRUNG TÂM VĂN HÓA XÃ NGŨ HIỆP"
        mapUrl="https://maps.app.goo.gl/N7hnAKUjhuyRwC6n7?g_st=ic"
        calendarStartDate="20261129T100000Z"
        calendarEndDate="20261129T130000Z"
      />

      {/* Event Card 2: Lễ Thành Hôn */}
      <EventCard
        title="LỄ THÀNH HÔN"
        timeText="ĐƯỢC TỔ CHỨC VÀO LÚC 17:30 - CHỦ NHẬT"
        dateText="29.11.2026"
        lunarDate="(Tức ngày 21 tháng 10 năm Bính Ngọ)"
        venue="TẠI TRUNG TÂM VĂN HÓA XÃ NGŨ HIỆP"
        mapUrl="https://maps.app.goo.gl/N7hnAKUjhuyRwC6n7?g_st=ic"
        calendarStartDate="20261129T103000Z"
        calendarEndDate="20261129T140000Z"
      />

      {/* Decorative Bottom Accent */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '16px'
        }}
      >
        <div style={{ height: '1px', width: '48px', background: 'linear-gradient(90deg, transparent, #5D041E)' }} />
        <span style={{ color: '#5D041E', fontSize: '18px' }}>❦</span>
        <div style={{ height: '1px', width: '48px', background: 'linear-gradient(90deg, #5D041E, transparent)' }} />
      </div>
    </section>
  );
}
