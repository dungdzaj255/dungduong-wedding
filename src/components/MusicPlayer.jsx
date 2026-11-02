import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer({ src = '/music.mp3', title = 'Beautiful Girl' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Browser prevented autoplay
        });
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log('Audio play error:', err));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
        title={`${title} - ${isPlaying ? 'Đang phát' : 'Đã tạm dừng'}`}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '20px',
          zIndex: 9999,
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          backgroundColor: '#5D041E',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 6px 20px rgba(93, 4, 30, 0.45)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <span className={isPlaying ? 'animate-spin-slow' : ''} style={{ display: 'inline-flex' }}>
          <Music size={22} />
        </span>
      </button>
    </>
  );
}
