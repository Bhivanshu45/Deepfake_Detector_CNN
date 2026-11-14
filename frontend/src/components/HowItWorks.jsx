import { BrainCircuit, FileBarChart2, Info, ScanLine, Upload } from 'lucide-react';

const STEPS = [
  {
    icon: Upload,
    title: 'Image Upload',
    text: 'Upload an image securely through the detection interface.',
    demo: 'Live in demo',
    live: true,
  },
  {
    icon: ScanLine,
    title: 'Feature Extraction',
    text: 'Visual information is prepared for the detection pipeline.',
    demo: 'Simulated in demo',
  },
  {
    icon: BrainCircuit,
    title: 'CNN Analysis',
    text: 'The CNN-based detection architecture analyzes visual patterns.',
    demo: 'Simulated in demo',
  },
  {
    icon: FileBarChart2,
    title: 'Detection Report',
    text: 'View the predicted classification and confidence information.',
    demo: 'Mock data in demo',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section how" aria-labelledby="how-title">
      <div className="container">
        <header className="section-header section-header--center">
          <p className="eyebrow">Workflow</p>
          <h2 id="how-title" className="section-title">
            How It Works
          </h2>
          <p className="section-lead">
            From upload to report in four steps. The labels show what is real today and what is
            simulated in this demo build.
          </p>
        </header>

        <ol className="steps">
          {STEPS.map(({ icon: Icon, title, text, demo, live }, index) => (
            <li key={title} className="step-card">
              <div className="step-card__top">
                <span className="step-card__icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <span className="step-card__index" aria-hidden="true">
                  0{index + 1}
                </span>
              </div>
              <h3 className="step-card__title">{title}</h3>
              <p className="step-card__text">{text}</p>
              <span className={`tag ${live ? 'tag--success' : 'tag--warning'}`}>{demo}</span>
            </li>
          ))}
        </ol>

        <div className="note">
          <Info size={18} aria-hidden="true" />
          <p>
            <strong>Intended architecture vs. this demo:</strong> in the full system, uploaded images
            will be sent to a Python (FastAPI) service that runs the CNN detectors from this
            repository. In this frontend demo, steps 2–4 are simulated in your browser and the report
            uses predefined mock predictions.
          </p>
        </div>
      </div>
    </section>
  );
}
