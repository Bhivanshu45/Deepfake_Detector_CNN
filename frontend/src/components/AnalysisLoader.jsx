import { Check, Loader2 } from 'lucide-react';

export default function AnalysisLoader({ stages, stageIndex }) {
  const progress = Math.round(((stageIndex + 1) / stages.length) * 100);

  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__orb" aria-hidden="true">
        <span className="loader__ring" />
        <span className="loader__ring loader__ring--inner" />
        <span className="loader__core" />
      </div>

      <p className="loader__message">{stages[stageIndex]}</p>
      <p className="loader__hint">Simulated analysis · demo mode</p>

      <div
        className="progress"
        role="progressbar"
        aria-label="Analysis progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div className="progress__fill" style={{ width: `${progress}%` }} />
      </div>

      <ol className="loader__steps">
        {stages.map((stage, index) => {
          const state = index < stageIndex ? 'done' : index === stageIndex ? 'active' : 'pending';
          return (
            <li key={stage} className={`loader__step loader__step--${state}`}>
              <span className="loader__step-icon" aria-hidden="true">
                {state === 'done' && <Check size={13} strokeWidth={3} />}
                {state === 'active' && <Loader2 size={13} className="spin" />}
              </span>
              {stage.replace('...', '')}
              <span className="visually-hidden">
                {state === 'done' ? ' (complete)' : state === 'active' ? ' (in progress)' : ' (pending)'}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
