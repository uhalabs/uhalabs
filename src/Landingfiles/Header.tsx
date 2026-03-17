import { useEffect, useState } from 'react'

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
]

export default function Header() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${scrolled
                    ? 'bg-[var(--color-header-bg)] backdrop-blur-xl shadow-[0_1px_0_var(--color-header-shadow)]'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center gap-6">

                {/* ── Logo ── */}
                <a href="#home" className="flex items-baseline gap-0.5 flex-shrink-0 no-underline group">
                    <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                        UHA
                    </span>
                    <span className="text-lg font-bold text-[var(--color-text-primary)] tracking-tight">Labs</span>
                </a>

                {/* ── Desktop Nav ── */}
                <nav className="hidden md:flex items-center gap-1 ml-auto">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)] hover:bg-[var(--color-nav-hover-bg)] rounded-lg transition-all duration-200 no-underline tracking-wide"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* ── CTA ── */}
                <a
                    href="#contact"
                    className="hidden md:inline-flex ml-2 px-5 py-2 text-sm font-semibold text-white rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-[0_4px_20px_rgba(139,92,246,0.4)] hover:shadow-[0_6px_28px_rgba(139,92,246,0.55)] hover:-translate-y-0.5 transition-all duration-200 no-underline"
                >
                    Get Started
                </a>

                {/* ── Hamburger ── */}
                <button
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Toggle menu"
                    className="md:hidden ml-auto flex flex-col justify-center gap-[5px] w-9 h-9 p-1 bg-transparent border-0 cursor-pointer"
                >
                    <span className={`block h-0.5 rounded-full bg-[var(--color-hamburger)] transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
                    <span className={`block h-0.5 rounded-full bg-[var(--color-hamburger)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block h-0.5 rounded-full bg-[var(--color-hamburger)] transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
                </button>
            </div>

            {/* ── Mobile Nav ── */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } bg-[var(--color-mobile-menu-bg)] backdrop-blur-xl border-t border-[var(--color-border)]`}
            >
                <div className="flex flex-col gap-1 px-6 py-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMenuOpen(false)}
                            className="px-3 py-3 text-base font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-heading)] hover:bg-[var(--color-nav-hover-bg)] rounded-lg transition-all duration-200 no-underline"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={() => setMenuOpen(false)}
                        className="mt-3 px-5 py-2.5 text-sm font-semibold text-white text-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_4px_20px_rgba(139,92,246,0.4)] no-underline transition-all duration-200"
                    >
                        Get Started
                    </a>
                </div>
            </div>
        </header>
    )
}
