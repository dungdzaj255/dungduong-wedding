import React from 'react';

export default function ParentsInfo() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        maxWidth: '460px',
        margin: '0 auto 28px',
        textAlign: 'center',
        padding: '0 12px'
      }}
    >
      {/* Nhà Trai */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h4
          style={{
            fontFamily: "'Lora', serif",
            fontSize: '16px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#000624',
            marginBottom: '4px'
          }}
        >
          Nhà Trai
        </h4>
        <div
          style={{
            fontFamily: "'Lora', serif",
            fontSize: '15px',
            lineHeight: '1.6',
            color: '#222738'
          }}
        >
          <p>Ông: <strong>Phùng Đoàn Du</strong></p>
          <p>Bà: <strong>Nhân Thị Thủy</strong></p>
          <p style={{ color: '#687082', fontSize: '14px', marginTop: '2px' }}>TP. Hà Nội</p>
        </div>
      </div>

      {/* Nhà Gái */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h4
          style={{
            fontFamily: "'Lora', serif",
            fontSize: '16px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#000624',
            marginBottom: '4px'
          }}
        >
          Nhà Gái
        </h4>
        <div
          style={{
            fontFamily: "'Lora', serif",
            fontSize: '15px',
            lineHeight: '1.6',
            color: '#222738'
          }}
        >
          <p>Ông: <strong>Lê Hải Mạnh</strong></p>
          <p>Bà: <strong>Nguyễn Minh Hiếu</strong></p>
          <p style={{ color: '#687082', fontSize: '14px', marginTop: '2px' }}>TP. Hà Nội</p>
        </div>
      </div>
    </div>
  );
}
