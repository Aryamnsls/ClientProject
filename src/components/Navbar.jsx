import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Menu, X } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location])

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" id="nav-logo">
          <div className="navbar__logo-icon">P</div>
          <span className="navbar__logo-text">Placynt</span>
        </Link>

        <nav className={`navbar__nav ${mobileOpen ? 'navbar__nav--open' : ''}`} id="nav-menu">
          <ul className="navbar__list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                  id={`nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <button
            className="navbar__search-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            id="nav-search-btn"
          >
            <Search size={20} />
          </button>
          <button
            className="navbar__toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="nav-toggle-btn"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="navbar__search-bar">
          <div className="container">
            <input
              type="text"
              placeholder="Search..."
              className="navbar__search-input"
              autoFocus
              id="nav-search-input"
            />
          </div>
        </div>
      )}

      {mobileOpen && <div className="navbar__overlay" onClick={() => setMobileOpen(false)} />}
    </header>
  )
}
