import { ShieldCheck } from 'lucide-react';
import { BRAND_NAME, BRAND_TAGLINE } from '../constants';

export default function BrandMark({ showTagline = true, href = '#home', onClick }) {
  return (
    <a className="brand" href={href} onClick={onClick} aria-label={`${BRAND_NAME} – back to top`}>
      <span className="brand__logo" aria-hidden="true">
        <ShieldCheck size={20} strokeWidth={2.2} />
      </span>
      <span className="brand__text">
        <span className="brand__name">{BRAND_NAME}</span>
        {showTagline && <span className="brand__tagline">{BRAND_TAGLINE}</span>}
      </span>
    </a>
  );
}
