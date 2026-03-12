import Header from './Header'

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
        <div className="min-h-screen bg-[#05050f] text-slate-200 font-sans overflow-x-hidden">
            <Header />

            {/* ── Hero ─────────────────────────────────────────── */}
            <section
                id="home"
                className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 overflow-hidden"
            >
                {/* Grid bg */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)',
                    }}
                />

                {/* Ambient orbs */}
                <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] rounded-full pointer-events-none animate-pulse"
                    style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.25), transparent 70%)', filter: 'blur(80px)' }} />
                <div className="absolute bottom-1/4 right-1/4 w-[360px] h-[360px] rounded-full pointer-events-none animate-pulse"
                    style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2), transparent 70%)', filter: 'blur(80px)', animationDelay: '1s' }} />

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto">
                    <span className="inline-block mb-5 text-xs font-semibold tracking-[0.15em] uppercase text-violet-400">
                        Next-Generation Technology Labs
                    </span>

                    <h1 className="text-6xl md:text-8xl font-black leading-[1.04] tracking-[-0.04em] text-slate-50 mb-6">
                        Welcome to{' '}<br />
                        <span className="bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                            UHA-Labs
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
                        We build intelligent, scalable, and beautiful digital products that redefine
                        what's possible for enterprises and startups alike.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="#services"
                            className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_4px_24px_rgba(99,102,241,0.45)] hover:shadow-[0_8px_32px_rgba(99,102,241,0.6)] hover:-translate-y-0.5 transition-all duration-200 no-underline"
                        >
                            Explore Services
                        </a>
                        <a
                            href="#about"
                            className="px-8 py-3.5 rounded-xl text-sm font-semibold text-slate-300 border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:text-white hover:-translate-y-0.5 transition-all duration-200 no-underline"
                        >
                            Learn More
                        </a>
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
                    <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center pt-1.5">
                        <span className="w-0.5 h-2 bg-white/60 rounded-full animate-bounce" />
                    </div>
                </div>
            </section>

            {/* ── Stats ────────────────────────────────────────── */}
            <section className="border-y border-white/[0.05] bg-white/[0.015] py-14 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((s) => (
                        <div key={s.label} className="flex flex-col items-center gap-1 text-center">
                            <span className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                                {s.value}
                            </span>
                            <span className="text-xs md:text-sm font-medium text-slate-500 tracking-wide">
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
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-50 mb-4">
                        Built for the Future
                    </h2>
                    <p className="text-base text-slate-400 leading-relaxed max-w-xl mx-auto mb-14">
                        End-to-end capabilities that accelerate your digital transformation and
                        create lasting competitive advantage.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
                        {services.map((s) => (
                            <div
                                key={s.title}
                                className="group p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-violet-500/40 hover:bg-violet-500/[0.06] hover:-translate-y-1 transition-all duration-300 cursor-default"
                            >
                                <div className="text-3xl mb-4">{s.icon}</div>
                                <h3 className="text-lg font-bold text-slate-100 mb-2 tracking-tight">{s.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── About ────────────────────────────────────────── */}
            <section
                id="about"
                className="py-28 px-6"
                style={{ background: 'linear-gradient(180deg, transparent, rgba(99,102,241,0.04), transparent)' }}
            >
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Visual box */}
                    <div className="flex justify-center">
                        <div className="relative w-72 h-72 rounded-3xl border border-violet-500/20 bg-violet-500/[0.04] flex flex-col items-center justify-center gap-5 overflow-hidden">
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12), transparent 65%)', animation: 'pulse 8s ease-in-out infinite alternate' }}
                            />
                            <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                            <span className="text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 bg-clip-text text-transparent relative z-10">
                                UHA-Labs
                            </span>
                            <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
                        </div>
                    </div>

                    {/* Copy */}
                    <div>
                        <p className="text-xs font-semibold tracking-[0.14em] uppercase text-violet-400 mb-4">
                            Our Mission
                        </p>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-50 leading-tight mb-6">
                            Precision.<br />Innovation.<br />Impact.
                        </h2>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">
                            UHA-Labs was founded on a single belief — that technology should be a force multiplier
                            for human ambition. We partner with organisations to design, build, and scale digital
                            products that matter.
                        </p>
                        <p className="text-sm text-slate-400 leading-relaxed mb-8">
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
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-50 mb-4">
                        Ready to Build Something Great?
                    </h2>
                    <p className="text-base text-slate-400 leading-relaxed mb-12">
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
                                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-violet-500/50 focus:bg-violet-500/[0.04] transition-all duration-200"
                            />
                            <input
                                type="email"
                                placeholder="Work Email"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-violet-500/50 focus:bg-violet-500/[0.04] transition-all duration-200"
                            />
                        </div>
                        <textarea
                            placeholder="Describe your project…"
                            rows={5}
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-200 placeholder-slate-600 text-sm outline-none focus:border-violet-500/50 focus:bg-violet-500/[0.04] transition-all duration-200 resize-none"
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
            <footer className="border-t border-white/[0.05] py-7 px-6">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-base font-black tracking-tight bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                        UHA-Labs
                    </span>
                    <span className="text-xs text-slate-600">
                        © {new Date().getFullYear()} UHA-Labs. All rights reserved.
                    </span>
                </div>
            </footer>
        </div>
    )
}
