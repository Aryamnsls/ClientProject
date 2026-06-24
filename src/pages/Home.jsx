import { Link } from 'react-router-dom'
import { Star, Users, Building2, Award, Briefcase, ArrowRight, CheckCircle2, TrendingUp, Shield } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import './Home.css'

function RevealSection({ className = '', children, direction = 'up' }) {
  const ref = useReveal(0.1)
  const cls = direction === 'left' ? 'reveal-left' : direction === 'right' ? 'reveal-right' : 'reveal'
  return <div ref={ref} className={`${cls} ${className}`}>{children}</div>
}

export default function Home() {
  return (
    <div className="home">
      {/* ===== HERO ===== */}
      <section className="hero" id="hero-section">
        <div className="hero__bg-shapes">
          <div className="hero__shape hero__shape--1"></div>
          <div className="hero__shape hero__shape--2"></div>
          <div className="hero__shape hero__shape--3"></div>
        </div>
        <div className="container hero__inner">
          <div className="hero__content animate-fade-in-up">
            <div className="section-label">Trusted Placement Agency</div>
            <h1>Connecting Talent with Top Employers</h1>
            <p className="hero__subtitle">
              Simplifying recruitment for job seekers and employers across various industries.
              Trusted by countless satisfied clients.
            </p>
            <div className="hero__actions">
              <Link to="/contact" className="btn btn-primary btn-lg" id="hero-cta">
                Get Started
                <ArrowRight size={18} />
              </Link>
              <Link to="/services" className="btn btn-outline btn-lg" id="hero-services-btn">
                Our Services
              </Link>
            </div>
            <div className="hero__rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <span className="hero__rating-text">Rated 5/5 by our clients</span>
            </div>
          </div>
          <div className="hero__visual animate-fade-in-right">
            <div className="hero__card-stack">
              <div className="hero__float-card hero__float-card--1 animate-float">
                <Users size={24} />
                <div>
                  <strong>150+</strong>
                  <span>Placements</span>
                </div>
              </div>
              <div className="hero__float-card hero__float-card--2">
                <Building2 size={24} />
                <div>
                  <strong>15+</strong>
                  <span>Employers</span>
                </div>
              </div>
              <div className="hero__float-card hero__float-card--3">
                <Award size={24} />
                <div>
                  <strong>98%</strong>
                  <span>Satisfaction</span>
                </div>
              </div>
              <div className="hero__center-graphic">
                <Briefcase size={60} strokeWidth={1.2} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="section home-about" id="about-section">
        <div className="container">
          <RevealSection>
            <div className="home-about__grid">
              <div className="home-about__content">
                <div className="section-label">About Us</div>
                <h2>Connecting Talent with Opportunity</h2>
                <p className="home-about__desc">
                  Placynt is your trusted partner in recruitment, specializing in connecting
                  job seekers with top employers across various industries, ensuring quality
                  placements and personalized services for all.
                </p>
                <div className="home-about__features">
                  <div className="home-about__feature">
                    <CheckCircle2 size={20} />
                    <span>Personalized matching</span>
                  </div>
                  <div className="home-about__feature">
                    <CheckCircle2 size={20} />
                    <span>Industry expertise</span>
                  </div>
                  <div className="home-about__feature">
                    <CheckCircle2 size={20} />
                    <span>End-to-end support</span>
                  </div>
                  <div className="home-about__feature">
                    <CheckCircle2 size={20} />
                    <span>Fast turnaround</span>
                  </div>
                </div>
              </div>
              <div className="home-about__stats">
                <div className="stat-card stat-card--primary">
                  <div className="stat-card__number">150+</div>
                  <div className="stat-card__label">Quality Placements</div>
                  <TrendingUp size={20} className="stat-card__icon" />
                </div>
                <div className="stat-card stat-card--accent">
                  <div className="stat-card__number">15</div>
                  <div className="stat-card__label">Trusted by Employers</div>
                  <Shield size={20} className="stat-card__icon" />
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ===== SERVICES PREVIEW ===== */}
      <section className="section home-services" id="services-section">
        <div className="container">
          <RevealSection>
            <div className="section-header">
              <div className="section-label">What We Do</div>
              <h2>Personalized Recruitment Solutions</h2>
              <p>
                Connecting job seekers with employers to streamline the hiring process
                effectively and efficiently.
              </p>
            </div>
          </RevealSection>

          <div className="home-services__grid">
            {[
              {
                icon: <Users size={28} />,
                title: 'Comprehensive Talent Acquisition',
                desc: 'Tailored services for finding the right job and the right candidates quickly.',
                delay: 0,
              },
              {
                icon: <Award size={28} />,
                title: 'Industry Expert Recruiters',
                desc: 'Experienced professionals ensure the perfect match for various sectors and roles.',
                delay: 100,
              },
              {
                icon: <Briefcase size={28} />,
                title: 'End-to-End Services',
                desc: 'From job posting to candidate placement, we manage every step seamlessly.',
                delay: 200,
              },
            ].map((service, i) => (
              <RevealSection key={i}>
                <div className="card home-services__card" style={{ transitionDelay: `${service.delay}ms` }}>
                  <div className="card-icon">{service.icon}</div>
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                  <Link to="/services" className="home-services__card-link">
                    Learn more <ArrowRight size={16} />
                  </Link>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="home-cta" id="cta-section">
        <div className="container">
          <RevealSection>
            <div className="home-cta__inner">
              <div className="home-cta__bg-shapes">
                <div className="home-cta__shape home-cta__shape--1"></div>
                <div className="home-cta__shape home-cta__shape--2"></div>
              </div>
              <h2>Ready to Find Your Next Opportunity?</h2>
              <p>Let our expert recruiters connect you with the perfect role or candidate.</p>
              <div className="home-cta__actions">
                <Link to="/contact" className="btn btn-white btn-lg" id="cta-contact-btn">
                  Contact Us
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  )
}
