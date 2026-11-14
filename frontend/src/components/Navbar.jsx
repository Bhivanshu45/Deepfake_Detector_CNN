import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import BrandMark from './BrandMark';
import GithubIcon from './GithubIcon';
import { ANALYZE_SECTION_ID, NAV_LINKS, REPO_URL } from '../constants';
import { useActiveSection } from '../hooks/useActiveSection';

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape or when resizing up to desktop.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    const onResize = () => window.innerWidth > 900 && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--open' : ''}`}>
      <nav className="navbar__inner container" aria-label="Primary">
        <BrandMark onClick={closeMenu} />

        <ul className="navbar__links" id="primary-menu">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={`navbar__link${active === link.id ? ' is-active' : ''}`}
                aria-current={active === link.id ? 'location' : undefined}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="navbar__mobile-extras">
            <a className="btn btn--ghost btn--block" href={REPO_URL} target="_blank" rel="noreferrer">
              <GithubIcon /> View on GitHub
            </a>
            <a className="btn btn--primary btn--block" href={`#${ANALYZE_SECTION_ID}`} onClick={closeMenu}>
              Get Started <ArrowRight size={16} />
            </a>
          </li>
        </ul>

        <div className="navbar__actions">
          <span className="demo-pill" title="Predictions are simulated with mock data">
            <span className="demo-pill__dot" aria-hidden="true" />
            Demo Mode
          </span>
          <a
            className="icon-btn navbar__github"
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="View the project repository on GitHub (opens in new tab)"
          >
            <GithubIcon />
          </a>
          <a className="btn btn--primary btn--sm navbar__cta" href={`#${ANALYZE_SECTION_ID}`}>
            Get Started
          </a>
          <button
            type="button"
            className="icon-btn navbar__toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
