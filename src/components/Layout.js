// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/upload">Upload</Link></li>
            <li><Link to="/analysis">Analysis</Link></li>
            <li><Link to="/visualization">Visualization</Link></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2024 AnalytixPro</p>
      </footer>
    </div>
  );
};

export default Layout;
