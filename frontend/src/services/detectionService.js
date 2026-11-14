/**
 * Detection service entry point used by the UI.
 *
 * The UI only imports from this file. To connect a real backend later,
 * replace the re-export below with an implementation that POSTs the file
 * to the FastAPI service and resolves with:
 *   { prediction, confidence, real_probability, fake_probability }
 * keeping the same `analyzeImage(file, { signal, onStage })` signature.
 */
export { analyzeImage, ANALYSIS_STAGES } from './mockDetection';

/** True while predictions come from mock data rather than a model. */
export const IS_DEMO_MODE = true;
