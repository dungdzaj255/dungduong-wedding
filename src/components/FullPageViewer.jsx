import React, { useState, useEffect, useRef } from 'react';
import useInViewAnimation from '../hooks/useInViewAnimation';
import pageData from '../data/pageData.json';
import CountdownBox from './CountdownBox';
import CalendarBox from './CalendarBox';
import RsvpBox from './RsvpBox';
import Lightbox from './Lightbox';

export default function FullPageViewer({ viewMode = 'responsive' }) {
  const inViewRef = useInViewAnimation();
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Collect all gallery photos for lightbox
  const galleryPhotoIds = [
    'XLbd5vWc6e',
    '03mmnniHWa',
    'Q1YmzXFFjL',
    'g5IV5uiGLc',
    'ypuPzT_Oc4',
    'F03liH8_uX'
  ];

  const galleryImages = galleryPhotoIds
    .map(id => pageData.elements.find(el => el.id === id))
    .filter(Boolean)
    .map(el => el.props.localImageUrl);

  // Resize listener to scale 500px canvas to screen width
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      let targetWidth = window.innerWidth;
      if (viewMode === 'mobile') {
        targetWidth = Math.min(390, window.innerWidth);
      } else if (viewMode === 'full') {
        targetWidth = 500;
      } else {
        targetWidth = Math.min(500, window.innerWidth);
      }
      const newScale = targetWidth / 500;
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  const getBorderStyle = (borderPosition, size, style, color) => {
    if (!style || style === 'none' || !size) return {};
    const b = `${size}px ${style} ${color || '#ffffff'}`;
    switch (borderPosition) {
      case 'all':
        return { border: b };
      case 'top-bottom':
        return { borderTop: b, borderBottom: b };
      case 'right-left':
      case 'left-right':
        return { borderLeft: b, borderRight: b };
      case 'top':
        return { borderTop: b };
      case 'bottom':
        return { borderBottom: b };
      case 'left':
        return { borderLeft: b };
      case 'right':
        return { borderRight: b };
      default:
        return { border: b };
    }
  };

  const renderElement = (el) => {
    const { id, type, top, left, width, height, zIndex, props } = el;

    // Suppress gsih1NSVB5 because its text is integrated cleanly into RsvpBox header
    if (id === 'gsih1NSVB5') return null;

    const baseStyle = {
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      width: width === 'auto' ? 'auto' : `${width}px`,
      height: height === 'auto' ? 'auto' : `${height}px`,
      zIndex: zIndex || 1,
      boxSizing: 'border-box'
    };

    // 1. COUNTDOWN BOX
    if (type === 'CountdownBoxV2') {
      return (
        <div ref={inViewRef} key={id} style={baseStyle}>
          <CountdownBox targetDate="2026-11-29T17:30:00+07:00" />
        </div>
      );
    }

    // 2. CALENDAR BOX
    if (type === 'CalendarBoxV2') {
      return (
        <div ref={inViewRef} key={id} style={baseStyle}>
          <CalendarBox selectedDay={29} month={11} year={2026} />
        </div>
      );
    }

    // 3. RSVP BOX
    if (type === 'RsvpBoxV2') {
      return (
        <div key={id} id="rsvp-section" style={baseStyle}>
          <RsvpBox
            titleText={props.titleText || 'Xác nhận tham dự'}
            subtitleText="Hãy xác nhận sự có mặt của Quý Khách để gia đình chúng tôi chuẩn bị đón tiếp chu đáo nhất!"
            buttonColor={props.buttonColor || '#5D041E'}
            buttonTextColor={props.buttonTextColor || '#ffffff'}
          />
        </div>
      );
    }

    // 4. GEOMETRIC BOX (Event cards, Gradients, Separators)
    if (type === 'GeometricBox') {
      const radius = props.borderRadius ? `${props.borderRadius[0]}px` : '0px';
      const isCard = id === '2CxL6I5WMt' || id === '9nTWaf4Zlg';

      return (
        <div
          key={id}
          style={{
            ...baseStyle,
            background: props.fill || '#5D041E',
            borderRadius: radius,
            opacity: props.opacity ?? 1,
            boxShadow: isCard
              ? '0 12px 36px rgba(93, 4, 30, 0.28)'
              : props.hasBoxShadow
                ? '0 4px 16px rgba(0,0,0,0.1)'
                : 'none',
            overflow: 'hidden'
          }}
        />
      );
    }

    // 5. LINE BOX
    if (type === 'LineBox') {
      return (
        <div
          key={id}
          style={{
            ...baseStyle,
            backgroundColor: props.fill || props.borderColor || '#5D041E',
            transform: props.rotation ? `rotate(${props.rotation}deg)` : undefined,
            opacity: props.opacity ?? 1
          }}
        />
      );
    }

    // 6. PHOTO BOX
    if (type === 'PhotoBox') {
      const imgSrc = props.localImageUrl;
      const radius = props.borderRadius ? `${props.borderRadius[0]}px` : '0px';
      const isGalleryPhoto = galleryPhotoIds.includes(id);

      const transformParts = [];
      if (props.flipX && props.flipY) transformParts.push('scale(-1, -1)');
      else if (props.flipX) transformParts.push('scale(-1, 1)');
      else if (props.flipY) transformParts.push('scale(1, -1)');
      if (props.rotation) transformParts.push(`rotate(${props.rotation}deg)`);

      const borderStyles = getBorderStyle(
        props.borderPosition,
        props.borderSize,
        props.borderStyle,
        props.borderColor
      );

      return (
        <div
          key={id}
          onClick={() => {
            if (isGalleryPhoto) {
              const idx = galleryPhotoIds.indexOf(id);
              if (idx !== -1) setLightboxIndex(idx);
            }
          }}
          style={{
            ...baseStyle,
            backgroundImage: `url("${imgSrc}")`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat',
            borderRadius: radius,
            opacity: props.opacity ?? 1,
            cursor: isGalleryPhoto ? 'pointer' : 'default',
            boxShadow: props.hasBoxShadow
              ? `${props.boxShadow?.offsetX || 0}px ${props.boxShadow?.offsetY || 4}px ${props.boxShadow?.blur || 12
              }px ${props.boxShadow?.color || 'rgba(0,0,0,0.15)'}`
              : 'none',
            transform: transformParts.length ? transformParts.join(' ') : undefined,
            ...borderStyles,
            transition: 'transform 0.25s ease, box-shadow 0.25s ease'
          }}
          title={isGalleryPhoto ? 'Bấm để phóng to ảnh' : undefined}
        />
      );
    }

    // 7. TEXT BOX
    if (type === 'TextBox') {
      let text = props.text || '';
      const font = props.fontFamily || 'Lora, serif';
      const url = props.clickAction?.url || props.hyperlink;
      const isLink = Boolean(url);
      const isPulse = props.continuousAnimation?.type === 'pulse';

      const borderStyles = getBorderStyle(
        props.borderPosition,
        props.borderSize,
        props.borderStyle,
        props.borderColor
      );

      const textStyle = {
        fontFamily: font,
        fontSize: `${props.fontSize || 16}px`,
        fontWeight: props.fontWeight || 'normal',
        fontStyle: props.fontStyle || 'normal',
        color: props.color || '#000624',
        textAlign: props.textAlign || 'left',
        lineHeight: props.lineHeight || 1.3,
        letterSpacing: props.letterSpacing ? `${props.letterSpacing}px` : 'normal',
        textTransform: props.textTransform || 'none',
        opacity: props.opacity ?? 1,
        backgroundColor: props.backgroundColor || 'transparent',
        padding: props.padding
          ? `${props.padding[0]}px ${props.padding[1]}px ${props.padding[2]}px ${props.padding[3]}px`
          : '0',
        borderRadius: props.borderRadius ? `${props.borderRadius[0]}px` : '0',
        transform: props.rotation ? `rotate(${props.rotation}deg)` : undefined,
        ...borderStyles
      };

      // Button / Link (e.g. Xem chỉ đường on Google Maps)
      if (isLink) {
        return (
          <a
            key={id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={isPulse ? 'animate-pulse-glow' : ''}
            style={{
              ...baseStyle,
              ...textStyle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <span dangerouslySetInnerHTML={{ __html: text }} />
          </a>
        );
      }

      return (
        <div
          key={id}
          style={{
            ...baseStyle,
            ...textStyle,
            height: 'auto',
            display: 'block'
          }}
        >
          <div style={{ width: '100%' }} dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      );
    }

    return null;
  };

  const canvasWidth = pageData.meta.width || 500;
  const canvasHeight = pageData.meta.height || 7017;
  const scaledWidth = canvasWidth * scale;
  const scaledHeight = canvasHeight * scale;

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}
    >
      {/* Canvas Wrapper */}
      <div
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          boxShadow: scale === 1 ? '0 10px 40px rgba(0,0,0,0.3)' : 'none',
          transition: 'width 0.2s ease, height 0.2s ease'
        }}
      >
        <div
          id="boxwrap"
          style={{
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
            position: 'absolute',
            top: 0,
            left: 0,
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
            backgroundColor: '#ffffff'
          }}
        >
          {pageData.elements.map(renderElement)}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={galleryImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))
        }
        onNext={() =>
          setLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))
        }
      />
    </div>
  );
}
