import { useState } from 'react'
import { MapPin, Clock } from 'lucide-react'
import useReveal from '../hooks/useReveal.js'
import './Contact.css'

function RevealSection({ className = '', children }) {
  const ref = useReveal(0.1)
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
        setFormData({ name: '', email: '', message: '' })
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('An error occurred. Please make sure the backend server is running.')
    }
  }

  return (
    <div className="contact-page">

      {/* ── Top: Title ── */}
      <section className="contact-title-section" id="contact-hero">
        <div className="container contact-title-inner">
          <div className="section-label">Get in Touch</div>
          <h1>Get in Touch with Knight Errant</h1>
          <p className="contact-title__sub">
            Connect with us for personalized recruitment solutions and opportunities.
          </p>
        </div>
      </section>

      {/* ── Form + Person photo ── */}
      <section className="contact-form-section" id="contact-form-section">
        <div className="container">
          <RevealSection>
            <div className="contact-top-grid">
              {/* Left: form card with blue bg */}
              <div className="contact-form-card">
                {submitted ? (
                  <div className="contact-success">
                    <div className="contact-success__icon">&#10003;</div>
                    <h4>Message Sent!</h4>
                    <p>We will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form" id="contact-form">
                    <div className="contact-form__group">
                      <input
                        type="text"
                        id="contact-name"
                        placeholder="Enter your first name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                      <label htmlFor="contact-name">Your First Name</label>
                    </div>
                    <div className="contact-form__group">
                      <input
                        type="email"
                        id="contact-email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                      <label htmlFor="contact-email">Your Email Address *</label>
                    </div>
                    <div className="contact-form__group">
                      <textarea
                        id="contact-message"
                        rows="5"
                        placeholder="Type your message here"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                      <label htmlFor="contact-message">Your Message *</label>
                    </div>
                    <button
                      type="submit"
                      className="contact-form__btn"
                      id="contact-submit-btn"
                    >
                      Submit Your Inquiry
                    </button>
                  </form>
                )}
              </div>

              {/* Right: person photo */}
              <div className="contact-person-photo">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85"
                  alt="Knight Errant Representative"
                  className="contact-person-photo__img"
                  loading="lazy"
                />
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Contact Us + Map ── */}
      <section className="section contact-info-section" id="contact-info-section">
        <div className="container">
          <RevealSection>
            <div className="contact-bottom-grid">
              {/* Left: contact info */}
              <div className="contact-info-block">
                <h2>Contact Us</h2>
                <p>
                  Get in touch with Knight Errant where recruitment solutions are tailored to
                  your needs. We are here to serve both employers and job seekers.
                </p>

                <div className="contact-info-detail">
                  <div className="contact-info-detail__label">
                    <MapPin size={15} />
                    Location
                  </div>
                  <div className="contact-info-detail__value">Delhi NCR, Pune, Kolkata</div>
                </div>

                <div className="contact-info-detail">
                  <div className="contact-info-detail__label">
                    <Clock size={15} />
                    Hours
                  </div>
                  <div className="contact-info-detail__value">10 AM – 7 PM</div>
                </div>
              </div>

              {/* Right: Google Map */}
              <div className="contact-map-wrap">
                <iframe
                  title="Knight Errant Location Map"
                  src="https://maps.google.com/maps?q=India&hl=en&z=5&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '12px' }}
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
