import BrandMark from './BrandMark';
import GithubIcon from './GithubIcon';
import { ANALYZE_SECTION_ID, BRAND_NAME, REPO_URL } from '../constants';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <BrandMark showTagline={false} />
          <p>
            An interface for exploring CNN-based deepfake image detection. This build runs in demo
            mode with simulated predictions.
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <h2 className="footer__heading">Navigate</h2>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href={`#${ANALYZE_SECTION_ID}`}>Analyze Image</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#about-model">About Model</a></li>
          </ul>
        </nav>

        <div className="footer__nav">
          <h2 className="footer__heading">Project</h2>
          <ul>
            <li>
              <a href={REPO_URL} target="_blank" rel="noreferrer" className="footer__gh">
                <GithubIcon size={16} /> GitHub Repository
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {year} {BRAND_NAME}. All rights reserved.</p>
        <p className="footer__demo">Demo build · results are simulated</p>
      </div>
    </footer>
  );
}
