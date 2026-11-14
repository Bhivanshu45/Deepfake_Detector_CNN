import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Global tokens/base styles must load before component styles (App.css).
import './index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
