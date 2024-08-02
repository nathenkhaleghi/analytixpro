// src/pages/Visualization.js

import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion'; // Import framer-motion

const Visualization = () => {
  const [chartType, setChartType] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleVisualization = (type) => {
    setChartType(type);
    setImageUrl(`http://127.0.0.1:5000/visualization/${type}`);
  };

  // Define animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        variants={fadeInVariants}
      >
        <Typography variant="h4" gutterBottom>Data Visualization</Typography>
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, delay: 0.5 }}
        variants={fadeInVariants}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <Button variant="contained" color="primary" onClick={() => handleVisualization('bar')} style={{ margin: '0 10px' }}>Bar Chart</Button>
          <Button variant="contained" color="primary" onClick={() => handleVisualization('line')} style={{ margin: '0 10px' }}>Line Chart</Button>
          <Button variant="contained" color="primary" onClick={() => handleVisualization('pie')} style={{ margin: '0 10px' }}>Pie Chart</Button>
        </div>
      </motion.div>
      {imageUrl && (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 1 }}
          variants={fadeInVariants}
          style={{ marginTop: '20px' }}
        >
          <Typography variant="h6">{chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart</Typography>
          <img src={imageUrl} alt={`${chartType} chart`} style={{ width: '100%', maxWidth: '800px', maxHeight: '500px' }} />
        </motion.div>
      )}
    </Container>
  );
};

export default Visualization;
