import { useState, useEffect, useRef } from 'react'
import { Star, MapPin, Clock } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import './About.css'

function RevealSection({ className = '', children }) {
  const ref = useReveal(0.1)
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [trigger, setTrigger] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setTrigger(t => t + 1)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (trigger === 0) return
    let start = 0
    const duration = 2000
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.ceil(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [trigger, target])

  return (
    <span 
      ref={ref} 
      className="animated-counter" 
      onClick={() => setTrigger(t => t + 1)}
      style={{ cursor: 'pointer' }}
      title="Click to recount!"
    >
      {count}{suffix}
    </span>
  )
}

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero" id="about-hero">
        <div className="page-hero__bg">
          <div className="page-hero__shape page-hero__shape--1"></div>
          <div className="page-hero__shape page-hero__shape--2"></div>
        </div>
        <div className="container page-hero__inner">
          <div className="section-label">About Knight Errant</div>
          <h1>Connecting Talent with Opportunity</h1>
          <p className="page-hero__subtitle">
            Knight Errant: Your Partner in Recruitment Excellence.
          </p>
        </div>
      </section>

      {/* Stats + Intro */}
      <section className="section about-intro" id="about-intro">
        <div className="container">
          <RevealSection>
            <div className="about-intro__grid">
              <div className="about-intro__left">
                <h2 className="about-intro__title">Connecting Talent with Opportunity</h2>
              </div>
              <div className="about-intro__right">
                <p className="about-intro__tagline">Knight Errant: Your Partner in Recruitment Excellence.</p>
                <div className="about-stats-row">
                  <div className="about-stat-inline">
                    <div className="about-stat-inline__number">
                      <AnimatedCounter target={150} suffix="+" />
                    </div>
                    <div className="about-stat-inline__label">Top Candidates</div>
                  </div>
                  <div className="about-stat-inline">
                    <div className="about-stat-inline__number">
                      <AnimatedCounter target={15} />
                    </div>
                    <div className="about-stat-inline__label">Trusted by Employers</div>
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Office Image */}
          <RevealSection>
            <div className="about-office-img-wrap modern-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85"
                alt="Knight Errant Office"
                className="about-office-img modern-img"
                loading="lazy"
              />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Split Testimonial */}
      <section className="section about-split-testimonial" id="about-testimonial">
        <div className="container">
          <RevealSection>
            <div className="about-split__wrap modern-split">
              {/* Left: building image */}
              <div className="about-split__img-side">
                <img
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=700&q=80"
                  alt="Professional Office Meeting"
                  className="about-split__img modern-img"
                  loading="lazy"
                />
              </div>

              {/* Right: quote */}
              <div className="about-split__quote-side modern-quote-panel">
                <div className="about-split__stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#fbbf24" />
                  ))}
                </div>
                <p className="about-split__quote-text">
                  "Knight Errant connected me with an amazing job opportunity quickly and
                  professionally. Highly recommend their services!"
                </p>
                <div className="about-split__author">
                  <div className="about-split__avatar">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="John Doe"
                    />
                  </div>
                  <div>
                    <strong>John Doe</strong>
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Locations + Google Map */}
      <section className="section about-locations" id="about-locations">
        <div className="container">
          <RevealSection>
            <div className="about-locations__grid modern-locations">
              {/* Left: text info */}
              <div className="about-locations__info">
                <h2>Our Locations</h2>
                <p>
                  Knight Errant operates in multiple regions, connecting job seekers and employers
                  across various industries to streamline the recruitment process effectively.
                </p>
                <div className="about-loc-item">
                  <div className="about-loc-item__label">
                    <MapPin size={16} />
                    Regions
                  </div>
                  <div className="about-loc-item__value">Delhi NCR, Pune, Kolkata</div>
                </div>
                <div className="about-loc-item">
                  <div className="about-loc-item__label">
                    <Clock size={16} />
                    Hours
                  </div>
                  <div className="about-loc-item__value">10 AM – 7 PM</div>
                </div>
              </div>

              {/* Right: Google Map */}
              <div className="about-locations__map modern-map">
                <iframe
                  title="Knight Errant Location"
                  src="https://maps.google.com/maps?q=India&hl=en&z=5&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '16px', filter: 'contrast(1.1)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </RevealSection>
        </div>
      </section>
    </div>
  )
}
