export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

/** Value for the <input type="file" accept> attribute. */
export const ACCEPT_ATTRIBUTE = [...ACCEPTED_MIME_TYPES, ...ACCEPTED_EXTENSIONS].join(',');

export function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exponent;
  return `${value.toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

function getExtension(name = '') {
  const dot = name.lastIndexOf('.');
  return dot === -1 ? '' : name.slice(dot).toLowerCase();
}

/**
 * Validate a user-supplied file.
 * @returns {string|null} An error message, or null if the file is valid.
 */
export function validateImageFile(file) {
  if (!file) return 'No file was selected.';

  const typeOk = ACCEPTED_MIME_TYPES.includes(file.type);
  // Some browsers/OSes report an empty MIME type – fall back to the extension.
  const extOk = !file.type && ACCEPTED_EXTENSIONS.includes(getExtension(file.name));
  if (!typeOk && !extOk) {
    return `"${file.name}" is not a supported format. Please upload a JPG, JPEG, PNG, or WEBP image.`;
  }
  if (file.size === 0) {
    return `"${file.name}" appears to be empty. Please choose another image.`;
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `"${file.name}" is ${formatBytes(file.size)}. The maximum file size is 10 MB.`;
  }
  return null;
}
