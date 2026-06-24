import { useState } from 'react'
import { MapPin, Clock, Phone, Mail, Send } from 'lucide-react'
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
        headers: {
          'Content-Type': 'application/json',
        },
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
      {/* Hero */}
      <section className="page-hero" id="contact-hero">
        <div className="page-hero__bg">
          <div className="page-hero__shape page-hero__shape--1" />
          <div className="page-hero__shape page-hero__shape--2" />
        </div>
        <div className="container page-hero__inner">
          <div className="section-label">Get in Touch</div>
          <h1>Get in Touch with Placynt</h1>
          <p className="page-hero__subtitle">
            Connect with us for personalized recruitment solutions and opportunities.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section contact-content" id="contact-form-section">
        <div className="container">
          <div className="contact-grid">
            {/* Form */}
            <RevealSection>
              <div className="contact-form-card">
                <h3>Contact Us</h3>
                <p className="contact-form-card__desc">
                  Get in touch with Placynt to explore recruitment solutions
                  tailored to your needs. We are here to assist both employers
                  and job seekers.
                </p>

                {submitted ? (
                  <div className="contact-success">
                    <div className="contact-success__icon">&#10003;</div>
                    <h4>Message Sent!</h4>
                    <p>We will get back to you shortly.</p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="contact-form"
                    id="contact-form"
                  >
                    <div className="contact-form__group">
                      <label htmlFor="contact-name">Full Name</label>
                      <input
                        type="text"
                        id="contact-name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="contact-form__group">
                      <label htmlFor="contact-email">Email</label>
                      <input
                        type="email"
                        id="contact-email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="contact-form__group">
                      <label htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        rows="5"
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg contact-form__btn"
                      id="contact-submit-btn"
                    >
                      Send Message
                      <Send size={18} />
                    </button>
                  </form>
                )}
              </div>
            </RevealSection>

            {/* Info */}
            <RevealSection>
              <div className="contact-info">
                <div className="contact-info-card">
                  <div className="contact-info-card__icon">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h5>Location</h5>
                    <p>Delhi NCR, Pune, Kolkata</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-info-card__icon">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h5>Hours</h5>
                    <p>10 AM - 7 PM</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-info-card__icon">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h5>Phone</h5>
                    <p>7004404527</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-info-card__icon">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h5>Email</h5>
                    <p>info@placynt.com</p>
                  </div>
                </div>
                <div className="contact-map">
                  <div className="contact-map__inner">
                    <MapPin size={32} />
                    <span>Delhi NCR &bull; Pune &bull; Kolkata</span>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>
    </div>
  )
}
