import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// get stored theme right at the beginning
const currentTheme = localStorage.getItem('vite-ui-theme');
const root = window.document.documentElement;
if (root && currentTheme === 'dark') root.classList.add('dark');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className={'relative'}>
      <App />
    </div>
  </StrictMode>
);
