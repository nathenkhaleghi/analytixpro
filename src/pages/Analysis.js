import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Analysis = () => {
  const [description, setDescription] = useState(null);
  const [summary, setSummary] = useState(null);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/analysis');
        setDescription(response.data.description);
        setSummary(response.data.summary);
        setInfo(response.data.info);
      } catch (error) {
        console.error('Error fetching analysis data:', error);
      }
    };

    fetchAnalysis();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Data Analysis</Typography>
      {summary && (
        <Paper style={{ padding: '16px', marginBottom: '16px' }}>
          <Typography variant="h6">Summary</Typography>
          <Typography>Number of Rows: {summary.num_rows}</Typography>
          <Typography>Number of Columns: {summary.num_columns}</Typography>
          <Typography>Columns: {summary.columns.join(', ')}</Typography>
          <Typography>Column Types:</Typography>
          <ul>
            {Object.entries(summary.column_types).map(([col, dtype]) => (
              <li key={col}>{col}: {dtype}</li>
            ))}
          </ul>
        </Paper>
      )}
      {description && (
        <TableContainer component={Paper} style={{ marginBottom: '16px' }}>
          <Typography variant="h6" style={{ padding: '16px' }}>Description</Typography>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(description).map((key) => (
                  <TableCell key={key}>{key}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(description[Object.keys(description)[0]]).map(([index, value], rowIndex) => (
                <TableRow key={rowIndex}>
                  {Object.keys(description).map((key) => (
                    <TableCell key={key}>{description[key][index]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {info && (
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h6">Info</Typography>
          <pre>{info}</pre>
        </Paper>
      )}
    </Container>
  );
};

export default Analysis;
