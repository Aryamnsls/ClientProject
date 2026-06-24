import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <div className="footer__logo-icon">P</div>
              <span className="footer__logo-text">Connect</span>
            </Link>
            <p className="footer__tagline">
              Connecting talent with top employers in industries.
            </p>
          </div>

          <div className="footer__links-group">
            <div className="footer__col">
              <h5 className="footer__col-title">Recruitment</h5>
              <ul>
                <li><Link to="/services">Our Services</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer__col">
              <h5 className="footer__col-title">Solutions</h5>
              <ul>
                <li><Link to="/services">Talent Acquisition</Link></li>
                <li><Link to="/services">Industry Experts</Link></li>
                <li><Link to="/services">End-to-End Hiring</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer__contact">
            <div className="footer__contact-item">
              <Phone size={16} />
              <span>7004404527</span>
            </div>
            <div className="footer__contact-item">
              <Mail size={16} />
              <span>info@placynt.com</span>
            </div>
            <div className="footer__contact-item">
              <MapPin size={16} />
              <span>Delhi NCR, Pune, Kolkata</span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; 2025. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
