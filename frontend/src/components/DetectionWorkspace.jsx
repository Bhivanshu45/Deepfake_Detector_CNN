import { useEffect, useRef } from 'react';
import { AlertCircle, Lock, ScanSearch, X } from 'lucide-react';
import ImageUploader from './ImageUploader';
import ImagePreview from './ImagePreview';
import AnalysisLoader from './AnalysisLoader';
import DetectionResult from './DetectionResult';
import { useImageAnalysis } from '../hooks/useImageAnalysis';
import { ANALYSIS_STAGES } from '../services/detectionService';
import { ANALYZE_SECTION_ID } from '../constants';

const IDLE_STEPS = [
  'Upload a JPG, PNG, or WEBP image (max 10 MB).',
  'Check the preview and file details.',
  'Click “Analyze Image” to run the simulated analysis.',
  'Review the prediction and probability breakdown.',
];

export default function DetectionWorkspace() {
  const {
    file,
    previewUrl,
    error,
    status,
    stageIndex,
    result,
    selectFile,
    setError,
    startAnalysis,
    reset,
    markUnreadable,
  } = useImageAnalysis();

  const panelRef = useRef(null);
  const isAnalyzing = status === 'analyzing';
  const isComplete = status === 'complete';

  // Stop the browser from navigating to an image dropped outside the drop zone.
  useEffect(() => {
    const prevent = (e) => e.preventDefault();
    window.addEventListener('dragover', prevent);
    window.addEventListener('drop', prevent);
    return () => {
      window.removeEventListener('dragover', prevent);
      window.removeEventListener('drop', prevent);
    };
  }, []);

  // On small screens, bring the results into view once they are ready.
  useEffect(() => {
    if (isComplete && window.innerWidth < 960) {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isComplete]);

  return (
    <section id={ANALYZE_SECTION_ID} className="section workspace" aria-labelledby="workspace-title">
      <div className="container">
        <div className="workspace__card">
          <header className="workspace__header">
            <div>
              <h2 id="workspace-title" className="section-title">
                Analyze Your Image
              </h2>
              <p className="section-lead">
                Upload an image to check whether it appears authentic or AI-manipulated.
              </p>
            </div>
            <span className="badge badge--warning">
              <span className="demo-pill__dot" aria-hidden="true" /> Simulated results
            </span>
          </header>

          <div className="workspace__grid">
            <div className="workspace__input">
              {file && previewUrl ? (
                <ImagePreview
                  file={file}
                  previewUrl={previewUrl}
                  onRemove={reset}
                  onLoadError={markUnreadable}
                  scanning={isAnalyzing}
                />
              ) : (
                <ImageUploader onFileSelected={selectFile} onError={setError} describedBy="upload-specs" />
              )}

              <div className="workspace__feedback" aria-live="assertive">
                {error && (
                  <div className="alert alert--error" role="alert">
                    <AlertCircle size={18} aria-hidden="true" />
                    <p>{error}</p>
                    <button
                      type="button"
                      className="icon-btn icon-btn--sm"
                      onClick={() => setError(null)}
                      aria-label="Dismiss error"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <div className="workspace__actions">
                <button
                  type="button"
                  className="btn btn--primary btn--lg btn--block"
                  onClick={startAnalysis}
                  disabled={status !== 'ready'}
                  aria-busy={isAnalyzing}
                >
                  <ScanSearch size={19} aria-hidden="true" />
                  {isAnalyzing ? 'Analyzing…' : isComplete ? 'Analysis Complete' : 'Analyze Image'}
                </button>
                <p className="workspace__privacy">
                  <Lock size={13} aria-hidden="true" />
                  Your image is processed locally in this demo and is never uploaded.
                </p>
              </div>
            </div>

            <div className="workspace__panel" ref={panelRef} tabIndex={-1}>
              {isAnalyzing && <AnalysisLoader stages={ANALYSIS_STAGES} stageIndex={stageIndex} />}

              {isComplete && result && (
                <DetectionResult result={result} file={file} previewUrl={previewUrl} onReset={reset} />
              )}

              {!isAnalyzing && !isComplete && (
                <div className="panel-idle">
                  <span className="panel-idle__icon" aria-hidden="true">
                    <ScanSearch size={26} />
                  </span>
                  <h3 className="panel-idle__title">
                    {file ? 'Ready for analysis' : 'Awaiting image'}
                  </h3>
                  <p className="panel-idle__text">
                    {file
                      ? 'Your image looks good. Run the analysis to generate a detection report.'
                      : 'Your detection report will appear here once an image has been analyzed.'}
                  </p>
                  <ol className="panel-idle__steps">
                    {IDLE_STEPS.map((step, i) => (
                      <li key={step} className={file && i < 2 ? 'is-done' : ''}>
                        <span className="panel-idle__num" aria-hidden="true">{i + 1}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
