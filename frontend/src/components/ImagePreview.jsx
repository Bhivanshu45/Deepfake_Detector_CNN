import { FileImage, Trash2 } from 'lucide-react';
import { formatBytes } from '../utils/fileValidation';

export default function ImagePreview({ file, previewUrl, onRemove, onLoadError, scanning = false }) {
  return (
    <figure className={`preview${scanning ? ' preview--scanning' : ''}`}>
      <div className="preview__stage">
        <img
          src={previewUrl}
          alt={`Preview of uploaded image ${file.name}`}
          className="preview__img"
          onError={onLoadError}
        />
        {scanning && <span className="preview__scanline" aria-hidden="true" />}
      </div>
      <figcaption className="preview__meta">
        <span className="preview__file-icon" aria-hidden="true">
          <FileImage size={18} />
        </span>
        <span className="preview__file-text">
          <span className="preview__name" title={file.name}>
            {file.name}
          </span>
          <span className="preview__size">
            {formatBytes(file.size)} · {(file.type || 'image').replace('image/', '').toUpperCase()}
          </span>
        </span>
        <button
          type="button"
          className="btn btn--danger-ghost btn--sm"
          onClick={onRemove}
          aria-label={`Remove image ${file.name}`}
        >
          <Trash2 size={15} aria-hidden="true" />
          <span>Remove</span>
        </button>
      </figcaption>
    </figure>
  );
}
