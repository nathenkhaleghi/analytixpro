// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Upload from './pages/Upload';
import Analysis from './pages/Analysis';
import Visualization from './pages/Visualization';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/visualization" element={<Visualization />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
