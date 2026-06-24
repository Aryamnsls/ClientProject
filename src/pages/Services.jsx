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
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    title: 'Tailored Services',
    desc: 'Personalized recruitment solutions for your hiring needs.',
  },
  {
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    title: 'Industry Expertise',
    desc: 'Specializing in IT, healthcare, finance, and more sectors.',
  },
  {
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80',
    title: 'Quality Placements',
    desc: 'Ensuring the right talent for the right job.',
  },
  {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    title: 'Fast Solutions',
    desc: 'Streamlined hiring process for quick and reliable results.',
  },
]

const galleryImages = [
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80',
  'https://images.unsplash.com/photo-1524749292158-7540c2494485?w=500&q=80',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&q=80',
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80',
  'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80',
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
                <div className="testimonial-card__avatar">SL</div>
                <div>
                  <strong>Sarah Lee</strong>
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
