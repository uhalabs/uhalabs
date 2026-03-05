
import { useEffect, useState } from 'react'
import './Header.css'

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
        const handleScroll = () => {
            setScrolled(window.scrollY > 60)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
            <div className="header__inner">
                {/* Logo */}
                <a href="#home" className="header__logo">
                    <span className="header__logo-mark">UHA</span>
                    <span className="header__logo-name">Labs</span>
                </a>

                <nav className="header__nav">
                    {navLinks.map((link) => (
                        <a key={link.label} href={link.href} className="header__nav-link">
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CTA */}
                <a href="#contact" className="header__cta">
                    Get Started
                </a>

                {/* Hamburger */}
                <button
                    className={`header__burger ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile Nav */}
            <div className={`header__mobile-nav ${menuOpen ? 'header__mobile-nav--open' : ''}`}>
                {navLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="header__mobile-link"
                        onClick={() => setMenuOpen(false)}
                    >
                        {link.label}
                    </a>
                ))}
                <a href="#contact" className="header__cta header__cta--mobile" onClick={() => setMenuOpen(false)}>
                    Get Started
                </a>
            </div>
        </header>
    )
}
