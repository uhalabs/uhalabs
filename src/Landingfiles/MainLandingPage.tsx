import Header from './Header'
import { Typography } from 'antd'

const { Title, Paragraph } = Typography

const services = [
    {
        icon: '⚡',
        title: 'Rapid Prototyping',
        desc: 'From idea to working product in days. We turn visions into tangible, tested solutions at speed.',
    },
    {
        icon: '🔬',
        title: 'Deep Research',
        desc: 'Data-driven insights and rigorous analysis that power confident, strategic decisions.',
    },
    {

        icon: '🛡️',
        title: 'Enterprise Security',
        desc: 'Built-in security posture across every layer — from architecture to deployment.',
    },
    {
        icon: '🌐',
        title: 'Scalable Systems',
        desc: 'Infrastructure designed to grow with you — from launch to global scale.',
    },
]

const stats = [
    { value: '10+', label: 'Years of Innovation' },
    { value: '200+', label: 'Products Shipped' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Global Partners' },
]

export default function MainLandingPage() {
    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)] font-sans overflow-x-hidden transition-colors duration-300">
            <Header />

            <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
        
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/background-video.mp4" type="video/mp4" />
                    </video>
                </div>
                
                {/* Premium Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

                {/* Content - Left Side Middle */}
                <div className="relative z-10 px-12 md:px-24 max-w-5xl">
                    <Title 
                        level={1} 
                        style={{
                            fontSize: 'clamp(4rem, 12vw, 10rem)',
                            fontWeight: 900,
                            lineHeight: 1,
                            margin: 0,
                            marginBottom: '2rem',
                            background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 50%, #22D3EE 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        UHA Labs
                    </Title>
                    
                    <Paragraph 
                        style={{
                            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                            color: '#ffffff',
                            fontWeight: 300,
                            letterSpacing: '0.02em',
                            marginBottom: '1.5rem',
                            lineHeight: 1.4
                        }}
                    >
                        Pioneering Tomorrow's Technology
                    </Paragraph>
                    
                    <Paragraph 
                        style={{
                            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                            color: 'rgba(255, 255, 255, 0.85)',
                            fontWeight: 300,
                            lineHeight: 1.6,
                            maxWidth: '42rem',
                            margin: 0
                        }}
                    >
                        Where innovation meets excellence. Crafting intelligent solutions that transform visions into reality.
                    </Paragraph>
                </div>
            </section>

            {/* ── Stats ────────────────────────────────────────── */}
            <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-secondary)] py-14 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((s) => (
                        <div key={s.label} className="flex flex-col items-center gap-1 text-center">
                            <span className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                                {s.value}
                            </span>
                            <span className="text-xs md:text-sm font-medium text-[var(--color-text-muted)] tracking-wide">
                                {s.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Services ─────────────────────────────────────── */}
            <section id="services" className="py-28 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-400 mb-3">
                        What We Do
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--color-text-heading)] mb-4">
                        Built for the Future
                    </h2>
                    <p className="text-base text-[var(--color-text-secondary)] leading-relaxed max-w-xl mx-auto mb-14">
                        End-to-end capabilities that accelerate your digital transformation and
                        create lasting competitive advantage.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                        {services.map((s) => (
                            <div
                                key={s.title}
                                className="group p-7 rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-card-border)] hover:border-[var(--color-card-border-hover)] hover:bg-[var(--color-card-bg-hover)] hover:-translate-y-1 transition-all duration-300 cursor-default"
                            >
                                <div className="text-3xl mb-4">{s.icon}</div>
                                <h3 className="text-lg font-bold text-[var(--color-text-heading)] mb-2 tracking-tight">{s.title}</h3>
                                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── About ────────────────────────────────────────── */}
            <section
                id="about"
                className="py-28 px-6"
                style={{ background: `linear-gradient(180deg, transparent, var(--color-about-gradient-mid), transparent)` }}
            >
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Visual box */}
                    <div className="flex justify-center">
                        <div className="relative w-72 h-72 rounded-3xl border border-[var(--color-about-box-border)] bg-[var(--color-about-box-bg)] flex flex-col items-center justify-center gap-5 overflow-hidden">
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{ background: `radial-gradient(circle, var(--color-about-glow), transparent 65%)`, animation: 'pulse 8s ease-in-out infinite alternate' }}
                            />
                            <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                            <span className="text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 bg-clip-text text-transparent relative z-10">
                                UHA Labs
                            </span>
                            <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                        </div>
                    </div>

                    {/* Copy */}
                    <div>
                        <p className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-400 mb-4">
                            Our Mission
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--color-text-heading)] leading-tight mb-6">
                            Precision.<br />Innovation.<br />Impact.
                        </h2>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                            UHA-Labs was founded on a single belief — that technology should be a force multiplier
                            for human ambition. We partner with organisations to design, build, and scale digital
                            products that matter.
                        </p>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-8">
                            From nimble start-ups to Fortune-500 enterprises, we bring the same disciplined
                            craftsmanship and relentless curiosity to every engagement.
                        </p>
                        <a
                            href="#contact"
                            className="inline-flex px-7 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_4px_24px_rgba(99,102,241,0.35)] hover:-translate-y-0.5 transition-all duration-200 no-underline"
                        >
                            Work With Us
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Contact ──────────────────────────────────────── */}
            <section id="contact" className="py-28 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <p className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-400 mb-3">
                        Get In Touch
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--color-text-heading)] mb-4">
                        Ready to Build Something Great?
                    </h2>
                    <p className="text-base text-[var(--color-text-secondary)] leading-relaxed mb-12">
                        Tell us about your project. We'll get back within 24 hours.
                    </p>

                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex flex-col gap-4 text-left"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-[var(--color-input-text)] placeholder-[var(--color-placeholder)] text-sm outline-none focus:border-violet-500/50 focus:bg-[var(--color-card-bg-hover)] transition-all duration-200"
                            />
                            <input
                                type="email"
                                placeholder="Work Email"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-[var(--color-input-text)] placeholder-[var(--color-placeholder)] text-sm outline-none focus:border-violet-500/50 focus:bg-[var(--color-card-bg-hover)] transition-all duration-200"
                            />
                        </div>
                        <textarea
                            placeholder="Describe your project…"
                            rows={5}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-[var(--color-input-bg)] border border-[var(--color-input-border)] text-[var(--color-input-text)] placeholder-[var(--color-placeholder)] text-sm outline-none focus:border-violet-500/50 focus:bg-[var(--color-card-bg-hover)] transition-all duration-200 resize-none"
                        />
                        <div className="flex justify-center mt-2">
                            <button
                                type="submit"
                                className="px-10 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_4px_24px_rgba(99,102,241,0.4)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.55)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer border-0"
                            >
                                Send Message →
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* ── Footer ───────────────────────────────────────── */}
            <footer className="border-t border-[var(--color-border)] py-7 px-6">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-base font-black tracking-tight bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                        UHA-Labs
                    </span>
                    <span className="text-xs text-[var(--color-footer-text)]">
                        © {new Date().getFullYear()} UHA-Labs. All rights reserved.
                    </span>
                </div>
            </footer>
        </div>
    )
}
