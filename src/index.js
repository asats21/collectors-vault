import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ShowcaseBooksProvider } from './ShowcaseBooksContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShowcaseBooksProvider>
      <App />
    </ShowcaseBooksProvider>
  </React.StrictMode>
);