import { Link } from 'react-router-dom'
import { Star, Users, Award, Briefcase, Zap, ArrowRight, Quote } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import './Services.css'

function RevealSection({ className = '', children }) {
  const ref = useReveal(0.1)
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const services = [
  {
    icon: <Users size={28} />,
    title: 'Tailored Services',
    desc: 'Personalized recruitment solutions for your hiring needs.',
  },
  {
    icon: <Award size={28} />,
    title: 'Industry Expertise',
    desc: 'Specializing in IT, healthcare, finance, and more sectors.',
  },
  {
    icon: <Briefcase size={28} />,
    title: 'Quality Placements',
    desc: 'Ensuring the right talent for the right job.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Fast Solutions',
    desc: 'Streamlined hiring process for quick and reliable results.',
  },
]

export default function Services() {
  return (
    <div className="services-page">
      {/* Hero */}
      <section className="page-hero" id="services-hero">
        <div className="page-hero__bg">
          <div className="page-hero__shape page-hero__shape--1"></div>
          <div className="page-hero__shape page-hero__shape--2"></div>
        </div>
        <div className="container page-hero__inner">
          <div className="section-label">Our Services</div>
          <h1>Recruitment Solutions</h1>
          <p className="page-hero__subtitle">
            Connecting job seekers with top employers across various industries.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" id="services-grid">
        <div className="container">
          <div className="services-grid">
            {services.map((service, i) => (
              <RevealSection key={i}>
                <div className="services-card">
                  <div className="services-card__icon">{service.icon}</div>
                  <div className="services-card__content">
                    <h4>{service.title}</h4>
                    <p>{service.desc}</p>
                  </div>
                  <div className="services-card__arrow">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section services-testimonial" id="testimonial-section">
        <div className="container">
          <RevealSection>
            <div className="testimonial-card">
              <Quote size={40} className="testimonial-card__quote" />
              <p className="testimonial-card__text">
                Placynt made my job search effortless. Their personalized approach and
                expertise truly connected me with an amazing opportunity. Highly recommend
                their services!
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">SL</div>
                <div>
                  <strong>Sarah Lee</strong>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section services-gallery" id="gallery-section">
        <div className="container">
          <RevealSection>
            <div className="section-header">
              <div className="section-label">Portfolio</div>
              <h2>Gallery</h2>
              <p>Showcasing successful placements and satisfied clients across industries.</p>
            </div>
          </RevealSection>
          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <RevealSection key={item}>
                <div className="gallery-item">
                  <div className="gallery-item__inner">
                    <Briefcase size={32} />
                    <span>Success Story #{item}</span>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
