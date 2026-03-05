
import Header from './Header'
import './MainLandingPage.css'

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
        <div className="landing">
            <Header />

            {/* ── Hero ── */}
            <section id="home" className="hero">
                <div className="hero__bg-grid" />
                <div className="hero__orb hero__orb--1" />
                <div className="hero__orb hero__orb--2" />
                <div className="hero__content">
                    <p className="hero__eyebrow">Next-Generation Technology Labs</p>
                    <h1 className="hero__headline">
                        Welcome to <span className="hero__brand">UHA-Labs</span>
                    </h1>
                    <p className="hero__sub">
                        We build intelligent, scalable, and beautiful digital products that
                        redefine what's possible for enterprises and startups alike.
                    </p>
                    <div className="hero__actions">
                        <a href="#services" className="btn btn--primary">
                            Explore Services
                        </a>
                        <a href="#about" className="btn btn--ghost">
                            Learn More
                        </a>
                    </div>
                </div>
                <div className="hero__scroll-hint">
                    <span />
                </div>
            </section>

            {/* ── Stats ── */}
            <section className="stats">
                <div className="container stats__grid">
                    {stats.map((s) => (
                        <div key={s.label} className="stat-card">
                            <span className="stat-card__value">{s.value}</span>
                            <span className="stat-card__label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Services ── */}
            <section id="services" className="services">
                <div className="container">
                    <p className="section__eyebrow">What We Do</p>
                    <h2 className="section__title">Built for the Future</h2>
                    <p className="section__sub">
                        End-to-end capabilities that accelerate your digital transformation
                        and create lasting competitive advantage.
                    </p>
                    <div className="services__grid">
                        {services.map((s) => (
                            <div key={s.title} className="service-card">
                                <div className="service-card__icon">{s.icon}</div>
                                <h3 className="service-card__title">{s.title}</h3>
                                <p className="service-card__desc">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── About ── */}
            <section id="about" className="about">
                <div className="container about__inner">
                    <div className="about__visual">
                        <div className="about__visual-box">
                            <div className="about__visual-line" />
                            <span className="about__visual-label">UhaLabs</span>
                        </div>
                    </div>
                    <div className="about__copy">
                        <p className="section__eyebrow">Our Mission</p>
                        <h2 className="section__title">Precision. Innovation.<br />Impact.</h2>
                        <p className="about__text">
                            UhaLabs was founded on a single belief — that technology should be a
                            force multiplier for human ambition. We partner with organisations
                            to design, build, and scale digital products that matter.
                        </p>
                        <p className="about__text">
                            From nimble start-ups to Fortune-500 enterprises, we bring the same
                            disciplined craftsmanship and relentless curiosity to every engagement.
                        </p>
                        <a href="#contact" className="btn btn--primary">
                            Work With Us
                        </a>
                    </div>
                </div>
            </section>

            {/* ── Contact ── */}
            <section id="contact" className="contact">
                <div className="container contact__inner">
                    <p className="section__eyebrow">Get In Touch</p>
                    <h2 className="section__title">Ready to Build Something Great?</h2>
                    <p className="section__sub">
                        Tell us about your project. We'll get back within 24 hours.
                    </p>
                    <form className="contact__form" onSubmit={(e) => e.preventDefault()}>
                        <div className="contact__row">
                            <input type="text" placeholder="Your Name" className="contact__input" required />
                            <input type="email" placeholder="Work Email" className="contact__input" required />
                        </div>
                        <textarea placeholder="Describe your project…" className="contact__textarea" rows={5} required />
                        <button type="submit" className="btn btn--primary contact__submit">
                            Send Message →
                        </button>
                    </form>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="footer">
                <div className="container footer__inner">
                    <span className="footer__brand">UhaLabs</span>
                    <span className="footer__copy">© {new Date().getFullYear()} UhaLabs. All rights reserved.</span>
                </div>
            </footer>
        </div>
    )
}
