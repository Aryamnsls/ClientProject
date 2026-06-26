import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchOverlay.css';

// ─── Site content index ────────────────────────────────────────────────────────
const SITE_CONTENT = [
  // Home
  {
    title: 'Home – Knight Errant',
    path: '/',
    category: 'Home',
    keywords: ['home', 'knight errant', 'placement agency', 'top talent', 'trusted', 'hiring', 'jobs'],
    description: 'Your trusted placement agency for top talent. Connecting job seekers with leading employers.',
  },
  {
    title: 'Find Your Dream Job',
    path: '/',
    category: 'Home',
    keywords: ['dream job', 'career', 'job search', 'opportunity', 'employment'],
    description: 'Explore exciting career opportunities with Knight Errant\'s expert recruitment team.',
  },
  {
    title: 'Post a Job',
    path: '/',
    category: 'Home',
    keywords: ['post job', 'hire', 'employer', 'recruit', 'vacancy', 'opening'],
    description: 'Post a job vacancy and find the right candidate quickly and reliably.',
  },
  // Services
  {
    title: 'Tailored Recruitment Services',
    path: '/services',
    category: 'Services',
    keywords: ['tailored', 'services', 'recruitment', 'personalized', 'solutions', 'hiring'],
    description: 'Personalized recruitment solutions customized to your specific hiring needs.',
  },
  {
    title: 'Industry Expertise',
    path: '/services',
    category: 'Services',
    keywords: ['industry', 'expertise', 'IT', 'healthcare', 'finance', 'sectors', 'specialization'],
    description: 'Specializing in IT, healthcare, finance, and many more industry sectors.',
  },
  {
    title: 'Quality Placements',
    path: '/services',
    category: 'Services',
    keywords: ['quality', 'placements', 'right talent', 'right job', 'match', 'fit'],
    description: 'Ensuring the right talent is matched to the right job every time.',
  },
  {
    title: 'Fast Hiring Solutions',
    path: '/services',
    category: 'Services',
    keywords: ['fast', 'quick', 'streamlined', 'process', 'reliable', 'efficient', 'speed'],
    description: 'Streamlined hiring process for quick, efficient, and reliable results.',
  },
  {
    title: 'Services Overview',
    path: '/services',
    category: 'Services',
    keywords: ['services', 'overview', 'what we do', 'our services', 'portfolio'],
    description: 'Explore all of Knight Errant\'s recruitment and staffing services.',
  },
  // About
  {
    title: 'About Knight Errant',
    path: '/about',
    category: 'About',
    keywords: ['about', 'knight errant', 'company', 'who we are', 'story', 'mission'],
    description: 'Learn about Knight Errant — your partner in recruitment excellence.',
  },
  {
    title: 'Connecting Talent with Opportunity',
    path: '/about',
    category: 'About',
    keywords: ['talent', 'opportunity', 'connect', 'bridge', 'job seekers', 'employers'],
    description: 'We connect talent with opportunity across industries and regions.',
  },
  {
    title: 'Our Locations',
    path: '/about',
    category: 'About',
    keywords: ['locations', 'pan india', 'regions', 'offices'],
    description: 'Knight Errant operates PAN India, serving multiple regions.',
  },
  {
    title: 'Working Hours',
    path: '/about',
    category: 'About',
    keywords: ['hours', 'working hours', 'timing', '10 am', '7 pm', 'open', 'schedule'],
    description: 'Office hours: 10 AM – 7 PM across all our locations.',
  },
  {
    title: '150+ Trusted Employers',
    path: '/about',
    category: 'About',
    keywords: ['employers', 'trusted', '150', 'partners', 'companies', 'clients'],
    description: 'Over 150 employers trust Knight Errant for their staffing and recruitment needs.',
  },
  // Contact
  {
    title: 'Contact Us',
    path: '/contact',
    category: 'Contact',
    keywords: ['contact', 'get in touch', 'reach', 'message', 'talk', 'connect'],
    description: 'Get in touch with the Knight Errant team. We\'re here to help.',
  },
  {
    title: 'Send a Message',
    path: '/contact',
    category: 'Contact',
    keywords: ['message', 'email', 'form', 'inquiry', 'question', 'send'],
    description: 'Fill out our contact form to send us a message or inquiry.',
  },
  {
    title: 'Phone: 7004404527',
    path: '/contact',
    category: 'Contact',
    keywords: ['phone', 'call', 'number', '7004404527', 'telephone'],
    description: 'Call us directly at 7004404527 for immediate assistance.',
  },
];

