import React, {useEffect, useState} from 'react';
import {playTinkleSound} from '../utils/soundEffects';

export default function EnvelopeCover({isOpen, onOpen}) {
    const [shouldRender, setShouldRender] = useState(!isOpen);
    const [isSparkling, setIsSparkling] = useState(false);
    const [isSlidingUp, setIsSlidingUp] = useState(false);
    const [isCardPopped, setIsCardPopped] = useState(false);

    useEffect(() => {
        if (isOpen && !isSlidingUp) {
            setIsSlidingUp(true);
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 1200);
            return () => clearTimeout(timer);
        } else if (!isOpen) {
            setShouldRender(true);
            setIsSlidingUp(false);
            setIsSparkling(false);
            setIsCardPopped(false);
        }
    }, [isOpen]);

    if (!shouldRender) return null;

    const handleOpenClick = () => {
        if (isSparkling || isSlidingUp) return;

        // 1. Âm thanh chuông pha lê trong trẻo
        playTinkleSound();

        // 2. Hiệu ứng sáp niêm phong nở hoa và lấp lánh
        setIsSparkling(true);

        // 3. Thiệp/ảnh cưới nhô lên khỏi phong bì đỏ burgundy
        setTimeout(() => {
            setIsCardPopped(true);
        }, 250);

        // 4. Toàn bộ màn thiệp trượt lên mềm mại và mở trang chính
        setTimeout(() => {
            setIsSlidingUp(true);
            if (onOpen) onOpen();
            setTimeout(() => {
                setShouldRender(false);
            }, 1300);
        }, 850);
    };

    // Cánh hoa rơi phong cách Burgundy & Gold
    const petals = [
        {left: '10%', size: 18, color: '#5D041E', sway: '12px', dur: '18s', delay: '-1s'},
        {left: '26%', size: 15, color: '#c9a24a', sway: '-14px', dur: '15s', delay: '-5s'},
        {left: '44%', size: 20, color: '#8b1d3d', sway: '10px', dur: '20s', delay: '-10s'},
        {left: '62%', size: 16, color: '#e5b869', sway: '-18px', dur: '17s', delay: '-3s'},
        {left: '79%', size: 22, color: '#5D041E', sway: '14px', dur: '19s', delay: '-8s'},
        {left: '91%', size: 14, color: '#ffffff', sway: '-10px', dur: '16s', delay: '-6s'},
    ];

    return (
        <div
            id="envelope-intro-screen"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                userSelect: 'none',
                background: 'radial-gradient(ellipse at center, #350210 0%, #200109 55%, #100004 100%)',
                opacity: isSlidingUp ? 0 : 1,
                pointerEvents: isSlidingUp ? 'none' : 'auto',
                transition: 'opacity 1100ms cubic-bezier(0.25, 1, 0.5, 1)',
            }}
        >
            {/* Texture họa tiết nền mờ ảo sang trọng */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    opacity: 0.15,
                    background: 'radial-gradient(circle, rgba(201,162,74,0.15) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />

            {/* Ánh sáng vàng nhẹ phía sau phong bì */}
            <div
                style={{
                    position: 'absolute',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(201,162,74,0.18) 0%, rgba(93,4,30,0.1) 50%, transparent 70%)',
                    pointerEvents: 'none',
                    filter: 'blur(30px)',
                }}
            />

            {/* Hiệu ứng cánh hoa rơi nhẹ nhàng */}
            <div style={{position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1}}>
                {petals.map((p, idx) => (
                    <div
                        key={idx}
                        style={{
                            position: 'absolute',
                            left: p.left,
                            top: '-30px',
                            color: p.color,
                            fontSize: `${p.size}px`,
                            animation: `envelope-petal-fall ${p.dur} ease-in-out ${p.delay} infinite`,
                            '--sway': p.sway,
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" style={{opacity: 0.85}}>
                            <ellipse cx="12" cy="7" rx="3.5" ry="6.5" transform="rotate(-15 12 7)"/>
                            <ellipse cx="12" cy="7" rx="2" ry="4" fill="rgba(255,255,255,0.4)"/>
                        </svg>
                    </div>
                ))}
            </div>

            {/* Main Wrapper di chuyển khi mở */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transform: isSlidingUp ? 'translateY(-120vh) scale(0.95)' : 'translateY(0) scale(1)',
                    transition: 'transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)',
                    willChange: 'transform',
                }}
            >
                {/* Header Text phong cách Burgundy Romance */}
                <div style={{textAlign: 'center', marginBottom: '14px'}}>
                    <p
                        style={{
                            fontFamily: '"Lora", serif',
                            letterSpacing: '0.28em',
                            textTransform: 'uppercase',
                            fontSize: '13px',
                            color: '#d4af37',
                            fontWeight: 600,
                            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        }}
                    >
                        Wedding Invitation
                    </p>
                    <div
                        style={{
                            width: '48px',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, #c9a24a, transparent)',
                            margin: '8px auto 0',
                        }}
                    />
                </div>

                {/* Khung Phong Bì Cưới Cùng Các Layer Vật Liệu Thực Tế */}
                <div
                    style={{
                        position: 'relative',
                        width: '320px',
                        maxWidth: '88vw',
                        aspectRatio: '340 / 380',
                    }}
                >
                    {/* Layer 1: Nền nắp sau phong bì (thiep_1.png) */}
                    <img
                        src="/images/thiep_1.png"
                        alt="Phong bì cưới"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '110%',
                            height: 'auto',
                            left: '-5%',
                            top: '30%',
                            objectFit: 'contain',
                            zIndex: 1,
                            pointerEvents: 'none',
                            filter: 'drop-shadow(0 20px 35px rgba(0,0,0,0.75))',
                        }}
                    />

                    {/* Layer 2: Cành hoa khô bên trái phong bì (flower_3) */}
                    <div
                        style={{
                            position: 'absolute',
                            left: '-18%',
                            bottom: '-5%',
                            zIndex: 5,
                            width: '46%',
                            pointerEvents: 'none',
                            transform: 'rotate(-10deg)',
                        }}
                    >
                        <img
                            src="/images/flower_3.png"
                            alt=""
                            style={{
                                width: '100%',
                                height: 'auto',
                                filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.45))',
                            }}
                        />
                    </div>

                    {/* Layer 3: Cành hoa nhành cây bên phải nhô ra (flower_1) */}
                    <div
                        style={{
                            position: 'absolute',
                            right: '-6%',
                            top: '8%',
                            zIndex: 2,
                            width: '26%',
                            pointerEvents: 'none',
                            transform: 'rotate(25deg)',
                        }}
                    >
                        <img
                            src="/images/flower_1.png"
                            alt=""
                            style={{
                                width: '100%',
                                height: 'auto',
                                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))',
                            }}
                        />
                    </div>

                    {/* Layer 4: Bức ảnh thiệp cặp đôi bên trong nhô lên khi mở */}
                    <div
                        style={{
                            position: 'absolute',
                            left: '12%',
                            top: '12%',
                            width: '76%',
                            zIndex: 3,
                            transform: isCardPopped
                                ? 'translateY(-54px) rotate(-1.5deg) scale(1.04)'
                                : 'translateY(0) rotate(1.5deg)',
                            transition: 'all 750ms cubic-bezier(0.18, 0.89, 0.32, 1.25)',
                            filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: '#fbf9f5',
                                padding: '8px',
                                borderRadius: '3px',
                                border: '1px solid #ebdcd0',
                                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.04)',
                            }}
                        >
                            {/* Ảnh cưới cặp đôi */}
                            <div
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    aspectRatio: '4 / 3',
                                    overflow: 'hidden',
                                    borderRadius: '2px',
                                    backgroundColor: '#ece3d6',
                                }}
                            >
                                <img
                                    src="/images/anh_thiep.webp"
                                    alt="Đoàn Dũng & Thùy Dương"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center 43%',
                                    }}
                                />
                            </div>

                            {/* Tên cặp đôi & ngày cưới */}
                            <div style={{paddingTop: '8px', textAlign: 'center'}}>
                                <h2
                                    style={{
                                        fontFamily: '"Lora", serif',
                                        fontSize: '18px',
                                        fontWeight: 700,
                                        color: '#5D041E',
                                        lineHeight: 1.2,
                                    }}
                                >
                                    Đoàn Dũng <span style={{color: '#c9a24a', fontWeight: 'normal'}}>&amp;</span> Thùy
                                    Dương
                                </h2>
                                <p
                                    style={{
                                        fontFamily: '"Lora", serif',
                                        fontSize: '12px',
                                        color: '#846b5a',
                                        marginTop: '3px',
                                        fontWeight: 500,
                                        letterSpacing: '0.06em',
                                    }}
                                >
                                    29.11.2026 • 17:30
                                </p>
                            </div>
                        </div>
                    </div>

                    {/*Layer 5: Túi nắp trước phong bì (thiep_2.png)*/}
                    <img
                        src="/images/thiep_2.png"
                        alt=""
                        aria-hidden="true"
                        style={{
                            position: 'absolute',
                            left: '-2.7%',
                            top: '33%',
                            width: '104%',
                            height: 'auto',
                            zIndex: 4,
                            pointerEvents: 'none',
                            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))',
                        }}
                    />

                    {/* Layer 6: Chùm hoa điểm xuyết góc nắp phong bì (flower_2) */}
                    <div
                        style={{
                            position: 'absolute',
                            right: '-8%',
                            top: '26%',
                            width: '42%',
                            zIndex: 5,
                            pointerEvents: 'none',
                            transform: isSparkling ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                            transition: 'transform 0.4s ease',
                        }}
                    >
                        <img
                            src="/images/flower_2.png"
                            alt=""
                            style={{
                                width: '100%',
                                height: 'auto',
                                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.35))',
                            }}
                        />
                    </div>

                    {/* Layer 7: Con dấu sáp sáp niêm phong (letter_wax.png) ngay giữa miệng túi phong bì */}
                    <div
                        onClick={handleOpenClick}
                        title="Chạm để mở thiệp cưới"
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '92%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 6,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '46px',
                            height: '46px',
                            borderRadius: '50%',
                        }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: isSparkling ? 'scale(1.2)' : 'scale(1)',
                                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                animation: !isSparkling ? 'envelope-seal-pulse 2.4s ease-in-out infinite' : undefined,
                            }}
                        >
                            <img
                                src="/images/letter_wax.png"
                                alt="Con dấu sáp"
                                style={{
                                    position: 'absolute',
                                    width: '115px',
                                    height: '115px',
                                    maxWidth: 'none',
                                    filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.65))',
                                    pointerEvents: 'none',
                                }}
                            />
                        </div>
                    </div>

                    {/* Bảng tên gỗ nhỏ treo trang trí phong bì cưới (name_board) */}
                    <div
                        style={{
                            position: 'absolute',
                            right: '-10%',
                            bottom: '2%',
                            width: '38%',
                            zIndex: 5,
                            pointerEvents: 'none',
                            transform: 'rotate(6deg)',
                            opacity: 0.92,
                        }}
                    >
                        <img
                            src="/images/name_board.png"
                            alt=""
                            style={{
                                width: '100%',
                                height: 'auto',
                                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))',
                            }}
                        />
                    </div>

                    {/* Hiệu ứng lấp lánh (Sparkle Stars) bung nở khi chạm mở */}
                    {isSparkling && (
                        <>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '60%',
                                    left: '26%',
                                    width: '32px',
                                    height: '32px',
                                    color: '#c9a24a',
                                    zIndex: 10,
                                    pointerEvents: 'none',
                                    animation: 'envelope-sparkle-star 0.7s ease-out forwards',
                                }}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9"/>
                                </svg>
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '64%',
                                    right: '24%',
                                    width: '36px',
                                    height: '36px',
                                    color: '#f6e29f',
                                    zIndex: 10,
                                    pointerEvents: 'none',
                                    animation: 'envelope-sparkle-star 0.7s ease-out 100ms forwards',
                                }}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9"/>
                                </svg>
                            </div>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '76%',
                                    left: '48%',
                                    width: '40px',
                                    height: '40px',
                                    color: '#c9a24a',
                                    zIndex: 10,
                                    pointerEvents: 'none',
                                    animation: 'envelope-sparkle-star 0.7s ease-out 60ms forwards',
                                }}
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9"/>
                                </svg>
                            </div>
                        </>
                    )}
                </div>

                {/* Nút bấm mở thiệp với phong cách đỏ Burgundy & Vàng ánh kim */}
                <div
                    style={{
                        marginTop: '24px',
                        zIndex: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                    }}
                >
                    <button
                        type="button"
                        onClick={handleOpenClick}
                        disabled={isSparkling || isSlidingUp}
                        style={{
                            position: 'relative',
                            backgroundColor: '#5D041E',
                            color: '#F4ECE1',
                            fontFamily: '"Lora", serif',
                            fontSize: '12px',
                            fontWeight: 500,
                            letterSpacing: '0.04em',
                            padding: '12px 32px',
                            borderRadius: '9999px',
                            border: '1px solid rgba(201, 162, 74, 0.6)',
                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45), 0 0 15px rgba(201, 162, 74, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
            <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <svg style={{width: '18px', height: '18px', color: '#c9a24a'}} viewBox="0 0 24 24" fill="currentColor">
                <path
                    d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span>Chạm để mở thiệp</span>
            </span>

                        {/* Hiệu ứng ánh sáng chạy qua (Shimmer) */}
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                width: '45px',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                animation: 'envelope-shimmer 2.8s ease-in-out infinite',
                                pointerEvents: 'none',
                            }}
                        />
                    </button>

                    <span
                        style={{
                            marginTop: '10px',
                            fontSize: '11px',
                            color: '#c9a24a',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            opacity: 0.75,
                            fontFamily: '"Lora", serif',
                        }}
                    >
                        Nhấn vào phong bì hoặc nút mở thiệp
                    </span>
                </div>
            </div>
        </div>
    );
}
