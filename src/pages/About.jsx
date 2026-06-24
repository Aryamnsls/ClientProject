import { Star, TrendingUp, Shield, MapPin, Clock, Quote } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import './About.css'

function RevealSection({ className = '', children }) {
  const ref = useReveal(0.1)
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero" id="about-hero">
        <div className="page-hero__bg">
          <div className="page-hero__shape page-hero__shape--1"></div>
          <div className="page-hero__shape page-hero__shape--2"></div>
        </div>
        <div className="container page-hero__inner">
          <div className="section-label">About Placynt</div>
          <h1>Connecting Talent with Opportunity</h1>
          <p className="page-hero__subtitle">
            Placynt: Your Partner in Recruitment Excellence.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section about-stats" id="about-stats">
        <div className="container">
          <RevealSection>
            <div className="about-stats__grid">
              <div className="about-stat-card about-stat-card--primary">
                <TrendingUp size={24} className="about-stat-card__bg-icon" />
                <div className="about-stat-card__number">150+</div>
                <div className="about-stat-card__label">Trusted by Employers</div>
              </div>
              <div className="about-stat-card about-stat-card--accent">
                <Shield size={24} className="about-stat-card__bg-icon" />
                <div className="about-stat-card__number">15</div>
                <div className="about-stat-card__label">Top Candidates</div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section about-testimonial" id="about-testimonial">
        <div className="container">
          <RevealSection>
            <div className="testimonial-card">
              <Quote size={40} className="testimonial-card__quote" />
              <p className="testimonial-card__text">
                Placynt connected me with an amazing job opportunity quickly and
                professionally. Highly recommend their services!
              </p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">JD</div>
                <div>
                  <strong>John Doe</strong>
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

      {/* Locations */}
      <section className="section about-locations" id="about-locations">
        <div className="container">
          <RevealSection>
            <div className="section-header">
              <div className="section-label">Where We Are</div>
              <h2>Our Locations</h2>
              <p>
                Placynt operates in multiple regions, connecting job seekers and employers
                across various industries to streamline the recruitment process effectively.
              </p>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="locations-grid">
              <div className="location-card">
                <div className="location-card__icon">
                  <MapPin size={24} />
                </div>
                <h4>Regions</h4>
                <p>Delhi NCR, Pune, Kolkata</p>
              </div>
              <div className="location-card">
                <div className="location-card__icon">
                  <Clock size={24} />
                </div>
                <h4>Hours</h4>
                <p>10 AM - 7 PM</p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  )
}
