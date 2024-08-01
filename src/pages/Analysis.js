// src/pages/Analysis.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { motion } from 'framer-motion'; // Import framer-motion
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    width: '100vw',
    background: 'inherit', // Ensure it inherits the global background color
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
    padding: '2rem',
    boxSizing: 'border-box',
    overflow: 'hidden', // Prevents potential overflow causing a different background
    [theme.breakpoints.down('sm')]: {
      padding: '1rem',
    },
  },
  title: {
    fontFamily: 'Roboto, sans-serif', // Use the same font family
    fontWeight: 'bold',
    fontSize: '4rem', // Adjust size to match homepage
    marginBottom: '1rem',
    letterSpacing: '0.2rem',
    color: '#edf2f4',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
      marginBottom: '0.5rem',
    },
  },
  description: {
    fontFamily: 'Roboto, sans-serif', // Use the same font family
    fontSize: '1.5rem',
    marginBottom: '2rem',
    maxWidth: '600px',
    lineHeight: '1.5',
    letterSpacing: '0.1rem',
    color: '#d9d9d9',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
      marginBottom: '1.5rem',
    },
  },
}));

const Analysis = () => {
  const [description, setDescription] = useState(null);
  const [summary, setSummary] = useState(null);
  const [info, setInfo] = useState(null);
  const classes = useStyles();

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

  // Define animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        variants={fadeInVariants}
      >
        <Typography className={classes.title} gutterBottom>
          Data Analysis Overview
        </Typography>
        <Typography className={classes.description} gutterBottom>
          Explore the comprehensive analysis of your uploaded dataset. Review the statistical summary, data description, and column details below.
        </Typography>
      </motion.div>
      {summary && (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.5 }}
          variants={fadeInVariants}
        >
          <Paper style={{ padding: '16px', marginBottom: '16px' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Summary</Typography>
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
        </motion.div>
      )}
      {description && (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 1 }}
          variants={fadeInVariants}
        >
          <TableContainer component={Paper} style={{ marginBottom: '16px' }}>
            <Typography variant="h6" style={{ padding: '16px', fontWeight: 'bold' }}>Description</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(description).map((key) => (
                    <TableCell key={key} style={{ fontWeight: 'bold' }}>{key}</TableCell>
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
        </motion.div>
      )}
      {info && (
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 1.5 }}
          variants={fadeInVariants}
        >
          <Paper style={{ padding: '16px' }}>
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>Info</Typography>
            <pre>{info}</pre>
          </Paper>
        </motion.div>
      )}
    </Container>
  );
};

export default Analysis;