// ─── Category color map ────────────────────────────────────────────────────────
const CATEGORY_COLORS = {
  Home: '#673de6',
  Services: '#3b82f6',
  About: '#10b981',
  Contact: '#f59e0b',
};

// ─── Highlight matched text ────────────────────────────────────────────────────
function highlight(text, query) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="search-highlight">{part}</mark>
      : part
  );
}

// ─── Search logic ──────────────────────────────────────────────────────────────
function searchContent(query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return SITE_CONTENT.filter(item => {
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.keywords.some(k => k.includes(q)) ||
      item.category.toLowerCase().includes(q)
    );
  });
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setActiveIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Live search
  useEffect(() => {
    const found = searchContent(query);
    setResults(found);
    setActiveIndex(-1);
  }, [query]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(i => Math.min(i + 1, results.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(i => Math.max(i - 1, -1));
      }
      if (e.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
        handleSelect(results[activeIndex]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, results, activeIndex]);

  const handleSelect = useCallback((item) => {
    navigate(item.path);
    window.scrollTo(0, 0);
    onClose();
  }, [navigate, onClose]);

  if (!isOpen) return null;

  const showSuggestions = query.trim() === '';

  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search">
      {/* Backdrop */}
      <div className="search-overlay__backdrop" onClick={onClose} />

      {/* Panel */}
      <div className="search-overlay__panel">
        {/* Input row */}
        <div className="search-overlay__input-row">
          <svg className="search-overlay__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            className="search-overlay__input"
            type="text"
            placeholder="Search pages, services, topics…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck={false}
            id="search-input"
          />
          {query && (
            <button className="search-overlay__clear" onClick={() => setQuery('')} aria-label="Clear search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          <button className="search-overlay__close" onClick={onClose} aria-label="Close search">
            <span>ESC</span>
          </button>
        </div>

        {/* Divider */}
        <div className="search-overlay__divider" />

        {/* Results / Suggestions */}
        <div className="search-overlay__body">
          {showSuggestions ? (
            <div className="search-overlay__suggestions">
              <p className="search-overlay__hint">Quick navigation</p>
              <div className="search-overlay__quick-links">
                {[
                  { label: 'Home', path: '/', emoji: '🏠' },
                  { label: 'Services', path: '/services', emoji: '⚙️' },
                  { label: 'About Us', path: '/about', emoji: '🏢' },
                  { label: 'Contact', path: '/contact', emoji: '📞' },
                ].map(link => (
                  <button
                    key={link.path}
                    className="search-overlay__quick-link"
                    onClick={() => handleSelect(link)}
                  >
                    <span className="search-overlay__quick-emoji">{link.emoji}</span>
                    <span>{link.label}</span>
                    <svg className="search-overlay__quick-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <ul className="search-overlay__results" role="listbox">
              {results.map((item, i) => (
                <li
                  key={i}
                  role="option"
                  aria-selected={i === activeIndex}
                  className={`search-overlay__result${i === activeIndex ? ' search-overlay__result--active' : ''}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  <span
                    className="search-overlay__result-badge"
                    style={{ background: CATEGORY_COLORS[item.category] + '22', color: CATEGORY_COLORS[item.category] }}
                  >
                    {item.category}
                  </span>
                  <div className="search-overlay__result-content">
                    <div className="search-overlay__result-title">
                      {highlight(item.title, query)}
                    </div>
                    <div className="search-overlay__result-desc">
                      {highlight(item.description, query)}
                    </div>
                  </div>
                  <svg className="search-overlay__result-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </li>
              ))}
            </ul>
          ) : (
            <div className="search-overlay__empty">
              <div className="search-overlay__empty-icon">🔍</div>
              <p className="search-overlay__empty-title">No results for "<strong>{query}</strong>"</p>
              <p className="search-overlay__empty-sub">Try different keywords like "services", "contact", or "hiring".</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="search-overlay__footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Select</span>
          <span><kbd>ESC</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
