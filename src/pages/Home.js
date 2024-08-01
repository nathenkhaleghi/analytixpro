// src/pages/Home.js

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  // References for the sections
  const homeRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSection = (ref, offset = 0) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pageStyle = {
    background: 'linear-gradient(135deg, #2b2d42, #8d99ae)',
    minHeight: '100vh', // Cover the viewport initially
    width: '100%',
    paddingBottom: '50vh', // Ensure space at the bottom of the page
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    textAlign: 'center',
    paddingTop: '4rem', // Space for the nav links
  };

  const navStyle = {
    position: 'fixed', // Fix the position at the top
    top: '1rem',
    left: '1rem',
    display: 'flex',
    gap: '2rem',
    zIndex: 1000, // Ensure it stays on top of other elements
  };

  const navButtonStyle = {
    color: '#edf2f4',
    fontSize: '1rem',
    fontWeight: 'bold',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Roboto, sans-serif',
    textTransform: 'uppercase',
    letterSpacing: '0.5rem',
    transition: 'color 0.3s',
  };

  const titleStyle = {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#edf2f4',
  };

  const subtitleStyle = {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    color: '#d9d9d9',
  };

  const buttonStyle = {
    padding: '1rem 2rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#00bcd4',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const missionSectionStyle = {
    marginTop: '75vh', // Adjust to position the section
    padding: '6rem 4rem 4rem', // Padding for content spacing
    color: '#2b2d42',
    width: '80%',
    borderRadius: '10px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto', // Center it horizontally
    marginBottom: '50vh', // Consistent bottom margin
    background: 'inherit', // Inherit the page's background to maintain consistency
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div style={pageStyle}>
      {/* Navigation Links */}
      <div style={navStyle}>
        <button style={navButtonStyle} onClick={() => scrollToSection(homeRef)}>
          Home
        </button>
        <button style={navButtonStyle} onClick={() => scrollToSection(aboutRef, 100)}>
          About Us
        </button>
      </div>

      {/* Main Content */}
      <div style={containerStyle} ref={homeRef} id="home">
        <motion.h1
          style={titleStyle}
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
        >
          AnalytixPro
        </motion.h1>
        <motion.p
          style={subtitleStyle}
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.5 }}
        >
          Welcome to the Future of Data Analysis
        </motion.p>
        <motion.button
          style={buttonStyle}
          onClick={() => navigate('/upload')}
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 1 }}
          whileHover={{ backgroundColor: '#007c91' }}
        >
          Get Started
        </motion.button>
      </div>

      {/* Mission Section */}
      <div ref={aboutRef} id="about" style={missionSectionStyle}>
        <h2 style={{ color: '#edf2f4', marginBottom: '1rem' }}>Our Mission</h2>
        <p style={{ fontSize: '1.2rem', color: '#edf2f4' }}>
          At AnalytixPro, we are dedicated to transforming the way you understand and utilize data. 
          Our mission is to provide cutting-edge tools and insights that empower individuals and businesses 
          to make data-driven decisions with confidence. We strive to deliver unparalleled accuracy, 
          efficiency, and innovation in every aspect of data analysis and visualization.
        </p>
      </div>
    </div>
  );
}

export default Home;
