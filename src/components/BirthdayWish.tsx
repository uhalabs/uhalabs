import { useEffect, useRef, useState, useCallback } from 'react';
import Photo1 from "../assets/photo1.jpeg"
import Photo2 from "../assets/photo2.jpeg"
import Photo3 from "../assets/photo3.jpeg"
// import Photo4 from "../assets/photo4.jpeg"


const CUBE_IMAGES = [
    Photo1,
    Photo2,
    Photo3,
    Photo3,
    Photo2,
    Photo1,
];


interface TrailParticle {
    x: number; y: number; age: number; life: number;
    size: number; emoji: string; vx: number; vy: number;
}
interface AmbientOrb {
    x: number; y: number; r: number;
    vx: number; vy: number; hue: number; opacity: number;
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
const WDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WISHES = [
    '✦  You are the poem I never knew how to write  ✦',
    '✦  Every heartbeat spells your name, Uma  ✦',
    '✦  In every universe, I would find you  ✦',
    '✦  You make ordinary moments feel like magic  ✦',
    '✦  Happy Birthday to my entire world  ✦',
];
function rand(a: number, b: number) { return Math.random() * (b - a) + a; }

// ── CALENDAR ──────────────────────────────────────────────────────────────────
function Calendar() {
    const month = 3;
    const year = 2026;
    const total = new Date(year, month + 1, 0).getDate();
    const first = new Date(year, month, 1).getDay();
    const cells: (number | null)[] = [
        ...Array(first).fill(null),
        ...Array.from({ length: total }, (_, i) => i + 1),
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    return (
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
                <span style={{ fontFamily: "'Cinzel',serif", fontSize: 'clamp(16px,4vw,22px)', color: '#FFD700', letterSpacing: 2 }}>
                    {MONTHS[month]} {year}
                </span>
                <span style={{ fontSize: 18, animation: 'hb 1.2s ease-in-out infinite' }}>💖</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
                {WDAYS.map(d => (
                    <div key={d} style={{
                        textAlign: 'center', fontSize: 'clamp(8px,2vw,10px)', fontWeight: 700,
                        color: 'rgba(255,215,0,0.4)', letterSpacing: 1, textTransform: 'uppercase', paddingBottom: 8
                    }}>{d}</div>
                ))}
                {cells.map((n, i) => (
                    <div key={i} style={{
                        aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: n === 13 ? 'clamp(12px,3vw,15px)' : 'clamp(10px,2.5vw,12px)',
                        fontWeight: n === 13 ? 800 : 400,
                        color: n === 13 ? '#000' : n ? 'rgba(255,255,255,0.55)' : 'transparent',
                        borderRadius: '50%', position: 'relative',
                        background: n === 13 ? 'linear-gradient(135deg,#FFD700 0%,#FF8C00 100%)' : 'transparent',
                        boxShadow: n === 13 ? '0 0 0 3px rgba(255,215,0,0.35),0 0 0 7px rgba(255,215,0,0.12),0 8px 24px rgba(255,140,0,0.6)' : undefined,
                        animation: n === 13 ? 'calPulse 2s ease-in-out infinite' : undefined,
                    }}>
                        {n}
                        {n === 13 && (
                            <>
                                <span style={{
                                    position: 'absolute', inset: -5, borderRadius: '50%',
                                    border: '2px dashed rgba(255,215,0,0.5)', animation: 'rspin 4s linear infinite'
                                }} />
                                <span style={{ position: 'absolute', top: -22, fontSize: 13, animation: 'ebob 1.5s ease-in-out infinite' }}>💖</span>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── 3D SPINNING CUBE — responsive size ───────────────────────────────────────
function PhotoCube() {
    const [size, setSize] = useState(200);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            setSize(w < 380 ? 150 : w < 520 ? 180 : 220);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const half = size / 2;
    const faces = [
        { transform: `translateZ(${half}px)`, img: CUBE_IMAGES[0] },
        { transform: `rotateY(180deg) translateZ(${half}px)`, img: CUBE_IMAGES[1] },
        { transform: `rotateY(90deg)  translateZ(${half}px)`, img: CUBE_IMAGES[2] },
        { transform: `rotateY(-90deg) translateZ(${half}px)`, img: CUBE_IMAGES[3] },
        { transform: `rotateX(90deg)  translateZ(${half}px)`, img: CUBE_IMAGES[4] },
        { transform: `rotateX(-90deg) translateZ(${half}px)`, img: CUBE_IMAGES[5] },
    ];

    return (
        <div style={{ width: size, height: size, perspective: 1200, margin: '0 auto', flexShrink: 0 }}>
            <div className="cube-container" style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}>
                {faces.map((f, i) => (
                    <div key={i} style={{
                        position: 'absolute', width: '100%', height: '100%',
                        transform: f.transform, transformStyle: 'preserve-3d',
                        border: '1.5px solid rgba(255,215,0,0.25)',
                        borderRadius: 14, overflow: 'hidden',
                        boxShadow: '0 0 40px rgba(255,215,0,0.2), inset 0 0 30px rgba(0,0,0,0.4)',
                    }}>
                        <img src={f.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.88 }} />
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: 'linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 50%,rgba(255,255,255,0.04) 100%)',
                            pointerEvents: 'none'
                        }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── WISH TICKER ───────────────────────────────────────────────────────────────
function WishTicker() {
    const [idx, setIdx] = useState(0);
    const [show, setShow] = useState(true);
    useEffect(() => {
        const t = setInterval(() => {
            setShow(false);
            setTimeout(() => { setIdx(p => (p + 1) % WISHES.length); setShow(true); }, 600);
        }, 3500);
        return () => clearInterval(t);
    }, []);
    return (
        <p style={{
            fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic',
            fontSize: 'clamp(15px,4vw,22px)', color: 'rgba(255,215,0,0.85)',
            textAlign: 'center', letterSpacing: 1, lineHeight: 1.7,
            opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s, transform 0.6s', minHeight: 60,
        }}>
            {WISHES[idx]}
        </p>
    );
}

// ── CSS 3D BIRTHDAY CAKE ──────────────────────────────────────────────────────
function CSS3DCake() {
    const tiers = [
        { w: 170, h: 64, bottom: 16, front: 'linear-gradient(180deg,#c0392b,#922b21)', top: '#e74c3c' },
        { w: 120, h: 52, bottom: 80, front: 'linear-gradient(180deg,#e67e22,#b7540f)', top: '#f39c12' },
        { w: 74, h: 42, bottom: 132, front: 'linear-gradient(180deg,#8e44ad,#5b2c7a)', top: '#9b59b6' },
    ];
    return (
        <div style={{
            width: 200, height: 220, margin: '0 auto', position: 'relative',
            transformStyle: 'preserve-3d', perspective: 700,
            animation: 'cspin 10s ease-in-out infinite'
        }}>
            <div style={{
                position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: 180, height: 14, borderRadius: '50%',
                background: 'linear-gradient(180deg,#555,#222)', boxShadow: '0 6px 20px rgba(0,0,0,0.6)'
            }} />
            {tiers.map((t, i) => (
                <div key={i} style={{
                    position: 'absolute', bottom: t.bottom, left: '50%',
                    transform: 'translateX(-50%)', width: t.w, height: t.h, transformStyle: 'preserve-3d'
                }}>
                    <div style={{ position: 'absolute', top: -10, left: -4, right: -4, height: 20, borderRadius: 8, background: t.top, boxShadow: `0 0 20px ${t.top}88` }} />
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '6px 6px 3px 3px', background: t.front, boxShadow: '0 0 30px rgba(0,0,0,0.4)' }} />
                    <div style={{ position: 'absolute', top: 6, left: 4, right: 4, height: 6, borderRadius: 4, background: 'repeating-linear-gradient(90deg,rgba(255,255,255,0.7) 0px,rgba(255,255,255,0.7) 8px,transparent 8px,transparent 16px)' }} />
                </div>
            ))}
            {[25, 47, 69].map((left, i) => (
                <div key={i} style={{ position: 'absolute', bottom: 170, left: `${left}%`, transform: 'translateX(-50%)' }}>
                    <div style={{ width: 10, height: 30, borderRadius: '4px 4px 2px 2px', background: 'linear-gradient(180deg,#fffef0,#f0d060)', margin: '0 auto', boxShadow: '2px 0 0 rgba(180,150,40,0.3)' }} />
                    <div style={{
                        width: 10, height: 18, background: 'linear-gradient(180deg,#fff700,#FF8C00 60%,#FF4500)',
                        borderRadius: '50% 50% 30% 30%', margin: '0 auto',
                        animation: `flick ${0.3 + i * 0.07}s ease-in-out infinite alternate`,
                        boxShadow: '0 0 8px 4px rgba(255,200,0,0.7),0 0 20px 8px rgba(255,100,0,0.3)'
                    }} />
                </div>
            ))}
        </div>
    );
}

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────
function GoldDivider() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', maxWidth: 600, padding: '0 20px', boxSizing: 'border-box' }}>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,215,0,0.35),transparent)' }} />
            <span style={{ fontSize: 18, filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.7))' }}>✦</span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,transparent,rgba(255,215,0,0.35),transparent)' }} />
        </div>
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p style={{
            fontFamily: "'Cinzel',serif", fontSize: 11, fontWeight: 700,
            letterSpacing: '0.4em', textTransform: 'uppercase',
            color: 'rgba(255,215,0,0.5)', textAlign: 'center', marginBottom: 0, width: '100%'
        }}>
            {children}
        </p>
    );
}

interface GlassCardProps {
    children: React.ReactNode;
    gold?: boolean;
    style?: React.CSSProperties;
}
function GlassCard({ children, gold, style }: GlassCardProps) {
    return (
        <div style={{
            background: gold
                ? 'linear-gradient(135deg,rgba(255,200,50,0.06) 0%,rgba(255,255,255,0.03) 100%)'
                : 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${gold ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: 20,
            padding: 'clamp(20px,5vw,32px) clamp(16px,5vw,28px)',
            boxShadow: gold
                ? '0 2px 0 rgba(255,200,0,0.15),0 8px 0 rgba(200,150,0,0.08),0 20px 60px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,215,0,0.12)'
                : '0 8px 0 rgba(255,255,255,0.02),0 20px 60px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.06)',
            width: '100%',
            boxSizing: 'border-box',
            ...style,
        }}>
            {children}
        </div>
    );
}

// ── 3D HAPPY BIRTHDAY HEADING ─────────────────────────────────────────────────
function HappyBirthday3D() {
    return (
        <div style={{ perspective: 800, display: 'flex', justifyContent: 'center', width: '100%' }}>
            <h1 style={{
                fontFamily: "'Cinzel',serif",
                fontSize: 'clamp(36px,10vw,88px)',
                fontWeight: 900,
                background: 'linear-gradient(135deg,#FFD700 0%,#FFF5CC 25%,#FF8C00 50%,#FFD700 75%,#FFF9C4 100%)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.1,
                display: 'inline-block',
                transformStyle: 'preserve-3d',
                animation: 'hb3d 4s ease-in-out infinite, shimmer 3s ease-in-out infinite, bounceIn 1.2s cubic-bezier(.2,.8,.2,1) both',
                filter: 'drop-shadow(0 4px 24px rgba(255,200,0,0.55))',
                letterSpacing: '0.04em',
                textAlign: 'center',
            }}>
                Happy<br />Birthday!
            </h1>
        </div>
    );
}

// ── CENTERED SECTION WRAPPER ──────────────────────────────────────────────────
function Section({
    children, maxWidth = 600, delay = '0s', textCenter = false,
}: {
    children: React.ReactNode;
    maxWidth?: number;
    delay?: string;
    textCenter?: boolean;
}) {
    return (
        <section style={{
            width: '100%',
            maxWidth,
            padding: 'clamp(28px,6vw,48px) clamp(16px,4vw,24px)',
            animation: `fadeUp 1.4s ${delay} cubic-bezier(.2,.8,.2,1) both`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            boxSizing: 'border-box',
            textAlign: textCenter ? 'center' : undefined,
        }}>
            {children}
        </section>
    );
}

// ══════════════════════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function BirthdayPage3D() {
    const [started, setStarted] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const trailRef = useRef<TrailParticle[]>([]);
    const orbsRef = useRef<AmbientOrb[]>([]);
    const frameRef = useRef<number>(0);
    const TRAIL_EMOJIS = ['✨', '💖', '💫', '🌟', '🌸', '🔥', '💎', '⭐'];

    const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        const cx = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const cy = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        if (!started) return;
        trailRef.current.push({
            x: cx, y: cy, age: 0, life: rand(35, 55),
            size: rand(16, 28),
            emoji: TRAIL_EMOJIS[Math.floor(rand(0, TRAIL_EMOJIS.length))],
            vx: rand(-1.5, 1.5), vy: rand(-2, -0.5),
        });
    }, [started]);

    useEffect(() => {
        if (!started) return;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        let W = canvas.width = window.innerWidth;
        let H = canvas.height = window.innerHeight;
        const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
        window.addEventListener('resize', onResize);

        orbsRef.current = Array.from({ length: 60 }, () => ({
            x: rand(0, W), y: rand(0, H), r: rand(1, 3.5),
            vx: rand(-0.4, 0.4), vy: rand(-0.8, -0.2),
            hue: rand(30, 60), opacity: rand(0.2, 0.7),
        }));

        const render = () => {
            ctx.clearRect(0, 0, W, H);
            orbsRef.current.forEach(o => {
                o.x += o.vx; o.y += o.vy;
                if (o.y < 0) { o.y = H; o.x = rand(0, W); }
                if (o.x < 0 || o.x > W) o.vx *= -1;
                ctx.beginPath();
                ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${o.hue},100%,65%,${o.opacity * 0.6})`;
                ctx.shadowBlur = 12;
                ctx.shadowColor = `hsl(${o.hue},100%,60%)`;
                ctx.fill();
                ctx.shadowBlur = 0;
            });
            for (let i = trailRef.current.length - 1; i >= 0; i--) {
                const p = trailRef.current[i];
                p.age++; p.x += p.vx + Math.sin(p.age * 0.15) * 1.2; p.y += p.vy;
                const prog = p.age / p.life;
                ctx.save();
                ctx.globalAlpha = Math.max(0, 1 - prog);
                ctx.font = `${p.size * (1 - prog * 0.4)}px Arial`;
                ctx.fillText(p.emoji, p.x, p.y);
                ctx.restore();
                if (p.age >= p.life) trailRef.current.splice(i, 1);
            }
            frameRef.current = requestAnimationFrame(render);
        };
        render();
        return () => { cancelAnimationFrame(frameRef.current); window.removeEventListener('resize', onResize); };
    }, [started]);

    // ── WELCOME SCREEN ───────────────────────────────────────────────────────────
    if (!started) {
        return (
            <>
                <style>{GLOBAL_CSS}</style>
                <div style={{
                    minHeight: '100vh', width: '100%',
                    background: 'radial-gradient(ellipse at 50% 60%, #1a0a00 0%, #000 100%)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: '20px 16px', boxSizing: 'border-box', textAlign: 'center',
                }}>
                    <p style={{
                        fontFamily: "'Cinzel',serif",
                        fontSize: 'clamp(10px,2vw,14px)', letterSpacing: '0.5em',
                        color: 'rgba(255,215,0,0.4)', textTransform: 'uppercase', marginBottom: 24,
                    }}>
                        A Gift of Love
                    </p>
                    <h1 style={{
                        fontFamily: "'Cinzel',serif", fontSize: 'clamp(28px,8vw,60px)',
                        background: 'linear-gradient(135deg,#FFD700,#FF8C00,#FFD700)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text', textAlign: 'center', marginBottom: 40, lineHeight: 1.2,
                    }}>
                        Uma Maheshwari
                    </h1>
                    <button
                        onClick={() => setStarted(true)}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 60px rgba(255,215,0,0.4)';
                            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,215,0,0.06)';
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(255,215,0,0.1)';
                            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                        }}
                        style={{
                            padding: 'clamp(14px,3vw,18px) clamp(28px,6vw,48px)',
                            background: 'transparent',
                            border: '1.5px solid rgba(255,215,0,0.5)',
                            borderRadius: 100, cursor: 'pointer',
                            fontFamily: "'Cinzel',serif",
                            fontSize: 'clamp(11px,3vw,17px)',
                            letterSpacing: '0.4em', textTransform: 'uppercase',
                            color: 'rgba(255,215,0,0.9)',
                            transition: 'all 0.4s',
                            boxShadow: '0 0 30px rgba(255,215,0,0.1)',
                        }}
                    >
                        Open Your Gift ✨
                    </button>
                    <div style={{ marginTop: 40, fontSize: 28, animation: 'hb 1.2s ease-in-out infinite', filter: 'drop-shadow(0 0 12px rgba(255,100,150,0.8))' }}>💖</div>
                </div>
            </>
        );
    }

    // ── MAIN PAGE ────────────────────────────────────────────────────────────────
    return (
        <>
            <style>{GLOBAL_CSS}</style>

            <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

            {/* Root wrapper: full width, flex column, items centered → everything centers */}
            <div
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                style={{
                    minHeight: '100vh',
                    width: '100%',
                    position: 'relative',
                    zIndex: 1,
                    background: 'radial-gradient(ellipse at 30% 20%, #180800 0%, #000 50%, #000510 100%)',
                    cursor: 'default',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                {/* ── HERO ──────────────────────────────────────────────────────────── */}
                <div style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: 'clamp(40px,8vw,64px) clamp(16px,5vw,20px) clamp(24px,5vw,40px)',
                    boxSizing: 'border-box',
                    animation: 'fadeDown 1.2s cubic-bezier(.2,.8,.2,1) forwards',
                }}>
                    <p style={{
                        fontFamily: "'Cinzel',serif", fontSize: 'clamp(9px,2vw,13px)',
                        letterSpacing: '0.6em', color: 'rgba(255,215,0,0.5)',
                        textTransform: 'uppercase', marginBottom: 16,
                    }}>
                        A Birthday Celebration For
                    </p>

                    <HappyBirthday3D />

                    <div style={{ marginTop: 16, marginBottom: 10 }}>
                        <span style={{
                            fontFamily: "'Cinzel',serif",
                            fontSize: 'clamp(20px,5vw,46px)', fontWeight: 900,
                            background: 'linear-gradient(135deg,#FFD700,#FFF5CC,#FF8C00,#FFD700)',
                            backgroundSize: '300% 300%',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            animation: 'shimmer 4s ease-in-out infinite',
                            display: 'inline-block', letterSpacing: '0.08em',
                        }}>
                            Uma Maheshwari
                        </span>
                    </div>

                    <p style={{
                        fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic',
                        fontSize: 'clamp(14px,3vw,22px)', color: 'rgba(255,150,180,0.7)',
                        letterSpacing: 3, marginBottom: 24, marginTop: 8,
                    }}>
                        ✦ April 13, 2026 ✦
                    </p>

                    <div style={{
                        display: 'flex', gap: 'clamp(8px,2vw,14px)', justifyContent: 'center',
                        fontSize: 'clamp(20px,5vw,28px)', filter: 'drop-shadow(0 0 10px rgba(255,150,0,0.6))',
                    }}>
                        {['👑', '💖', '🦋', '✨', '🌹', '💎', '🔥'].map((e, i) => (
                            <span key={i} style={{ animation: `hb ${1 + i * 0.15}s ease-in-out infinite`, animationDelay: `${i * 0.12}s` }}>{e}</span>
                        ))}
                    </div>
                </div>

                <GoldDivider />

                {/* ── 3D CUBE ───────────────────────────────────────────────────────── */}
                <Section maxWidth={700} delay="0.3s">
                    <SectionLabel>📸 Moments of Uma</SectionLabel>
                    <PhotoCube />
                    <GlassCard gold>
                        <p style={{
                            fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic',
                            fontSize: 'clamp(15px,4vw,24px)', color: 'rgba(255,240,200,0.9)',
                            lineHeight: 1.9, textAlign: 'center',
                        }}>
                            "To the girl who makes my reality better than my dreams.<br />
                            Every angle of you is <span style={{ color: '#FFD700' }}>perfect.</span><br />
                            Happy Birthday, my beautiful Uma. ❤️"
                        </p>
                    </GlassCard>
                </Section>

                <GoldDivider />

                {/* ── CALENDAR ──────────────────────────────────────────────────────── */}
                <Section maxWidth={480} delay="0.5s">
                    <SectionLabel>📅 Your Special Day</SectionLabel>
                    <GlassCard>
                        <Calendar />
                    </GlassCard>
                </Section>

                <GoldDivider />

                {/* ── CAKE ──────────────────────────────────────────────────────────── */}
                <Section maxWidth={600} delay="0.7s" textCenter>
                    <SectionLabel>🕯️ Make a Wish</SectionLabel>
                    <CSS3DCake />
                    <p style={{
                        fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic',
                        fontSize: 'clamp(15px,3.5vw,22px)', color: 'rgba(255,210,150,0.8)', lineHeight: 1.8,
                    }}>
                        Three flames carrying three wishes —<br />
                        <span style={{ color: '#FFD700' }}>joy, love, and you, forever.</span>
                    </p>
                </Section>

                <GoldDivider />

                {/* ── POEM ──────────────────────────────────────────────────────────── */}
                <Section maxWidth={600} delay="0.9s">
                    <SectionLabel>💌 From My Heart</SectionLabel>
                    <GlassCard gold>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 24 }}>
                            {['💝', '🌹', '🦋', '🌸', '✨', '🎀', '💫', '🌺', '💎', '👑'].map((e, i) => (
                                <span key={i} style={{
                                    fontSize: 'clamp(20px,4vw,26px)',
                                    animation: `swob ${2.2 + (i % 4) * 0.4}s ease-in-out infinite`,
                                    filter: 'drop-shadow(0 3px 8px rgba(255,150,0,0.5))',
                                }}>{e}</span>
                            ))}
                        </div>
                        <p style={{
                            fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic',
                            fontSize: 'clamp(15px,4vw,22px)', color: 'rgba(255,240,200,0.88)',
                            lineHeight: 2.1, textAlign: 'center',
                        }}>
                            You are the <span style={{ color: '#FFD700', fontStyle: 'normal', fontWeight: 700 }}>sunrise</span> that colours my mornings,<br />
                            the melody that makes silence beautiful.<br /><br />
                            In a universe of stars, you are the one<br />
                            my eyes always find —{' '}
                            <span style={{ color: '#FF8FAB', fontStyle: 'normal', fontWeight: 700 }}>my brightest light.</span><br /><br />
                            Happy Birthday, Uma. You deserve<br />
                            every joy the world has ever held. 🌍💖
                        </p>
                    </GlassCard>
                </Section>

                <GoldDivider />

                {/* ── WISH TICKER ───────────────────────────────────────────────────── */}
                <Section maxWidth={600} delay="1.1s">
                    <SectionLabel>🌟 Wishes For You</SectionLabel>
                    <GlassCard>
                        <WishTicker />
                    </GlassCard>
                </Section>

                {/* ── FOOTER ────────────────────────────────────────────────────────── */}
                <footer style={{
                    width: '100%', textAlign: 'center',
                    padding: 'clamp(24px,4vw,32px) 20px clamp(40px,6vw,60px)',
                    boxSizing: 'border-box',
                }}>
                    <p style={{
                        fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic',
                        fontSize: 'clamp(16px,3vw,20px)', color: 'rgba(255,215,0,0.5)', marginBottom: 16,
                    }}>
                        Made with all my love, just for you 💌
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {['❤️', '🧡', '💛', '💚', '💙', '💜', '🩷', '🤍'].map((h, i) => (
                            <span key={i} style={{
                                fontSize: 'clamp(22px,4vw,28px)',
                                animation: `hb ${0.9 + i * 0.12}s ease-in-out infinite`,
                                filter: 'drop-shadow(0 0 8px rgba(255,80,130,0.6))',
                            }}>{h}</span>
                        ))}
                    </div>
                </footer>

            </div>
        </>
    );
}

// ── GLOBAL CSS ────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    width: 100%;
    overflow-x: hidden;
    background: #000;
    cursor: default;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #000; }
  ::-webkit-scrollbar-thumb { background: rgba(255,215,0,0.3); border-radius: 4px; }

  @keyframes hb       { 0%,100%{transform:scale(1)}   50%{transform:scale(1.3)} }
  @keyframes swob     { 0%,100%{transform:rotate(-6deg) scale(1)} 50%{transform:rotate(6deg) scale(1.15)} }
  @keyframes rspin    { to{transform:rotate(360deg)} }
  @keyframes ebob     { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-5px) scale(1.2)} }
  @keyframes calPulse {
    0%,100%{box-shadow:0 0 0 3px rgba(255,215,0,.4),0 0 0 6px rgba(255,215,0,.12),0 8px 24px rgba(255,140,0,.6);}
    50%    {box-shadow:0 0 0 5px rgba(255,215,0,.6),0 0 0 10px rgba(255,215,0,.2),0 12px 32px rgba(255,180,0,.8);}
  }
  @keyframes flick    { from{transform:scaleX(1) scaleY(1)} to{transform:scaleX(.82) scaleY(1.12)} }
  @keyframes fadeDown { from{opacity:0;transform:translateY(-28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeUp   { from{opacity:0;transform:translateY(28px)}  to{opacity:1;transform:translateY(0)} }
  @keyframes cspin {
    0%  {transform:perspective(700px) rotateY(-20deg) rotateX(-8deg);}
    50% {transform:perspective(700px) rotateY(20deg)  rotateX(-8deg);}
    100%{transform:perspective(700px) rotateY(-20deg) rotateX(-8deg);}
  }
  @keyframes shimmer {
    0%,100%{background-position:0% 50%}
    50%    {background-position:100% 50%}
  }
  @keyframes hb3d {
    0%,100%{transform:perspective(600px) rotateX(0deg)   rotateY(0deg)   scale(1);}
    25%    {transform:perspective(600px) rotateX(10deg)  rotateY(8deg)   scale(1.05);}
    50%    {transform:perspective(600px) rotateX(-5deg)  rotateY(-10deg) scale(1.08);}
    75%    {transform:perspective(600px) rotateX(8deg)   rotateY(5deg)   scale(1.03);}
  }
  @keyframes bounceIn {
    0%  {opacity:0;transform:perspective(600px) rotateX(-30deg) scale(0.5)}
    70% {transform:perspective(600px) rotateX(5deg) scale(1.08)}
    100%{opacity:1;transform:perspective(600px) rotateX(0deg) scale(1)}
  }

  .cube-container {
    animation: spinCube 20s cubic-bezier(.4,0,.2,1) infinite;
  }
  .cube-container:hover { animation-play-state: paused; }

  @keyframes spinCube {
    0%   {transform:rotateX(-15deg) rotateY(0deg)   rotateZ(0deg);}
    25%  {transform:rotateX(15deg)  rotateY(90deg)  rotateZ(4deg);}
    50%  {transform:rotateX(-15deg) rotateY(180deg) rotateZ(-4deg);}
    75%  {transform:rotateX(15deg)  rotateY(270deg) rotateZ(4deg);}
    100% {transform:rotateX(-15deg) rotateY(360deg) rotateZ(0deg);}
  }
`;