import { Link } from 'react-router-dom'
import { Star, ArrowRight, Quote } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import './Services.css'

function RevealSection({ className = '', children }) {
  const ref = useReveal(0.1)
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>
}

const services = [
  {
    image: 'https://images.unsplash.com/photo-1515414797016-948204e0696a?w=600&q=80',
    title: 'Tailored Services',
    desc: 'Personalized recruitment solutions for your hiring needs.',
  },
  {
    image: 'https://images.unsplash.com/photo-1683459269730-f8eb2b5c3b58?w=600&q=80',
    title: 'Industry Expertise',
    desc: 'Specializing in IT, healthcare, finance, and more sectors.',
  },
  {
    image: 'https://images.unsplash.com/photo-1588601515934-48cd862f9955?w=600&q=80',
    title: 'Quality Placements',
    desc: 'Ensuring the right talent for the right job.',
  },
  {
    image: 'https://images.unsplash.com/photo-1639472676608-8bd51152c61a?w=600&q=80',
    title: 'Fast Solutions',
    desc: 'Streamlined hiring process for quick and reliable results.',
  },
]

const galleryImages = [
  'https://images.unsplash.com/photo-1641236709017-421731ff4caf?w=600&q=80',
  'https://images.unsplash.com/photo-1603985585179-3d71c35a537c?w=600&q=80',
  'https://images.unsplash.com/photo-1673681142950-a37f8421eb9c?w=600&q=80',
  'https://images.unsplash.com/photo-1579388735156-3e71549fad0b?w=600&q=80',
  'https://images.unsplash.com/photo-1569083676317-dafd0fc965f7?w=600&q=80',
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

      {/* Services Grid with Images */}
      <section className="section" id="services-grid">
        <div className="container">
          <div className="services-grid">
            {services.map((service, i) => (
              <RevealSection key={i}>
                <div className="services-card services-card--image">
                  <div className="services-card__img-wrap">
                    <img src={service.image} alt={service.title} className="services-card__img" loading="lazy" />
                  </div>
                  <div className="services-card__body">
                    <div className="services-card__content">
                      <h4>{service.title}</h4>
                      <p>{service.desc}</p>
                    </div>
                    <div className="services-card__arrow">
                      <ArrowRight size={18} />
                    </div>
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
              <div className="stars testimonial-card__stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial-card__text">
                Knight Errant made my job search effortless. Their personalized approach and
                expertise truly connected me with an amazing opportunity. Highly recommend
                their services!
              </p>
              <div className="testimonial-card__author">
                <img src="https://images.unsplash.com/photo-1696826128233-e6aba37142d8?w=100&q=80" alt="Sarah Lee" className="testimonial-card__avatar" />
                <div className="testimonial-card__author-name">
                  Sarah Lee
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
              <h2>Gallery</h2>
              <p>Showcasing successful placements and satisfied clients across industries.</p>
            </div>
          </RevealSection>
          <div className="gallery-grid">
            {galleryImages.map((src, i) => (
              <RevealSection key={i}>
                <div className="gallery-item">
                  <img src={src} alt={`Gallery ${i + 1}`} className="gallery-item__img" loading="lazy" />
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
