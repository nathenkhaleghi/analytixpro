// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/styles.css'; // Ensure this path matches the location of your CSS file
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
