import { useCallback, useEffect, useRef, useState } from 'react';
import { analyzeImage } from '../services/detectionService';
import { validateImageFile } from '../utils/fileValidation';

/**
 * Owns the upload → analyse → result workflow.
 *
 * status: 'idle' | 'ready' | 'analyzing' | 'complete'
 */
export function useImageAnalysis() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [stageIndex, setStageIndex] = useState(0);
  const [result, setResult] = useState(null);

  const abortRef = useRef(null);

  const cancelAnalysis = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
  }, []);

  // Revoke the previous object URL whenever it changes or on unmount.
  useEffect(() => {
    if (!previewUrl) return undefined;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  // Stop any pending simulated analysis on unmount.
  useEffect(() => cancelAnalysis, [cancelAnalysis]);

  const selectFile = useCallback(
    (candidate) => {
      const validationError = validateImageFile(candidate);
      if (validationError) {
        // Keep any previously valid image; just surface the error.
        setError(validationError);
        return false;
      }
      cancelAnalysis();
      setFile(candidate);
      setPreviewUrl(URL.createObjectURL(candidate));
      setError(null);
      setResult(null);
      setStageIndex(0);
      setStatus('ready');
      return true;
    },
    [cancelAnalysis],
  );

  const reset = useCallback(() => {
    cancelAnalysis();
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    setResult(null);
    setStageIndex(0);
    setStatus('idle');
  }, [cancelAnalysis]);

  /** Called when the browser cannot decode the selected image. */
  const markUnreadable = useCallback(() => {
    reset();
    setError('This image could not be read. The file may be corrupted — please try another one.');
  }, [reset]);

  const startAnalysis = useCallback(async () => {
    if (!file || status === 'analyzing') return;
    cancelAnalysis();
    const controller = new AbortController();
    abortRef.current = controller;

    setError(null);
    setResult(null);
    setStageIndex(0);
    setStatus('analyzing');

    try {
      const response = await analyzeImage(file, {
        signal: controller.signal,
        onStage: setStageIndex,
      });
      if (controller.signal.aborted) return;
      setResult(response);
      setStatus('complete');
    } catch (err) {
      if (err?.name === 'AbortError') return;
      setError('Something went wrong while analysing the image. Please try again.');
      setStatus('ready');
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
    }
  }, [file, status, cancelAnalysis]);

  return {
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
  };
}
