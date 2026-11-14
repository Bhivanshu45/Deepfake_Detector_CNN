import { useRef, useState } from 'react';
import { FolderOpen, UploadCloud } from 'lucide-react';
import { ACCEPT_ATTRIBUTE } from '../utils/fileValidation';

/**
 * Drag-and-drop zone with a keyboard-accessible "Browse Files" button.
 * Validation is delegated to the parent via `onFileSelected`.
 */
export default function ImageUploader({ onFileSelected, onError, disabled = false, describedBy }) {
  const inputRef = useRef(null);
  const dragDepth = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const openFileDialog = () => {
    if (!disabled) inputRef.current?.click();
  };

  const handleFiles = (fileList) => {
    if (!fileList || fileList.length === 0) return;
    const accepted = onFileSelected(fileList[0]);
    if (accepted && fileList.length > 1) {
      onError?.('Please upload one image at a time. Only the first file was used.');
    }
  };

  const handleInputChange = (event) => {
    handleFiles(event.target.files);
    // Reset so selecting the same file again still fires `change`.
    event.target.value = '';
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    if (disabled) return;
    dragDepth.current += 1;
    setIsDragging(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = disabled ? 'none' : 'copy';
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    dragDepth.current = 0;
    setIsDragging(false);
    if (!disabled) handleFiles(event.dataTransfer.files);
  };

  return (
    <div
      className={`dropzone${isDragging ? ' dropzone--active' : ''}${disabled ? ' dropzone--disabled' : ''}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={(e) => {
        // Mouse convenience: clicking anywhere in the zone opens the dialog.
        if (e.target === e.currentTarget || !e.target.closest('button')) openFileDialog();
      }}
    >
      <input
        ref={inputRef}
        id="image-upload-input"
        type="file"
        accept={ACCEPT_ATTRIBUTE}
        className="visually-hidden"
        tabIndex={-1}
        aria-hidden="true"
        onChange={handleInputChange}
        onClick={(e) => e.stopPropagation()}
        disabled={disabled}
      />

      <span className="dropzone__icon" aria-hidden="true">
        <UploadCloud size={30} strokeWidth={1.8} />
      </span>
      <p className="dropzone__title">
        {isDragging ? 'Release to upload your image' : 'Drag & drop your image here'}
      </p>
      <p className="dropzone__subtitle">or</p>
      <button
        type="button"
        className="btn btn--secondary"
        onClick={openFileDialog}
        disabled={disabled}
        aria-describedby={describedBy}
      >
        <FolderOpen size={17} aria-hidden="true" />
        Browse Files
      </button>
      <ul className="dropzone__specs" id={describedBy}>
        <li>
          Supported: <strong>JPG, JPEG, PNG, WEBP</strong>
        </li>
        <li>
          Max size: <strong>10 MB</strong>
        </li>
      </ul>
    </div>
  );
}
