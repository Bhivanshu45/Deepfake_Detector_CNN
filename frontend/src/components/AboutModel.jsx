import { Binary, Boxes, Eye, Flame, Frame, TriangleAlert } from 'lucide-react';

// Every fact below is taken from the repository (README.md and src/models/__init__.py).
// No accuracy, dataset size, or benchmark figures are shown on purpose.
const FACTS = [
  {
    icon: Binary,
    title: 'Binary classification',
    text: 'Each image is classified as Real (label 0) or Fake (label 1).',
  },
  {
    icon: Frame,
    title: 'Face-crop input',
    text: 'Compact CNNs take 256 × 256 RGB face crops and output a single logit.',
  },
  {
    icon: Eye,
    title: 'Attention modules',
    text: 'CBAM channel and spatial attention variants are included for comparison.',
  },
  {
    icon: Flame,
    title: 'Explainability',
    text: 'Grad-CAM visualisation is supported for inspecting what the model attends to.',
  },
];

const ARCHITECTURES = [
  'Meso4',
  'MesoInception4',
  'MesoInception4 + CBAM',
  'MesoXceptionNet',
  'MesoXception + CBAM',
  'LVNet (two-stream)',
];

export default function AboutModel() {
  return (
    <section id="about-model" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__intro">
          <p className="eyebrow">About the model</p>
          <h2 id="about-title" className="section-title">
            Powered by Convolutional Neural Networks
          </h2>
          <p className="section-lead">
            Convolutional Neural Networks (CNNs) are designed to identify visual patterns and extract
            meaningful features from images. DeepGuard AI provides an interface for exploring image
            authenticity detection using CNN-based analysis.
          </p>

          <div className="arch">
            <p className="arch__label">
              <Boxes size={16} aria-hidden="true" /> Architectures in the project repository
            </p>
            <ul className="arch__list">
              {ARCHITECTURES.map((name) => (
                <li key={name} className="chip">
                  {name}
                </li>
              ))}
            </ul>
            <p className="arch__foot">Built with PyTorch.</p>
          </div>
        </div>

        <div className="about__facts">
          <ul className="facts">
            {FACTS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="fact-card">
                <span className="fact-card__icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <div>
                  <h3 className="fact-card__title">{title}</h3>
                  <p className="fact-card__text">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="about__limit">
            <TriangleAlert size={15} aria-hidden="true" />
            Detectors may fail on unseen generation techniques. Predictions should not be treated as
            definitive proof that an image is authentic or fake.
          </p>
        </div>
      </div>
    </section>
  );
}
