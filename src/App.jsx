import React, {useState, useEffect, useRef} from 'react';
import FullPageViewer from './components/FullPageViewer';
import MusicPlayer from './components/MusicPlayer';
import {Smartphone, Monitor, Maximize2, Send, ChevronUp, Share2, Heart} from 'lucide-react';

export default function App() {
    const rootRef = useRef(null);
    const [isPaused, setIsPaused] = React.useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        if (!imagesLoaded || isPaused) return;

        let animationId;
        let lastTime = 0;
        const speed = 100;

        const scroll = (timestamp) => {
            if (lastTime) {
                const delta = timestamp - lastTime;

                window.scrollBy({
                    top: speed * delta / 1000,
                    behavior: 'auto'
                });
            }

            lastTime = timestamp;
            animationId = requestAnimationFrame(scroll);
        };

        animationId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationId);
    }, [isPaused, imagesLoaded]);

    // Pause auto‑scroll on user interaction (scroll, touch, wheel, key)
    React.useEffect(() => {
        const pause = () => setIsPaused(true);
        window.addEventListener('wheel', pause, {passive: true});
        window.addEventListener('touchstart', pause, {passive: true});
        window.addEventListener('touchend', pause, {passive: true});
        return () => {
            window.removeEventListener('wheel', pause);
        };
    }, []);

    // Toggle auto‑scroll when tapping on page
    const handleRootClick = (e) => {
        if (e.target.closest('.music-button')) {
            return;
        }
        if (e.target.closest('button, a, .rsvp-box, .album-photo, .light-box')) {
            setIsPaused(true);
            return;
        }
        setIsPaused(prev => !prev);
    };


    const [viewMode, setViewMode] = useState('responsive'); // 'responsive' | 'mobile' | 'full'
    const [copied, setCopied] = useState(false);

    const scrollToTop = () => {
        setIsPaused(true);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Thiệp cưới Đoàn Dũng & Thùy Dương',
                    text: 'Trân trọng kính mời bạn đến chung vui cùng Đoàn Dũng & Thùy Dương!',
                    url: window.location.href
                });
                return;
            } catch (err) {
                // Fallback to clipboard
            }
        }
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div ref={rootRef} onClick={handleRootClick} style={{
            minHeight: '100vh',
            backgroundColor: '#1f1e1d',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'relative'
        }}
        >
            {/* Background Audio Player */}
            <MusicPlayer src="/music.mp3" title="Beautiful Girl"/>

            {/* Main Full Page Viewer */}
            <main
                style={{
                    width: '100%',
                    maxWidth: '100vw',
                    position: 'relative',
                    overflowX: 'hidden'
                }}
            >
                <FullPageViewer
                    viewMode={viewMode}
                    onImagesLoaded={setImagesLoaded}
                />
            </main>

            {/* Floating Action Buttons */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '80px',
                    right: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    zIndex: 9998
                }}
            >
                {/* Share Button */}
                <button
                    onClick={handleShare}
                    aria-label="Chia sẻ"
                    title={copied ? 'Đã sao chép liên kết!' : 'Chia sẻ thiệp cưới'}
                    style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        color: '#5D041E',
                        border: '1px solid #eae5df',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <Share2 size={18}/>
                </button>

                {/* Scroll To Top Button */}
                <button
                    onClick={scrollToTop}
                    aria-label="Lên đầu trang"
                    title="Cuộn lên đầu trang"
                    style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        color: '#5D041E',
                        border: '1px solid #eae5df',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <ChevronUp size={22}/>
                </button>
            </div>

            {/* Share Toast Notification */}
            {copied && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#5D041E',
                        color: '#ffffff',
                        padding: '8px 18px',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: 600,
                        boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                        zIndex: 100000,
                        animation: 'fadeIn 0.2s ease'
                    }}
                >
                    Đã sao chép liên kết thiệp cưới!
                </div>
            )
            }
        </div>


    );
} 
