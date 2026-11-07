import React, {useEffect, useRef, useState} from 'react';
import {Music4, PauseIcon, Play} from 'lucide-react';

export default function MusicPlayer({ src = '/music.mp3', title = 'Aloha', autoPlayTrigger = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Khi người dùng bấm mở thiệp (autoPlayTrigger = true) thì bắt đầu phát nhạc
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log('Audio autoplay prevented by browser:', err);
      });
    }
  }, [autoPlayTrigger]);

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
            className={"music-button"}
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
          {isPlaying ? <Music4 size={22} /> : <Play size={22} />}
        </span>
        </button>
      </>
  );
}