import { ArrowRight, ScanFace, Sparkles } from 'lucide-react';
import HeroVisual from './HeroVisual';
import { ANALYZE_SECTION_ID } from '../constants';

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            AI-POWERED IMAGE AUTHENTICITY ANALYSIS
          </p>
          <h1 id="hero-title" className="hero__title">
            Detect What&apos;s Real.{' '}
            <span className="text-gradient">Expose What&apos;s Fake.</span>
          </h1>
          <p className="hero__lead">
            Advanced CNN-powered deepfake detection to help identify manipulated images and protect
            digital authenticity.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary btn--lg" href={`#${ANALYZE_SECTION_ID}`}>
              <ScanFace size={18} aria-hidden="true" />
              Analyze Image
            </a>
            <a className="btn btn--secondary btn--lg" href="#how-it-works">
              How It Works
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <ul className="hero__meta" aria-label="Highlights">
            <li>JPG · PNG · WEBP</li>
            <li>Up to 10 MB</li>
            <li>Images stay in your browser</li>
          </ul>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
