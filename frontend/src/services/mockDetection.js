/**
 * Mock deepfake detection service.
 *
 * IMPORTANT: This module does NOT run the CNN model from this repository.
 * It simulates the analysis pipeline in the browser and returns one of a
 * few predefined responses so the UI can be demonstrated end-to-end.
 *
 * The returned shape mirrors the anticipated FastAPI contract:
 *   { prediction, confidence, real_probability, fake_probability }
 * plus demo-only metadata (`status: "DEMO"`, `analyzed_at`).
 */

/** Status messages shown while the simulated analysis runs. */
export const ANALYSIS_STAGES = [
  'Preparing image...',
  'Extracting visual features...',
  'Analyzing image patterns...',
  'Generating detection report...',
];

/** Total simulated duration in ms (spread evenly across the stages). */
export const SIMULATED_DURATION_MS = 2600;

const MOCK_RESPONSES = [
  { prediction: 'FAKE', confidence: 96.42, real_probability: 3.58, fake_probability: 96.42 },
  { prediction: 'REAL', confidence: 91.27, real_probability: 91.27, fake_probability: 8.73 },
  { prediction: 'FAKE', confidence: 84.15, real_probability: 15.85, fake_probability: 84.15 },
  { prediction: 'REAL', confidence: 97.06, real_probability: 97.06, fake_probability: 2.94 },
];

/**
 * Deterministic pick: the same file always yields the same mock response,
 * which keeps live demos predictable.
 */
function pickMockResponse(file) {
  const key = `${file.name}|${file.size}|${file.lastModified ?? 0}`;
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return MOCK_RESPONSES[hash % MOCK_RESPONSES.length];
}

function abortError() {
  return new DOMException('Analysis was cancelled.', 'AbortError');
}

/**
 * Simulate analysing an image.
 *
 * @param {File} file
 * @param {{ signal?: AbortSignal, onStage?: (index: number) => void }} [options]
 * @returns {Promise<{prediction: 'REAL'|'FAKE', confidence: number,
 *   real_probability: number, fake_probability: number,
 *   status: 'DEMO', analyzed_at: string}>}
 */
export function analyzeImage(file, { signal, onStage } = {}) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(abortError());
      return;
    }

    const stepMs = SIMULATED_DURATION_MS / ANALYSIS_STAGES.length;
    const timers = [];

    const cleanup = () => {
      timers.forEach(clearTimeout);
      signal?.removeEventListener('abort', onAbort);
    };
    function onAbort() {
      cleanup();
      reject(abortError());
    }
    signal?.addEventListener('abort', onAbort);

    onStage?.(0);
    ANALYSIS_STAGES.forEach((_, index) => {
      if (index === 0) return;
      timers.push(setTimeout(() => onStage?.(index), stepMs * index));
    });

    timers.push(
      setTimeout(() => {
        cleanup();
        resolve({
          ...pickMockResponse(file),
          status: 'DEMO',
          analyzed_at: new Date().toISOString(),
        });
      }, SIMULATED_DURATION_MS),
    );
  });
}
