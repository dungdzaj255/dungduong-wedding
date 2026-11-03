import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicPlayer({
  src = '/music.mp3',
  title = 'Beautiful Girl'
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);
  const volumeRef = useRef(0.7);
  const fadeTimerRef = useRef(null);
  const hasInteractedRef = useRef(false);
  const isFadingRef = useRef(false);

  const clearFade = () => {
    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  };

  const fadeIn = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    clearFade();
    isFadingRef.current = false;

    try {
      const startVolume = audio.volume;
      const targetVolume = volumeRef.current;

      if (audio.paused) {
        audio.volume = 0;
        await audio.play();
      }

      setIsPlaying(true);

      const duration = 1200;
      const steps = 30;
      let step = 0;

      fadeTimerRef.current = setInterval(() => {
        step++;

        audio.volume = Math.min(
          targetVolume,
          startVolume + ((targetVolume - startVolume) * step) / steps
        );

        if (step >= steps) {
          clearFade();
        }
      }, duration / steps);
    } catch (err) {
      setIsPlaying(false);
    }
  };

  const fadeOut = () => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return;

    clearFade();

    setIsPlaying(false);
    isFadingRef.current = true;

    const startVolume = audio.volume;
    const duration = 700;
    const steps = 30;
    let step = 0;

    fadeTimerRef.current = setInterval(() => {
      step++;

      audio.volume = Math.max(
        0,
        startVolume * (1 - step / steps)
      );

      if (step >= steps) {
        clearFade();
        audio.pause();
        audio.volume = 0;
        isFadingRef.current = false;
      }
    }, duration / steps);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volumeRef.current;

    const handleFirstInteraction = () => {
      if (hasInteractedRef.current) return;

      hasInteractedRef.current = true;

      if (audio.paused && !isFadingRef.current) {
        fadeIn();
      }

      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    fadeIn();

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);

      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);

      clearFade();
    };
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();

    if (!audioRef.current) return;

    hasInteractedRef.current = true;

    if (!audioRef.current.paused && !isFadingRef.current) {
      fadeOut();
    } else {
      fadeIn();
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="auto"
      />

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
        {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </button>
    </>
  );
}