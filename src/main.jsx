import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // <-- أضف هذا
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>          {/* <-- لف App بالـ HashRouter */}
      <App />
    </HashRouter>
  </StrictMode>
);
