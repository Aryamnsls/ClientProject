import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import SearchOverlay from './SearchOverlay';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navClasses = `navbar ${scrolled ? 'navbar--scrolled' : ''} ${location.pathname === '/' ? 'navbar--home' : ''}`;

  return (
    <>
      <nav className={navClasses}>
        <div className="navbar__inner container">
          <NavLink to="/" className="navbar__brand">
            <img src="/logo.png" alt="Knight Errant logo" className="navbar__logo-image" />
          </NavLink>

          <div className={`navbar__nav ${mobileMenuOpen ? 'navbar__nav--open' : ''}`}>
            <ul className="navbar__list">
              <li>
                <NavLink to="/" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`} end>Home</NavLink>
              </li>
              <li>
                <NavLink to="/services" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>Services</NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>About</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}>Contact</NavLink>
              </li>
            </ul>
            
            <div className="navbar__mobile-actions">
              <button className="navbar__search-pill" onClick={() => { setSearchOpen(true); setMobileMenuOpen(false); }}>
                Search
              </button>
            </div>
          </div>

          <div className="navbar__actions">
            <button className="navbar__search-pill desktop-search" onClick={() => setSearchOpen(true)}>
              Search
            </button>
            <button className="navbar__toggle" onClick={toggleMobileMenu} aria-label="Toggle Menu">
              <span className={`burger-icon ${mobileMenuOpen ? 'burger-icon--open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div className="navbar__overlay" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}