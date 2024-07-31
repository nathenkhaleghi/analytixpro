import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';

const Visualization = () => {
  const [chartType, setChartType] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleVisualization = (type) => {
    setChartType(type);
    setImageUrl(`http://127.0.0.1:5000/visualization/${type}`);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Data Visualization</Typography>
      <div>
        <Button variant="contained" color="primary" onClick={() => handleVisualization('bar')}>Bar Chart</Button>
        <Button variant="contained" color="primary" onClick={() => handleVisualization('line')}>Line Chart</Button>
        <Button variant="contained" color="primary" onClick={() => handleVisualization('pie')}>Pie Chart</Button>
      </div>
      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">{chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart</Typography>
          <img src={imageUrl} alt={`${chartType} chart`} style={{ width: '100%', maxHeight: '500px' }} />
        </div>
      )}
    </Container>
  );
};

export default Visualization;
