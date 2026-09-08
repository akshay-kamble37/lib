import React, { useRef, useState } from 'react';
import { ImagePlus, Video, Upload, X, LoaderCircle } from 'lucide-react';

export default function MediaPicker({ label, value, onChange, accept = 'image/*', type = 'image', hint }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(value || '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const choose = () => inputRef.current?.click();

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError('');
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const response = await fetch('/api/upload', { method: 'POST', body: form });
      if (!response.ok) throw new Error('Upload failed');
      const result = await response.json();
      if (!result.url) throw new Error('No media URL returned');
      setPreview(result.url);
      onChange(result.url);
    } catch (err) {
      setError('Upload server is not running. Start it with: npm run api');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const clear = () => {
    setPreview('');
    onChange('');
  };

  return (
    <div className="media-picker">
      <div className="media-picker-head">
        <span>{label}</span>
        {hint && <small>{hint}</small>}
      </div>
      <div className="media-picker-box">
        {preview ? (
          <div className="media-preview">
            {type === 'video' ? (
              <video src={preview} controls preload="metadata" />
            ) : (
              <img src={preview} alt="Selected media preview" />
            )}
            <button type="button" className="media-remove" onClick={clear} aria-label="Remove media">
              <X size={15} />
            </button>
          </div>
        ) : (
          <div className="media-empty">
            {type === 'video' ? <Video size={25} /> : <ImagePlus size={25} />}
            <strong>No {type} selected</strong>
            <span>Choose a file directly from your computer.</span>
          </div>
        )}
        <button type="button" className="media-select" onClick={choose} disabled={uploading}>
          {uploading ? <LoaderCircle className="spin" size={16} /> : <Upload size={16} />}
          {uploading ? 'Uploading…' : `Select ${type}`}
        </button>
        <input ref={inputRef} type="file" accept={accept} onChange={handleFile} hidden />
      </div>
      {error && <small className="media-error">{error}</small>}
    </div>
  );
}
